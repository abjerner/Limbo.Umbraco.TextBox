using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;

#pragma warning disable CS1591

namespace Limbo.Umbraco.TextBox.PropertyEditors;

/// <summary>
/// Represents a textarea property editor (server-side schema).
/// </summary>
[DataEditor(EditorAlias, ValueType = EditorValueType, ValueEditorIsReusable = true)]
public class TextAreaPropertyEditor : DataEditor {

    public const string EditorName = "Limbo Textarea";

    public const string EditorAlias = "Limbo.Umbraco.TextArea";

    public const string EditorUiAlias = $"{EditorAlias}.PropertyEditorUi";

    public const string EditorIcon = "icon-application-window-alt";

    public const string EditorGroup = "Limbo";

    public const string EditorValueType = ValueTypes.Text;

    private readonly IIOHelper _ioHelper;

    /// <summary>
    /// Initializes a new instance of the <see cref="TextAreaPropertyEditor"/> class.
    /// </summary>
    public TextAreaPropertyEditor(IDataValueEditorFactory dataValueEditorFactory, IIOHelper ioHelper) : base(dataValueEditorFactory) {
        _ioHelper = ioHelper;
    }

    /// <inheritdoc/>
    protected override IConfigurationEditor CreateConfigurationEditor() => new TextAreaConfigurationEditor(_ioHelper);

}