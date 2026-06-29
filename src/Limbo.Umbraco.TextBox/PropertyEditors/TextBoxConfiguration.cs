using Umbraco.Cms.Core.PropertyEditors;

namespace Limbo.Umbraco.TextBox.PropertyEditors;

// [CHANGE: upgrade to Umbraco 17] Related: TextAreaConfiguration.cs, src/index.ts
// In v14+ the [ConfigurationField] attribute only carries the storage key. The editing UI for
// each setting (label, description, propertyEditorUiAlias, default value) is declared in the
// backoffice manifest (src/index.ts -> meta.settings.properties). This class is still used
// server-side as the strongly-typed IDataType.ConfigurationObject read by the value converter.

/// <summary>
/// Represents the configuration for the textbox value editor.
/// </summary>
public class TextBoxConfiguration {

    /// <summary>
    /// Gets or sets the maximum character count allowed in the textbox.
    /// </summary>
    [ConfigurationField("maxChars")]
    public int? MaxChars { get; set; }

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
