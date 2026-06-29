# Umbraco 13 → 17 upgrade recap

This document recaps the work done to upgrade **Limbo.Umbraco.TextBox** from Umbraco 13 to Umbraco 17.

## Why it's a rewrite, not a bump

Umbraco 14 removed the AngularJS backoffice. Everything client-side from the v13 package
(`TextBox.js` controller, the `.html` views, the custom config-field views, the LESS/CSS, the
`IManifestFilter`, and the XML language files) had to be **rewritten** as TypeScript/Lit web
components registered through a `umbraco-package.json` manifest. The C# layer survives but changed
shape. Stored content and property-editor aliases are preserved, so this is a pure upgrade with no
data migration.

## Decisions taken

| Topic | Decision |
|-------|----------|
| Migration strategy | Native v17 rewrite, **keep aliases** (`Limbo.Umbraco.TextBox` / `Limbo.Umbraco.TextArea`) so existing data types + content keep working |
| Build tooling | Vite + TypeScript (official approach), client project inside the csproj, output to `wwwroot/` |
| Config location | Strongly-typed config stays in C# (read by value converters); the **editing UI** for settings moves to the manifest (`meta.settings.properties`) — required by v14+ |
| Config field UIs | Built-in `Umb.PropertyEditorUi.Integer` / `Toggle` / `TextBox`; old `rows <= 75` soft clamp dropped |
| Counter UX | Full parity — live "characters remaining" line + hard truncation when *enforce* is on |
| Localization | Ported en, da-dk, cs-cz to TS localization manifests |
| Dependencies | `Umbraco.Cms.Core [17.0.0,17.999)` only (dropped `Web.BackOffice`); Skybrud.Essentials → 1.1.68 |
| Target framework | `net10.0` (Umbraco 17 requirement) |

## C# changes

- **`Limbo.Umbraco.TextBox.csproj`** — `net10.0`; `Umbraco.Cms.Core [17.0.0,17.999)` only;
  Skybrud.Essentials `1.1.68`; version `17.0.0-alpha000`; description/URLs to v17; MSBuild target
  runs `npm ci` + `npm run build` before the .NET build so `dotnet pack` produces a complete package.
- **`TextBoxDataEditor` / `TextAreaDataEditor`** — reduced to the v17 `[DataEditor]` shape
  (`ValueType`, `ValueEditorIsReusable`). Name, icon, group and the editor view now live in the
  manifest. Dropped the old `EditorView` constant and the `CreateValueEditor` cache-buster override.
- **`TextBoxConfiguration` / `TextAreaConfiguration`** — `[ConfigurationField("key")]` now only
  carries the storage key (v14+ change); labels/descriptions/UI aliases moved to the manifest.
- **`TextBoxConfigurationEditor` / `TextAreaConfigurationEditor`** — `ConfigurationEditor<T>`
  constructor now takes only `IIOHelper` (`IEditorConfigurationParser` was removed in v17).
- **`TextBoxValueConverter` / `TextAreaValueConverter`** — `IDataType.Configuration` renamed to
  `ConfigurationObject`. `IsConverter` still keys off `EditorAlias` (code-based editors retain it).
- **Removed** — `TextBoxComposer`, `TextBoxHelper`, `TextBoxManifestFilter` (property editors and
  value converters are auto-discovered; the manifest filter is replaced by `umbraco-package.json`).
- **`TextBoxPackage`** — documentation URL bumped to `/v17/`.

## Frontend (new)

Vite + TypeScript + Lit, living inside the csproj. Built bundles go to `wwwroot/` and are gitignored;
`wwwroot/umbraco-package.json` is committed.

- `wwwroot/umbraco-package.json` — a single `bundle` extension importing the built entry, which
  exports all `manifests`.
- `src/index.ts` — registers two `propertyEditorUi` manifests (aliases match the C# editor aliases)
  plus the three `localization` manifests. Settings UI defined under `meta.settings.properties`.
- `src/limbo-text-editor.base.ts` — shared Lit base: renders the input/textarea, the live counter,
  enforces the limit by truncating, dispatches `UmbChangeEvent`.
- `src/textbox.element.ts` / `src/textarea.element.ts` — the two editor elements.
- `src/localization/{en,da,cs}.ts` — ported from the old XML language files.

## Alias mapping (why existing data types keep working)

This is a **code-based** editor. The v13 → v14 migration assigns a data type's `EditorUiAlias` to
the editor's existing alias and **retains** `EditorAlias`. Therefore the TypeScript `propertyEditorUi`
alias must equal the C# editor alias (`Limbo.Umbraco.TextBox` / `Limbo.Umbraco.TextArea`), which is
how migrated data types automatically resolve the new UI.

## Verification

Verified against a real Umbraco 17 instance (unattended install, SQLite, gitignored under `test/`):

- Clean boot — no DI errors (C# DataEditors / ConfigurationEditors register).
- `umbraco-package.json` and all JS bundles served with HTTP 200.
- Both data types created via the management API with the custom aliases → **201 Created**, and the
  config values persisted under `maxChars` / `enforce` / `placeholder` (what the value converter reads).
- The Lit element defines and renders a `uui-input`; the live counter shows the localized
  "characters remaining" message.
- Enforce-truncation works end-to-end: typing 24 characters with `maxChars=10` truncated the value to
  10, showed "You cannot write more than 10 characters!", applied the negative styling, and fired the
  `change` event.

`dotnet pack` produces `Limbo.Umbraco.TextBox.17.0.0-alpha000.nupkg` with all static assets included.
