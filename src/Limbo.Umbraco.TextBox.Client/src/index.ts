// [CHANGE: upgrade to Umbraco 17] Related: wwwroot/umbraco-package.json, textbox.element.ts, textarea.element.ts
// Bundle entry point. The umbraco-package.json "bundle" extension imports this module and
// registers everything exported as `manifests`. The propertyEditorUi aliases intentionally
// match the C# Data Editor aliases: the v13->v14 migration sets a Data Type's EditorUiAlias to
// the code-based editor's alias, so existing data types map to these UIs automatically.
import type { ManifestPropertyEditorUi } from '@umbraco-cms/backoffice/property-editor';
import type { ManifestLocalization } from '@umbraco-cms/backoffice/localization';

const ALIAS = "Limbo.Umbraco.TextBox";
const NAME = "Limbo Textbox";
const NAME2 = "Limbo Textarea";

const TEXTBOX_ALIAS = `${ALIAS}`;
const TEXTBOX_UI_ALIAS = `${TEXTBOX_ALIAS}.Ui`;

const TEXTAREA_ALIAS = "Limbo.Umbraco.TextArea";
const TEXTAREA_UI_ALIAS = `${TEXTAREA_ALIAS}.Ui`;

// Shared data-type settings. Keys must match the C# [ConfigurationField] keys so the values are
// stored under the same aliases and read back via IDataType.ConfigurationObject server-side.
const sharedSettings = [
  {
    alias: 'enforce',
    label: 'Enforce limit',
    description: 'Enforce the limit.',
    propertyEditorUiAlias: 'Umb.PropertyEditorUi.Toggle',
  },
  {
    alias: 'placeholder',
    label: 'Placeholder',
    description: 'A placeholder text to show when the field is empty.',
    propertyEditorUiAlias: 'Umb.PropertyEditorUi.TextBox',
  },
  {
    alias: 'fallback',
    label: 'Fallback',
    description: 'A fallback text used instead if the property is left blank.',
    propertyEditorUiAlias: 'Umb.PropertyEditorUi.TextBox',
  },
  {
    alias: 'stripHtml',
    label: 'Strip HTML',
    description: 'Select if HTML entered by the user should be stripped in the output value.',
    propertyEditorUiAlias: 'Umb.PropertyEditorUi.Toggle',
  },
  {
    alias: 'nullable',
    label: 'Nullable?',
    description:
      'Indicates whether properties of this type should be nullable - meaning that white space values will be converted to null.',
    propertyEditorUiAlias: 'Umb.PropertyEditorUi.Toggle',
  },
];

const textbox: ManifestPropertyEditorUi = {
  type: 'propertyEditorUi',
  alias: TEXTBOX_UI_ALIAS,
  name: `${NAME}: Textbox Property Editor UI`,
  element: () => import('./textbox.element.js'),
  meta: {
    label: 'Limbo Textbox',
    icon: 'icon-autofill',
      group: 'Limbo',
      propertyEditorSchemaAlias: TEXTBOX_ALIAS,
    settings: {
      properties: [
        {
          alias: 'maxChars',
          label: 'Maximum allowed characters',
          description: 'If empty, 500 character limit.',
          propertyEditorUiAlias: 'Umb.PropertyEditorUi.Integer',
        },
        ...sharedSettings,
      ],
    },
  },
};

const textarea: ManifestPropertyEditorUi = {
  type: 'propertyEditorUi',
  alias: TEXTAREA_UI_ALIAS,
  name: `${NAME}: Textarea Property Editor UI`,
  element: () => import('./textarea.element.js'),
  meta: {
    label: 'Limbo Textarea',
    icon: 'icon-application-window-alt',
    group: 'Limbo',
    propertyEditorSchemaAlias: TEXTAREA_ALIAS,
    settings: {
      properties: [
        {
          alias: 'maxChars',
          label: 'Maximum allowed characters',
          description: 'If empty - no character limit.',
          propertyEditorUiAlias: 'Umb.PropertyEditorUi.Integer',
        },
        {
          alias: 'rows',
          label: 'Number of rows',
          description: 'If empty - 10 rows would be set as the default value.',
          propertyEditorUiAlias: 'Umb.PropertyEditorUi.Integer',
        },
        ...sharedSettings,
      ],
    },
  },
};

const localizations: Array<ManifestLocalization> = [
  {
    type: 'localization',
    alias: `${ALIAS}.Localization.En`,
    name: `${NAME}: English`,
    meta: { culture: 'en' },
    js: () => import('./localization/en.js'),
  },
  {
    type: 'localization',
    alias: `${ALIAS}..Localization.Da`,
    name: `${NAME}: Danish`,
    meta: { culture: 'da-dk' },
    js: () => import('./localization/da.js'),
  },
  {
    type: 'localization',
    alias: `${ALIAS}.Localization.Cs`,
    name: `${ NAME }: Czech`,
    meta: { culture: 'cs-cz' },
    js: () => import('./localization/cs.js'),
  },
];

export const manifests = [textbox, textarea, ...localizations];
