using System.Collections.Generic;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Manifest;
using Umbraco.Cms.Infrastructure.Manifest;

using static Limbo.Umbraco.TextBox.TextBoxPackage;

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member

namespace Limbo.Umbraco.TextBox.Manifests;

/// <inheritdoc />
public class TextBoxManifestReader : IPackageManifestReader {

    public Task<IEnumerable<PackageManifest>> ReadPackageManifestsAsync() {

        List<PackageManifest> list = [
            new() {
                AllowTelemetry = true,
                Id = Alias,
                Name = Name,
                Version = InformationalVersion,
                AllowPublicAccess = false,
                Extensions = [
                    new {
                        type = "bundle",
                        alias = $"{Alias}.Bundle",
                        name = $"{Name}: Bundle",
                        js = $"/App_Plugins/{Alias}/limbo-textbox.js",
                    }
                ],
                Importmap = new PackageManifestImportmap {
                    Imports = new Dictionary<string, string> {
                        {"@limbo/textbox", $"/App_Plugins/{Alias}/limbo-textbox.js"}
                    }
                }
            }

        ];

        return Task.FromResult<IEnumerable<PackageManifest>>(
            list
        );

    }

}