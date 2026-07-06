using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;

namespace Limbo.Umbraco.TextBox.PropertyEditors;

// [CHANGE: upgrade to Umbraco 17] Related: TextAreaConfigurationEditor.cs - ConfigurationEditor<T> ctor now takes only IIOHelper

/// <summary>
/// Represents the configuration editor for the textbox value editor.
/// </summary>
public class TextBoxConfigurationEditor : ConfigurationEditor<TextBoxConfiguration> {

    /// <inheritdoc />
    public TextBoxConfigurationEditor(IIOHelper ioHelper) : base(ioHelper) { }

}