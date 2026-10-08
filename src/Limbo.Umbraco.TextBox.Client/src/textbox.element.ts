import { customElement, css, html, ifDefined, when, state } from '@umbraco-cms/backoffice/external/lit';
import { extractUmbColorVariable } from "@umbraco-cms/backoffice/resources";

import { LimboTextEditorElementBase } from './limbo-text-editor.base.js';
import { limboTextBoxConfigResolver, type LimboTextEditorConfig } from './config-resolver.js';

@customElement('limbo-textbox-property-editor-ui')
export class LimboTextBoxPropertyEditorUiElement extends LimboTextEditorElementBase {

    @state() private _prependIcon: string | undefined = undefined;
    @state() private _prependIconStyle: string | undefined = undefined;

    @state() private _appendIcon: string | undefined = undefined;
    @state() private _appendIconStyle: string | undefined = undefined;

    protected override resolvedConfigChanged(config: Readonly<LimboTextEditorConfig>): void {

        const prepend = this._parseIcon(config.prependIcon);
        const append = this._parseIcon(config.appendIcon);

        this._prependIcon = prepend?.name;
        this._prependIconStyle = prepend?.style;

        this._appendIcon = append?.name;
        this._appendIconStyle = append?.style;

    }

    protected override getConfigResolver() {
        return limboTextBoxConfigResolver;
    }

    private _parseIcon(value: unknown): { name?: string; style?: string } {

        if (typeof value !== "string" || !value.trim()) return {};

        const [name, color] = value.trim().split(/\s+/);

        const variable = color ? extractUmbColorVariable(color.replace("color-", "")) : undefined;

        return {
            name,
            style: variable ? `color: var(${variable});` : undefined
        };

    }

    protected override renderInput() {
        return html`
            <uui-input
                type="text"
                .value=${this.value ?? ''}
                .label=${this.localize.term('general_fieldFor', [this.name])}
                placeholder=${ifDefined(this._placeholder || undefined)}
                maxlength=${ifDefined(this._enforce && this._limit > 0 ? this._limit : undefined)}
                @input=${this.onInput}>
                ${when(this._prependIcon, () => html`
                    <div class="prepend" slot="prepend" style="${ifDefined(this._prependIconStyle)}">
                        <uui-icon name="${this._prependIcon}"></uui-icon>
                    </div>
                `)}
                ${when(this._appendIcon, () => html`
                    <div class="append" slot="append" style="${ifDefined(this._appendIconStyle)}">
                        <uui-icon name="${this._appendIcon}"></uui-icon>
                    </div>
                `)}
            </uui-input>
        `;
    }

    static override styles = [...super.styles, css`

        uui-icon {
            margin: 0;
        }

        .prepend, .append {
            user-select: none;
            height: 100%;
            padding: 0 var(--uui-size-3);
            background: #f3f3f3;
            color: grey;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .prepend:first-child,
        .append:first-child {
            border-right: 1px solid
            var(--uui-input-border-color, var(--uui-color-border));
        }

        * + .prepend, * + .append {
            border-left: 1px solid
            var(--uui-input-border-color, var(--uui-color-border));
        }

    `];

}

export default LimboTextBoxPropertyEditorUiElement;

declare global {
    interface HTMLElementTagNameMap {
        'limbo-textbox-property-editor-ui': LimboTextBoxPropertyEditorUiElement;
    }
}
