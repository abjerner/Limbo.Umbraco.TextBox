---
order: 2
---

# Textarea

The **Limbo Textarea** property editors is similar to Umbraco's build-in **Textarea** property, but adds some additional functionality.

![image](https://github.com/abjerner/Limbo.Umbraco.TextBox/assets/3634580/8a8ba27b-7336-4a69-b8b5-cd837598aacd)
*Example of the textbox and textarea property editors used together.*

## Data type configuration

Data types using this property editor will have the following configuration options:

### Maximum allowed characters

The character limit of the textarea. Default is no limit.

### Number of rows

The initial number of rows for the textarea.

### Enforce limit

Whether the character limit should be enforced. If enabled, users won't be able to enter more characters than the specified limit. If disabled (default), the character limit will still be visualized, but the user will be able to exceed the character limit.

### Placeholder

A placeholder text that will be shown in the backoffice when the textarea is empty.

### Fallback

A fallback value that will be returned instead if the textarea is left empty.

### Strip HTML

Whether HTML characters should be stripped from the outputted value. Default is false.

### Nullable

Whether the properties using this data type should be nullable. If enabled, and the textarea is left empty, <code>null</code> will be returned instead of an empty string. Disabled by default.