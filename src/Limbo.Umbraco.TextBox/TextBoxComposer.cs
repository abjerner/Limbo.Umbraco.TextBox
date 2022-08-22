using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Limbo.Umbraco.TextBox {

    internal class TextBoxComposer : IComposer {

        public void Compose(IUmbracoBuilder builder) {
            builder.ManifestFilters().Append<TextBoxManifestFilter>();
            builder.Services.AddSingleton<TextBoxHelper>();
        }

    }

}