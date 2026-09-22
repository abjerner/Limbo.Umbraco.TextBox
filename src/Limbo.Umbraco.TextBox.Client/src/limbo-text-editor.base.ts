// [CHANGE: upgrade to Umbraco 17] Related: textbox.element.ts, textarea.element.ts
// Shared base for the Limbo Textbox/Textarea property editor UIs. Replaces the old AngularJS
// "Limbo.TextBox.Controller" + TextBox.html/TextArea.html. Renders a uui-input/uui-textarea and
// the live "characters remaining" counter, and enforces the limit by truncating when configured.
import { css, html, nothing, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import type { UmbEntityUnique } from '@umbraco-cms/backoffice/entity';
import type {
    UmbPropertyEditorUiElement,
    UmbPropertyEditorConfigCollection,
} from '@umbraco-cms/backoffice/property-editor';
import { UMB_PROPERTY_DATASET_CONTEXT } from '@umbraco-cms/backoffice/property';
import type { UmbPropertyDatasetContext } from '@umbraco-cms/backoffice/property';
import { UMB_CONTENT_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/content';
import type { UmbContentWorkspaceContext } from '@umbraco-cms/backoffice/content';
import { firstValueFrom } from '@umbraco-cms/backoffice/external/rxjs';
import {
    configToObject,
    type LimboTextEditorConfig,
    type LimboTextEditorConfigResolver,
    type LimboTextEditorConfigResolverOwnerContext,
    type LimboTextEditorConfigResolverRootContext
} from './config-resolver.js';

import {
    UMB_BLOCK_MANAGER_CONTEXT,
    type UmbBlockManagerContext,
} from '@umbraco-cms/backoffice/block';

export abstract class LimboTextEditorElementBase extends UmbLitElement implements UmbPropertyEditorUiElement {

    @property({ type: String })
    public value = '';

    @state() protected _limit = 0;
    @state() protected _enforce = false;
    @state() protected _placeholder = '';
    @state() protected _info?: string;
    @state() protected _negative = false;

    #originalConfig?: UmbPropertyEditorConfigCollection;
    #blockManager?: UmbBlockManagerContext;
    #dataset?: UmbPropertyDatasetContext;
    #owner?: UmbContentWorkspaceContext;
    #root?: UmbContentWorkspaceContext;
    #resolveVersion = 0;

    protected abstract getConfigResolver(): LimboTextEditorConfigResolver | undefined;

    constructor() {
        super();

        this.consumeContext(UMB_PROPERTY_DATASET_CONTEXT, dataset => {
            this.#dataset = dataset;
            this.#queueResolveConfig();

            if (dataset) {
                // Re-resolve when values in the surrounding dataset change. This makes configuration such
                // as the placeholder react to edits of sibling properties.
                this.observe(dataset.properties, () => void this.#queueResolveConfig(), 'limbo-text-editor-dataset-properties');
            }
        });


        // Resolve the nearest content workspace. For a direct document property this is the document;
        // inside a block this may be the block/element content workspace.
        this.consumeContext(UMB_CONTENT_WORKSPACE_CONTEXT, content => {
            this.#owner = content;
            void this.#queueResolveConfig();

            if (content) {
                this.observe(content.unique, () => void this.#queueResolveConfig(), 'limbo-text-editor-owner-unique');
            }
        });

        // Also resolve the outer content workspace. passContextAliasMatches() allows context lookup to
        // continue past matching nested contexts, which is important when the editor is inside a block.
        this.consumeContext(UMB_CONTENT_WORKSPACE_CONTEXT, content => {
            this.#root = content;
            void this.#queueResolveConfig();

            if (content) {
                this.observe(content.unique, () => void this.#queueResolveConfig(), 'limbo-text-editor-root-unique');
            }
        }).passContextAliasMatches();

        this.consumeContext(UMB_BLOCK_MANAGER_CONTEXT, blockManager => {
            this.#blockManager = blockManager;
            void this.#resolveConfig();
        });

    }

    @property({ attribute: false })
    public set config(config: UmbPropertyEditorConfigCollection | undefined) {
        this.#originalConfig = config;
        void this.#queueResolveConfig();
    }

    #resolveQueued = false;

    #queueResolveConfig(): void {
        if (this.#resolveQueued) return;
        this.#resolveQueued = true;
        queueMicrotask(() => {
            this.#resolveQueued = false;
            void this.#resolveConfig();
        });
    }

    async #resolveConfig(): Promise<void> {

        const version = ++this.#resolveVersion;

        const originalConfig = configToObject(this.#originalConfig);
        let resolvedConfig: LimboTextEditorConfig = { ...originalConfig };

        const resolver = this.getConfigResolver();

        if (resolver) {

            const owner = await this.#getOwnerContext();
            const root = this.#getRootContext();

            const patch = await resolver.resolve({
                element: this,
                propertyAlias: this.#getPropertyAlias(),
                originalConfig,
                config: resolvedConfig,
                owner,
                root,
                getPropertyValue: async <T = unknown>(alias: string): Promise<T | undefined> => {
                    const observable = await this.#dataset?.propertyValueByAlias<T>(alias);
                    return observable ? await firstValueFrom(observable) : undefined;
                },
            });

            resolvedConfig = { ...resolvedConfig, ...patch };
        }

        // Ignore a slow resolver result if a newer resolution started while it was awaiting.
        if (version !== this.#resolveVersion) return;

        this.#applyConfig(resolvedConfig);

    }

    async #getOwnerContext(): Promise<LimboTextEditorConfigResolverOwnerContext | undefined> {

        const dataset = this.#dataset;
        if (!dataset) return undefined;

        const key = dataset.getUnique();
        const entityType = dataset.getEntityType();

        let contentTypeKey: UmbEntityUnique | undefined;
        let contentTypeAlias: string | undefined;

        // If the dataset belongs directly to the root content, we can get its
        // content type information from the content workspace.
        const root = this.#getRootContext();

        if (key && root?.key === key) {
            contentTypeKey = root.contentTypeKey;
            contentTypeAlias = root.contentTypeAlias;
        }

        // Otherwise this may be a block. The block manager can map the block's
        // content key to its element type.
        if (!contentTypeKey && key && this.#blockManager) {

            contentTypeKey = this.#blockManager.getContentTypeKeyOfContentKey(key);

            if (contentTypeKey) {
                const observable = this.#blockManager.contentTypeOf(contentTypeKey);

                if (observable) {
                    const contentType = await firstValueFrom(observable);
                    contentTypeAlias = contentType?.alias;
                }
            }

        }

        return {
            key,
            entityType,
            contentTypeKey,
            contentTypeAlias,
            dataset,
        };

    }

    #getRootContext(): LimboTextEditorConfigResolverRootContext | undefined {

        const content = this.#root;
        if (!content) return undefined;

        const workspace = content as UmbContentWorkspaceContext & {
            getContentTypeUnique?: () => UmbEntityUnique | undefined;
        };

        const contentTypeKey = workspace.getContentTypeUnique?.();

        const contentType = contentTypeKey
            ? content.structure.getContentTypes().find(x => x.unique === contentTypeKey)
            : undefined;

        return {
            key: content.getUnique(),
            entityType: content.getEntityType(),
            contentTypeKey,
            contentTypeAlias: contentType?.alias,
            context: content,
        };

    }


    // #getContentContext(content?: UmbContentWorkspaceContext): LimboTextEditorConfigResolverContentContext | undefined {
    //     if (!content) return undefined;

    //     const workspace = content as UmbContentWorkspaceContext & {
    //         getContentTypeUnique?: () => string | undefined;
    //     };

    //     const contentTypeKey = workspace.getContentTypeUnique?.();
    //     const contentType = contentTypeKey
    //         ? content.structure.getContentTypes().find(x => x.unique === contentTypeKey)
    //         : undefined;

    //     return {
    //         key: content.getUnique(),
    //         entityType: content.getEntityType(),
    //         contentTypeKey,
    //         contentTypeAlias: contentType?.alias,
    //         context: content,
    //     };
    // }

    #applyConfig(config: LimboTextEditorConfig): void {
        this._limit = Number(config.maxChars) || 0;
        this._enforce = Boolean(config.enforce);

        // A placeholder prefixed with '#' references a localization key (legacy behaviour).
        let placeholder = typeof config.placeholder === 'string' ? config.placeholder : '';
        if (placeholder.startsWith('#')) {
            placeholder = this.localize.term(placeholder.substring(1)) || placeholder;
        }
        this._placeholder = placeholder;

        this.resolvedConfigChanged(config);
        this.#updateInfo();
    }

    #getPropertyAlias(): string | undefined {
        let node: Node | null = this;

        while (node) {
            const root: Node = node.getRootNode();
            const host: Element | null = root instanceof ShadowRoot ? root.host : null;
            if (!host) return undefined;

            if (host.localName === 'umb-property') {
                return (host as HTMLElement & { alias?: string }).alias || undefined;
            }

            node = host;
        }

        return undefined;
    }

    /** Hook for subclasses to read additional resolved configuration (e.g. textarea rows). */
    protected resolvedConfigChanged(_config: Readonly<LimboTextEditorConfig>): void {}

    protected readonly onInput = (event: Event): void => {
        const target = event.target as HTMLElement & { value: string };
        const currentTarget = event.currentTarget as HTMLElement & { value: string } | null;
        let next = target.value ?? '';

        if (this._enforce && this._limit > 0 && next.length > this._limit) {
            next = next.substring(0, this._limit);
        }

        // Keep both the form control host and the raw event target in sync so the UI
        // reflects the truncated value immediately.
        target.value = next;
        if (currentTarget && currentTarget !== target) {
            currentTarget.value = next;
        }

        this.#syncNativeControl(currentTarget ?? target, next);

        this.value = next;
        this.#updateInfo();
        this.dispatchEvent(new UmbChangeEvent());
    };

    #syncNativeControl(control: HTMLElement, value: string): void {
        const nativeControl = control.shadowRoot?.querySelector('input, textarea') as
            | (HTMLInputElement & HTMLTextAreaElement)
            | null;

        if (!nativeControl) return;

        const selectionStart = 'selectionStart' in nativeControl ? nativeControl.selectionStart : null;
        const selectionEnd = 'selectionEnd' in nativeControl ? nativeControl.selectionEnd : null;

        nativeControl.value = value;

        if (selectionStart !== null && selectionEnd !== null && typeof nativeControl.setSelectionRange === 'function') {
            const selection = Math.min(selectionStart, value.length);
            nativeControl.setSelectionRange(selection, Math.min(selectionEnd, value.length));
        }
    }

    #updateInfo(): void {
        if (this._limit < 1) {
            this._info = undefined;
            this._negative = false;
            return;
        }

        const length = this.value?.length ?? 0;

        if (this._enforce && length >= this._limit) {
            this._info = this.localize.term('limboTextBox_info3', this._limit);
            this._negative = true;
            return;
        }

        const remaining = this._limit - length;
        this._negative = remaining < 0;
        this._info = this.localize.term(remaining < 0 ? 'limboTextBox_info2' : 'limboTextBox_info1', remaining);
    }

    protected abstract renderInput(): unknown;

    override render() {
        return html`
            ${this.renderInput()}
            ${this._info
                ? html`<div class="info ${this._negative ? 'negative' : 'positive'}">${this._info}</div>`
                : nothing}
        `;
    }

    static override styles = [
        css`
            :host {
                display: block;
            }
            uui-input,
            uui-textarea {
                width: 100%;
            }
            .info {
                font-size: 0.85em;
            }
            .info.positive {
                color: var(--uui-color-positive, #2bc37c);
            }
            .info.negative {
                color: var(--uui-color-danger, #d42054);
            }
        `,
    ];
}
