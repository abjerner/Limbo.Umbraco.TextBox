using System.Collections.Generic;
using System.Threading.Tasks;
using Skybrud.Essentials.Security.Extensions;
using Umbraco.Cms.Core.Manifest;
using Umbraco.Cms.Infrastructure.Manifest;

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member

namespace Limbo.Umbraco.TextBox.Manifests;

/// <inheritdoc />
public class TextBoxManifestReader : IPackageManifestReader {

    public Task<IEnumerable<PackageManifest>> ReadPackageManifestsAsync() {

        string alias = TextBoxPackage.Alias;
        string cacheBuster = TextBoxPackage.InformationalVersion.ToMd5Hash();

        List<PackageManifest> list = [
            new() {
                AllowTelemetry = true,
                Id = TextBoxPackage.Alias,
                Name = TextBoxPackage.Name,
                Version = TextBoxPackage.InformationalVersion,
                AllowPublicAccess = false,
                Extensions = [
                    new {
                        type = "bundle",
                        alias = $"{alias}.Bundle",
                        name = $"{TextBoxPackage.Name}: Bundle",
                        js = $"/App_Plugins/{alias}/limbo-textbox.js?v={cacheBuster}",
                    }
                ]
            }

        ];

        return Task.FromResult<IEnumerable<PackageManifest>>(
            list
        );

    }

}