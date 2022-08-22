@echo off
dotnet build src/Skybrud.Umbraco.TextBox --configuration Release /t:rebuild /t:pack -p:PackageOutputPath=../../releases/nuget