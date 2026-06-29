// [CHANGE: upgrade to Umbraco 17] Related: textbox.element.ts, textarea.element.ts
// Shared base for the Limbo Textbox/Textarea property editor UIs. Replaces the old AngularJS
// "Limbo.TextBox.Controller" + TextBox.html/TextArea.html. Renders a uui-input/uui-textarea and
// the live "characters remaining" counter, and enforces the limit by truncating when configured.
import { css, html, nothing, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import type {
  UmbPropertyEditorUiElement,
  UmbPropertyEditorConfigCollection,
} from '@umbraco-cms/backoffice/property-editor';

export abstract class LimboTextEditorElementBase extends UmbLitElement implements UmbPropertyEditorUiElement {

  @property({ type: String })
  public value = '';

  @state() protected _limit = 0;
  @state() protected _enforce = false;
  @state() protected _placeholder = '';
  @state() protected _info?: string;
  @state() protected _negative = false;

  @property({ attribute: false })
  public set config(config: UmbPropertyEditorConfigCollection | undefined) {
    this._limit = Number(config?.getValueByAlias('maxChars')) || 0;
    this._enforce = Boolean(config?.getValueByAlias('enforce'));

    // A placeholder prefixed with '#' references a localization key (legacy behaviour).
    let placeholder = config?.getValueByAlias<string>('placeholder') ?? '';
    if (placeholder.startsWith('#')) {
      placeholder = this.localize.term(placeholder.substring(1)) || placeholder;
    }
    this._placeholder = placeholder;

    this.configChanged(config);
    this.#updateInfo();
  }

  /** Hook for subclasses to read additional configuration (e.g. textarea rows). */
  protected configChanged(_config?: UmbPropertyEditorConfigCollection): void {}

  protected readonly onInput = (event: Event): void => {
    const target = event.target as HTMLElement & { value: string };
    let next = target.value ?? '';

    if (this._enforce && this._limit > 0 && next.length > this._limit) {
      next = next.substring(0, this._limit);
      target.value = next;
    }

    this.value = next;
    this.#updateInfo();
    this.dispatchEvent(new UmbChangeEvent());
  };

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
        margin-top: var(--uui-size-space-2, 6px);
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
