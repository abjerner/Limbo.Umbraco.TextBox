# Limbo Textbox [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md) [![NuGet](https://img.shields.io/nuget/vpre/Limbo.Umbraco.TextBox.svg)](https://www.nuget.org/packages/Limbo.Umbraco.TextBox) [![NuGet](https://img.shields.io/nuget/dt/Limbo.Umbraco.TextBox.svg)](https://www.nuget.org/packages/Limbo.Umbraco.TextBox) [![Our Umbraco](https://img.shields.io/badge/our-umbraco-%233544B1)](https://our.umbraco.com/packages/backoffice-extensions/limbo-textbox/)

**Limbo Textbox** (or **Limbo.Umbraco.TextBox**) is a package that adds new textbox and textarea properties for Umbraco 10. While having similar functionality to the build in property editors, this package adds a few extra features:

- **More visible character limit**  
  The default property editors in Umbraco only shows the limit when it has been reached, whereas the property editors in this package show the limit right away, making it more visual to the editor that there is a limit.
  
- **Enforced character limit**  
  Umbraco will only show the limit when it has been reached or exceeded, but not actually enforce the character limit. Via the config option on the data type, the property editors in this package can be configured to prevent the user from exceeding the character limit.
  
- **Placeholder text**  
  Both the textbox and textarea property editors allows setting a placeholder text that will be visible to the user when editing the properties in the backoffice.

- **Fallback text**  
  An optional fallback text may be set on the data type to be used instead when the property is left blank. The underlying property value converter will make sure the fallback value is returned when this is the case.

## Installation

The Umbraco 10 version of this package is only available via [NuGet](https://www.nuget.org/packages/Limbo.Umbraco.TextBox/1.0.0). To install the package, you can use either .NET CLI:

```
dotnet add package Limbo.Umbraco.TextBox --version 1.0.0
```

> **Note**  
> This package replaces our older [Skybrud.Umbraco.TextBox](https://github.com/abjerner/Skybrud.Umbraco.TextBox) package. See this package for older version of Umbraco.

## Screenshots

*Empty properties with the placeholder text visible*
![image](https://user-images.githubusercontent.com/3634580/88987152-5db17780-d2d5-11ea-889b-ebcad9ca80ba.png)

*Properties with values below the character limit*
![image](https://user-images.githubusercontent.com/3634580/88987187-73bf3800-d2d5-11ea-8962-b6395da8dd87.png)

*Properties with values above the character limit, but not enforced*
![image](https://user-images.githubusercontent.com/3634580/88988260-a9195500-d2d8-11ea-97ac-748dd8748832.png)

*The configuration options (prevalues) of the textarea data type*
![image](https://user-images.githubusercontent.com/3634580/88987630-db29b780-d2d6-11ea-86ea-77885086f3b7.png)
