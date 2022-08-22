﻿using System;
using Skybrud.Essentials.Strings;
using Umbraco.Cms.Core.Dictionary;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;

namespace Limbo.Umbraco.TextBox.PropertyEditors.ValueConverters {

    internal class TextBoxValueConverter : PropertyValueConverterBase {

        private readonly ILocalizedTextService _localizedTextService;
        private readonly ICultureDictionary _cultureDictionary;

        public TextBoxValueConverter(ILocalizedTextService localizedTextService, ICultureDictionary cultureDictionary) {
            _localizedTextService = localizedTextService;
            _cultureDictionary = cultureDictionary;
        }

        public override bool IsConverter(IPublishedPropertyType propertyType) {
            return propertyType.EditorAlias == TextBoxDataEditor.EditorAlias;
        }

        public override object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview) {
            return source;
        }

        public override object ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {

            if (inter is not string value) return string.Empty;
            if (propertyType.DataType.Configuration is not TextBoxConfiguration config) return string.Empty;

            if (string.IsNullOrWhiteSpace(value)) {
                return config.Fallback.IsNullOrWhiteSpace() ? string.Empty : _localizedTextService.UmbracoDictionaryTranslate(_cultureDictionary, config.Fallback);
            }

            return config.StripHtml ? StringUtils.StripHtml(value) : value;

        }

        public override object ConvertIntermediateToXPath(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {
            return null;
        }

        public override Type GetPropertyValueType(IPublishedPropertyType propertyType) {
            return typeof(string);
        }

    }

}