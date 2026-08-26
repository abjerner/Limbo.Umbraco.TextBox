using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;

#pragma warning disable CS1591

namespace Limbo.Umbraco.TextBox.PropertyEditors;

// [CHANGE: upgrade to Umbraco 17] Related: TextAreaDataEditor.cs, umbraco-package.json, TextBoxComposer.cs
// The v14+ DataEditor only describes the server-side schema. Name, icon, group and the
// editor view now live in the TypeScript propertyEditorUi manifest (umbraco-package.json).

/// <summary>
/// Represents a textbox property editor (server-side schema).
/// </summary>
[DataEditor(EditorAlias, ValueType = ValueTypes.String, ValueEditorIsReusable = true)]
public class TextBoxDataEditor : DataEditor {

    public const string EditorAlias = "Limbo.Umbraco.TextBox";

    public const string EditorUiAlias = $"{EditorAlias}.Ui";

    private readonly IIOHelper _ioHelper;

    /// <summary>
    /// Initializes a new instance of the <see cref="TextBoxDataEditor"/> class.
    /// </summary>
    public TextBoxDataEditor(IDataValueEditorFactory dataValueEditorFactory, IIOHelper ioHelper) : base(dataValueEditorFactory) {
        _ioHelper = ioHelper;
    }

    /// <inheritdoc/>
    protected override IConfigurationEditor CreateConfigurationEditor() => new TextBoxConfigurationEditor(_ioHelper);

}
