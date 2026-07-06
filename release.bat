@echo off
dotnet msbuild src/Limbo.Umbraco.TextBox.Client -t:RunBuild
dotnet build src/Limbo.Umbraco.TextBox --configuration Release /t:rebuild /t:pack -p:PackageOutputPath=../../releases/nuget