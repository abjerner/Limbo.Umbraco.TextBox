// [CHANGE: upgrade to Umbraco 17] Related: wwwroot/umbraco-package.json, textbox.element.ts, textarea.element.ts
// Bundle entry point. The umbraco-package.json "bundle" extension imports this module and
// registers everything exported as `manifests`. The propertyEditorUi aliases intentionally
// match the C# Data Editor aliases: the v13->v14 migration sets a Data Type's EditorUiAlias to
// the code-based editor's alias, so existing data types map to these UIs automatically.
import type { ManifestPropertyEditorUi } from '@umbraco-cms/backoffice/property-editor';
import type { ManifestLocalization } from '@umbraco-cms/backoffice/localization';

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
  alias: 'Limbo.Umbraco.TextBox',
  name: 'Limbo Textbox Property Editor UI',
  element: () => import('./textbox.element.js'),
  meta: {
    label: 'Limbo Textbox',
    icon: 'icon-autofill',
    group: 'common',
    propertyEditorSchemaAlias: 'Limbo.Umbraco.TextBox',
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
  alias: 'Limbo.Umbraco.TextArea',
  name: 'Limbo Textarea Property Editor UI',
  element: () => import('./textarea.element.js'),
  meta: {
    label: 'Limbo Textarea',
    icon: 'icon-application-window-alt',
    group: 'common',
    propertyEditorSchemaAlias: 'Limbo.Umbraco.TextArea',
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
    alias: 'Limbo.Umbraco.TextBox.Localization.En',
    name: 'English',
    meta: { culture: 'en' },
    js: () => import('./localization/en.js'),
  },
  {
    type: 'localization',
    alias: 'Limbo.Umbraco.TextBox.Localization.Da',
    name: 'Danish',
    meta: { culture: 'da-dk' },
    js: () => import('./localization/da.js'),
  },
  {
    type: 'localization',
    alias: 'Limbo.Umbraco.TextBox.Localization.Cs',
    name: 'Czech',
    meta: { culture: 'cs-cz' },
    js: () => import('./localization/cs.js'),
  },
];

export const manifests = [textbox, textarea, ...localizations];
