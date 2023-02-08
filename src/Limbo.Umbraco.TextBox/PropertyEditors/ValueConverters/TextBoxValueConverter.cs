using System;
using Skybrud.Essentials.Strings;
using Umbraco.Cms.Core.Dictionary;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;
using StringExtensions = Skybrud.Essentials.Strings.Extensions.StringExtensions;

#pragma warning disable CS1591

namespace Limbo.Umbraco.TextBox.PropertyEditors.ValueConverters {

    public class TextBoxValueConverter : PropertyValueConverterBase {

        private readonly ILocalizedTextService _localizedTextService;
        private readonly ICultureDictionary _cultureDictionary;

        public TextBoxValueConverter(ILocalizedTextService localizedTextService, ICultureDictionary cultureDictionary) {
            _localizedTextService = localizedTextService;
            _cultureDictionary = cultureDictionary;
        }

        public override bool IsConverter(IPublishedPropertyType propertyType) {
            return propertyType.EditorAlias == TextBoxDataEditor.EditorAlias;
        }

        public override object? ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object? source, bool preview) {
            return source;
        }

        public override object? ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object? inter, bool preview) {

            string? value = inter as string;

            if (propertyType.DataType.Configuration is not TextBoxConfiguration config) return value ?? string.Empty;

            if (string.IsNullOrWhiteSpace(value)) {
                value = config.Fallback.IsNullOrWhiteSpace() ? string.Empty : _localizedTextService.UmbracoDictionaryTranslate(_cultureDictionary, config.Fallback) ?? string.Empty;
            }

            value = config.StripHtml ? StringUtils.StripHtml(value) : value;

            return config.IsNullable ? StringExtensions.NullIfWhiteSpace(value) : value;

        }

        public override Type GetPropertyValueType(IPublishedPropertyType propertyType) {
            return typeof(string);
        }

    }

}