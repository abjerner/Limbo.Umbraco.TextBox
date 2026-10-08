import { customElement, html, ifDefined } from '@umbraco-cms/backoffice/external/lit';
import { LimboTextEditorElementBase } from './limbo-text-editor.base.js';
import { limboTextBoxConfigResolver } from './config-resolver.js';

@customElement('limbo-textbox-property-editor-ui')
export class LimboTextBoxPropertyEditorUiElement extends LimboTextEditorElementBase {

    protected override getConfigResolver() {
        return limboTextBoxConfigResolver;
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
            </uui-input>
        `;
    }
}

export default LimboTextBoxPropertyEditorUiElement;

declare global {
    interface HTMLElementTagNameMap {
        'limbo-textbox-property-editor-ui': LimboTextBoxPropertyEditorUiElement;
    }
}
