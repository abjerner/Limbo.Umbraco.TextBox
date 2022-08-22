@echo off
dotnet build src/Skybrud.Umbraco.TextBox --configuration Debug /t:rebuild /t:pack -p:PackageOutputPath=c:/nuget