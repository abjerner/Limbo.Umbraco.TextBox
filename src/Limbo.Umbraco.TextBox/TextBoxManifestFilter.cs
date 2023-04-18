using System.Collections.Generic;
using Umbraco.Cms.Core.Manifest;

namespace Limbo.Umbraco.TextBox {

    /// <inheritdoc />
    internal class TextBoxManifestFilter : IManifestFilter {

        /// <inheritdoc />
        public void Filter(List<PackageManifest> manifests) {
            manifests.Add(new PackageManifest {
                AllowPackageTelemetry = true,
                PackageName = TextBoxPackage.Name,
                Version = TextBoxPackage.InformationalVersion,
                BundleOptions = BundleOptions.Independent,
                Scripts = new[] {
                    $"/App_Plugins/{TextBoxPackage.Alias}/Scripts/Controllers/TextBox.js"
                },
                Stylesheets = new[] {
                    $"/App_Plugins/{TextBoxPackage.Alias}/Styles/Default.css"
                }
            });
        }

    }

}