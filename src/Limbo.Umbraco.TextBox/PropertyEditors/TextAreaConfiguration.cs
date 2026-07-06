using Umbraco.Cms.Core.PropertyEditors;

namespace Limbo.Umbraco.TextBox.PropertyEditors;

// [CHANGE: upgrade to Umbraco 17] Related: TextBoxConfiguration.cs, src/index.ts
// In v14+ the [ConfigurationField] attribute only carries the storage key. The editing UI for
// each setting (label, description, propertyEditorUiAlias, default value) is declared in the
// backoffice manifest (src/index.ts -> meta.settings.properties). This class is still used
// server-side as the strongly-typed IDataType.ConfigurationObject read by the value converter.
// The former rows<=75 soft clamp is dropped in favour of the built-in integer editor.

/// <summary>
/// Represents the configuration for the textarea value editor.
/// </summary>
public class TextAreaConfiguration {

    /// <summary>
    /// Gets or sets the maximum character count allowed in the textarea.
    /// </summary>
    [ConfigurationField("maxChars")]
    public int? MaxChars { get; set; }

    /// <summary>
    /// Gets or sets the deault number of rows.
    /// </summary>
    [ConfigurationField("rows")]
    public int? Rows { get; set; }

    /// <summary>
    /// Gets or sets whether <see cref="MaxChars"/> will be encorced.
    /// </summary>
    [ConfigurationField("enforce")]
    public bool EnforceLimit { get; set; }

    /// <summary>
    /// Gets or sets the placeholder text of the textarea.
    /// </summary>
    [ConfigurationField("placeholder")]
    public string? Placeholder { get; set; }

    /// <summary>
    /// Gets or sets the fallback text of the textarea.
    /// </summary>
    [ConfigurationField("fallback")]
    public string? Fallback { get; set; }

    /// <summary>
    /// Gets or sets whether HTML tags should be stripped from the output value.
    /// </summary>
    [ConfigurationField("stripHtml")]
    public bool StripHtml { get; set; }

    /// <summary>
    /// Gets or sets whether the property value is nullable.
    /// </summary>
    [ConfigurationField("nullable")]
    public bool IsNullable { get; set; }

}
