---
order: 1
---

# Textbox

The **Limbo Textbox** property editors is similar to Umbraco's build-in **Textbox** property, but adds some additional functionality.

![image](https://github.com/abjerner/Limbo.Umbraco.TextBox/assets/3634580/d4b93cd0-822c-463e-b4ff-e25ce605be82)
*Example of the textbox and textarea property editors used together.*

## Data type configuration

Data types using this property editor will have the following configuration options:

### Maximum allowed characters

The character limit of the textbox. Defaults to 500.

### Enforce limit

Whether the character limit should be enforced. If enabled, users won't be able to enter more characters than the specified limit. If disabled (default), the character limit will still be visualized, but the user will be able to exceed the character limit.

### Placeholder

A placeholder text that will be shown in the backoffice when the textbox is empty.

### Fallback

A fallback value that will be returned instead if the textbox is left empty.

### Strip HTML

Whether HTML characters should be stripped from the outputted value. Default is false.

### Nullable

Whether the properties using this data type should be nullable. If enabled, and the textbox is left empty, <code>null</code> will be returned instead of an empty string. Disabled by default.