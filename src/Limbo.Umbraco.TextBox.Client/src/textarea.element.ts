import { customElement, html, ifDefined, state } from '@umbraco-cms/backoffice/external/lit';
import { LimboTextEditorElementBase } from './limbo-text-editor.base.js';
import { limboTextAreaConfigResolver, type LimboTextEditorConfig } from './config-resolver.js';

@customElement('limbo-textarea-property-editor-ui')
export class LimboTextAreaPropertyEditorUiElement extends LimboTextEditorElementBase {

    @state() private _rows = 10;

    protected override getConfigResolver() {
        return limboTextAreaConfigResolver;
    }

    protected override resolvedConfigChanged(config: Readonly<LimboTextEditorConfig>): void {
        this._rows = Number(config.rows) || 10;
    }

    protected override renderInput() {
        return html`
            <uui-textarea
                .value=${this.value ?? ''}
                .label=${this.localize.term('general_fieldFor', [this.name])}
                placeholder=${ifDefined(this._placeholder || undefined)}
                rows=${this._rows}
                maxlength=${ifDefined(this._enforce && this._limit > 0 ? this._limit : undefined)}
                @input=${this.onInput}>
            </uui-textarea>
        `;
    }
}

export default LimboTextAreaPropertyEditorUiElement;

declare global {
    interface HTMLElementTagNameMap {
        'limbo-textarea-property-editor-ui': LimboTextAreaPropertyEditorUiElement;
    }
}
