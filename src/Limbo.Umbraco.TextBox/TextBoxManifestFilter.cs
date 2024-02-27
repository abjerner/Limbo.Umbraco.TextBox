using System.Collections.Generic;
using Umbraco.Cms.Core.Manifest;

namespace Limbo.Umbraco.TextBox;

/// <inheritdoc />
internal class TextBoxManifestFilter : IManifestFilter {

    /// <inheritdoc />
    public void Filter(List<PackageManifest> manifests) {

        // Initialize a new manifest filter for this package
        PackageManifest manifest = new() {
            AllowPackageTelemetry = true,
            PackageId = TextBoxPackage.Alias,
            PackageName = TextBoxPackage.Name,
            Version = TextBoxPackage.InformationalVersion,
            BundleOptions = BundleOptions.Independent,
            Scripts = new[] {
                $"/App_Plugins/{TextBoxPackage.Alias}/Scripts/Controllers/TextBox.js"
            },
            Stylesheets = new[] {
                $"/App_Plugins/{TextBoxPackage.Alias}/Styles/Default.css"
            }
        };

        // Append the manifest
        manifests.Add(manifest);

    }

}