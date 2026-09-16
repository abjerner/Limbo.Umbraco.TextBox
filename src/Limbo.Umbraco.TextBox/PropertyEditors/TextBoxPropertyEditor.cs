using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;

#pragma warning disable CS1591

namespace Limbo.Umbraco.TextBox.PropertyEditors;

/// <summary>
/// Represents a textbox property editor (server-side schema).
/// </summary>
[DataEditor(EditorAlias, ValueType = EditorValueType, ValueEditorIsReusable = true)]
public class TextBoxPropertyEditor : DataEditor {

    public const string EditorName = "Limbo Textbox";

    public const string EditorAlias = "Limbo.Umbraco.TextBox";

    public const string EditorUiAlias = $"{EditorAlias}.PropertyEditorUi";

    public const string EditorIcon = "icon-autofill";

    public const string EditorGroup = "Limbo";

    public const string EditorValueType = ValueTypes.String;

    private readonly IIOHelper _ioHelper;

    /// <summary>
    /// Initializes a new instance of the <see cref="TextBoxPropertyEditor"/> class.
    /// </summary>
    public TextBoxPropertyEditor(IDataValueEditorFactory dataValueEditorFactory, IIOHelper ioHelper) : base(dataValueEditorFactory) {
        _ioHelper = ioHelper;
    }

    /// <inheritdoc/>
    protected override IConfigurationEditor CreateConfigurationEditor() => new TextBoxConfigurationEditor(_ioHelper);

}
