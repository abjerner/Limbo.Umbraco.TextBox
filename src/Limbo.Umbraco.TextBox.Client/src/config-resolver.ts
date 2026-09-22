import type { UmbPropertyEditorConfigCollection } from '@umbraco-cms/backoffice/property-editor';
import type { UmbPropertyDatasetContext } from '@umbraco-cms/backoffice/property';
import type { UmbContentWorkspaceContext } from '@umbraco-cms/backoffice/content';
import type { UmbEntityUnique } from '@umbraco-cms/backoffice/entity';
import type { LimboTextEditorElementBase } from './limbo-text-editor.base.js';

export type LimboTextEditorConfig = Record<string, unknown>;

export interface LimboTextEditorConfigResolverOwnerContext {
    key?: UmbEntityUnique;
    entityType?: string;
    contentTypeKey?: UmbEntityUnique;
    contentTypeAlias?: string;
    dataset: UmbPropertyDatasetContext;
}

export interface LimboTextEditorConfigResolverRootContext {
    key?: UmbEntityUnique;
    entityType?: string;
    contentTypeKey?: UmbEntityUnique;
    contentTypeAlias?: string;
    context: UmbContentWorkspaceContext;
}

export interface LimboTextEditorConfigResolverContext {

    /** The property editor element whose configuration is being resolved. */
    element: LimboTextEditorElementBase;

    /** The alias of the property, when it can be determined from the containing umb-property element. */
    propertyAlias?: string;

    /** The original Data Type configuration converted to a plain object. */
    originalConfig: Readonly<LimboTextEditorConfig>;

    /** The configuration after any earlier resolver has run. */
    config: Readonly<LimboTextEditorConfig>;

    /** The current property dataset (document, block, element, etc.), when available. */
    dataset?: UmbPropertyDatasetContext;

    /** Key of the entity represented by the current property dataset. */
    datasetKey?: UmbEntityUnique;

    /** Entity type represented by the current property dataset. */
    datasetEntityType?: string;

    /**
     * The content entity directly owning the property, when available.
     *
     * For a document property this is the document. For a property inside a block this is the
     * block/element workspace when Umbraco exposes it as a content workspace context.
     */
    owner?: LimboTextEditorConfigResolverOwnerContext;

    /**
     * The outer containing content entity, when available.
     *
     * Context resolution passes matching nested content contexts, allowing a property editor inside
     * a block to reach the containing document/media/member workspace.
     */
    root?: LimboTextEditorConfigResolverRootContext;

    /** Read a value from the current property dataset. */
    getPropertyValue<T = unknown>(alias: string): Promise<T | undefined>;

}

export interface LimboTextEditorConfigResolver {
    resolve(
        context: LimboTextEditorConfigResolverContext,
    ): Partial<LimboTextEditorConfig> | Promise<Partial<LimboTextEditorConfig>>;
}

export type LimboTextBoxConfigResolver = LimboTextEditorConfigResolver;
export type LimboTextAreaConfigResolver = LimboTextEditorConfigResolver;

export let limboTextBoxConfigResolver: LimboTextBoxConfigResolver | undefined;
export let limboTextAreaConfigResolver: LimboTextAreaConfigResolver | undefined;

export function setLimboTextBoxConfigResolver(resolver?: LimboTextBoxConfigResolver): void {
    limboTextBoxConfigResolver = resolver;
}

export function setLimboTextAreaConfigResolver(resolver?: LimboTextAreaConfigResolver): void {
    limboTextAreaConfigResolver = resolver;
}

export function configToObject(config?: UmbPropertyEditorConfigCollection): LimboTextEditorConfig {
    if (!config) return {};
    return Object.fromEntries(config.map(x => [x.alias, x.value]));
}
