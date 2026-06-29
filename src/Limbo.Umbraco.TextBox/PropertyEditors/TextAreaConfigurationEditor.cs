using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;

namespace Limbo.Umbraco.TextBox.PropertyEditors;

// [CHANGE: upgrade to Umbraco 17] Related: TextBoxConfigurationEditor.cs - ConfigurationEditor<T> ctor now takes only IIOHelper

/// <summary>
/// Represents the configuration editor for the textarea value editor.
/// </summary>
public class TextAreaConfigurationEditor : ConfigurationEditor<TextAreaConfiguration> {

    /// <inheritdoc />
    public TextAreaConfigurationEditor(IIOHelper ioHelper) : base(ioHelper) { }

}