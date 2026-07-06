@echo off
dotnet msbuild src/Limbo.Umbraco.TextBox.Client -t:RunBuild
dotnet build src/Limbo.Umbraco.TextBox --configuration Debug /t:rebuild /t:pack -p:PackageOutputPath=c:\nuget\Umbraco17