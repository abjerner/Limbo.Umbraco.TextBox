@echo off
dotnet build src/Limbo.Umbraco.TextBox --configuration Release /t:rebuild /t:pack -p:PackageOutputPath=../../releases/nuget