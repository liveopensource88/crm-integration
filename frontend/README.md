# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Schema with Validation Rules

This repository provides a flexible schema for managing ticket fields with support for validation, including custom error messages, field layout, and more. It's designed to be easily integrated into your form-handling logic, with support for text input, dropdowns, and custom validation rules.

## Features

- **Field Validation**: Supports `minLength`, `maxLength`, `pattern`, and custom error messages.
- **Field Layout**: Define custom row and column layout for each field.
- **Required Fields**: Easily mark fields as required with validation.
- **Dynamic Error Messages**: Customize error messages using placeholders like `{label}`, `{minLength}`, and `{maxLength}`.

## Usage
The schema defines the structure of your ticket form, including the field names, control types, validation rules, and layout. It supports the following field types:

- `InputText`
- `Dropdown`
- `InputTextarea`

## Example Schema

```json
{
  "name": "Ticket",
  "fields": [
    {
      "name": "subject",
      "label": "Subject",
      "control": "InputText",
      "type": "text",
      "layout": {
        "rowIndex": 1,
        "columnWidth": 6
      },
      "validations": {
        "minLength": 10,
        "maxLength": 100,
        "pattern": "^[a-zA-Z0-9 ]+$",
        "messages": {
          "minLength": "{label} must be at least {minLength} characters long.",
          "maxLength": "{label} must not exceed {maxLength} characters.",
          "pattern": "{label} can only contain letters, numbers, and spaces.",
          "required": "{label} is a required field."
        }
      }
    },
    {
      "name": "departmentId",
      "label": "Department",
      "control": "Dropdown",
      "api": {
        "url": "/prod/departments"
      },
      "layout": {
        "rowIndex": 3,
        "columnWidth": 6
      }
    },
    {
      "name": "assigneeId",
      "label": "Assignee",
      "control": "Dropdown",
      "dependsOn": ["departmentId"],
      "api": {
        "url": "/prod/agents?departmentIds={departmentId}"
      },
      "layout": {
        "rowIndex": 3,
        "columnWidth": 6
      }
    }
  ],
  "operations": {
    "create": {
      "api": {
        "url": "/prod/tickets",
        "method": "POST",
        "message": {
          "success": "Ticket created successfully",
          "error": "An error occurred while creating ticket"
        }
      },
      "visible": ["subject", "description", "departmentId", "assigneeId", "contactId"],
      "required": ["subject", "description", "departmentId", "contactId"],
      "readOnly": []
    },
    "update": {
      "api": {
        "url": "/prod/tickets/{id}",
        "method": "PATCH",
        "message": {
          "success": "Ticket updated successfully",
          "error": "An error occurred while updating ticket"
        }
      },
      "visible": ["subject", "description", "departmentId", "assigneeId", "contactId", "status"],
      "required": ["subject", "description", "departmentId", "contactId", "status"],
      "readOnly": []
    }
  }
}
```

## Operations

The `operations` section in the schema defines actions available on the ticket form, including API endpoints, visibility, required fields, and messages for each operation. Supported operations include `create` and `update`, each with its own configuration.

| Property              | Type       | Description                                                                                                                                                               |
|-----------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `api.url`             | `string`   | The API endpoint for the operation. `{id}` in `update` URL represents the ticket ID for identifying records during updates.                                              |
| `api.method`          | `string`   | The HTTP method used for the operation (e.g., `POST` for create, `PATCH` for update).                                                                                     |
| `api.message.success` | `string`   | Message displayed on successful operation execution.                                                                                                                      |
| `api.message.error`   | `string`   | Message displayed if an error occurs during the operation.                                                                                                               |
| `visible`             | `array`    | Specifies fields visible in the operation. These fields will be displayed on the form when performing this operation.                                                    |
| `required`            | `array`    | Lists fields required in the operation. If these fields are empty or missing during the operation, validation errors will be displayed.                                  |
| `readOnly`            | `array`    | Specifies fields that should be read-only during the operation. These fields will be visible but non-editable on the form (empty here, so all fields are editable).      |

### Example Operation Configurations

- **Create Operation**:
  - `url`: `/prod/tickets`
  - `method`: `POST`
  - `visible` fields: `subject`, `description`, `departmentId`, `assigneeId`, `contactId`
  - `required` fields: `subject`, `description`, `departmentId`, `contactId`
  - Messages: Success - `"Ticket created successfully"`, Error - `"An error occurred while creating ticket"`

- **Update Operation**:
  - `url`: `/prod/tickets/{id}`
  - `method`: `PATCH`
  - `visible` fields: `subject`, `description`, `departmentId`, `assigneeId`, `contactId`, `status`
  - `required` fields: `subject`, `description`, `departmentId`, `contactId`, `status`
  - Messages: Success - `"Ticket updated successfully"`, Error - `"An error occurred while updating ticket"`

This structure allows flexible handling of form operations, with detailed control over field behavior and error messaging.


## Validation Logic

Validation is handled dynamically by the schema configuration. The `validations` property can include the following:

- **`minLength`**: The minimum number of characters required.
- **`maxLength`**: The maximum number of characters allowed.
- **`pattern`**: A regular expression that the value must match.

If a field does not meet the validation requirements, the corresponding error message is shown.

### Example of Error Message Replacement

- `minLength` Error: "Subject must be at least 10 characters long."
- `pattern` Error: "Subject can only contain letters, numbers, and spaces."

## Field Layout

You can control the layout of the fields in the form using the `layout` property, which accepts the following keys:

- **`rowIndex`**: The row index where the field will be displayed in the form.
- **`columnWidth`**: The width of the field in the grid layout.

### Example Layout

```json
"layout": {
  "rowIndex": 1,
  "columnWidth": 6
}
```
This would display the field on row 1 with a column width of 6.

## Adding New Fields

To add a new field to the schema, you can extend the existing `schema.json` by adding a new field object with its corresponding properties.

### Example of Adding a New "Due Date" Field:

```json
{
  "name": "description",
  "label": "Description",
  "control": "InputText",
  "layout": {
    "rowIndex": 2,
    "columnWidth": 12
  },
  "validations": {
    "required": true,
    "messages": {
      "required": "{label} is a required field."
    }
  }
}
```

## Customizing Error Messages

The `messages` property within each field allows you to define custom error messages. You can use the following placeholders:

- `{label}`: The label of the field (e.g., "Subject").
- `{minLength}`: The minimum length value for `minLength` validation.
- `{maxLength}`: The maximum length value for `maxLength` validation.

## Dependent Fields Example

Some fields may have dependencies, such as loading data based on the value of another field. Here’s an example:

### `"departmentId"` Field in the Schema

| Property               | Description                                                                                                                                                                   | Example Value                     |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| `name`                 | Unique identifier for the field, used as a key in the form data.                                                                                                              | `"departmentId"`                  |
| `label`                | Label displayed in the form interface, indicating the purpose of the field to the user.                                                                                       | `"Department"`                    |
| `placeholder`          | Placeholder text shown when no department is selected yet.                                                                                                                    | `"Select a department"`           |
| `control`              | Type of input control for this field; specifies that this is a dropdown selection.                                                                                            | `"Dropdown"`                      |
| `api.url`              | API endpoint to fetch department options for the dropdown. This URL is accessed when the form loads or the field is interacted with, ensuring dynamic and current data.       | `"/prod/departments"`             |
| `layout.rowIndex`      | Row index for the field in the form layout, controlling where it appears vertically.                                                                                          | `3`                               |
| `layout.columnWidth`   | Specifies the width of the field in the form layout, relative to other fields in the same row. Allows responsive design, such as two fields side-by-side if each has a width of 6. | `6`                               |

### Example API Response for `/prod/departments`

To populate this dropdown, the API should return an array of department objects like the following:

```json
[
  { "id": "1", "name": "Sales" },
  { "id": "2", "name": "Support" },
  { "id": "3", "name": "Engineering" }
]
```

This setup allows the `"departmentId"` dropdown to remain up-to-date with current department options, with a flexible layout for integration into various form designs.


## Field Layout
You can control the layout of the fields in the form using the layout property, which accepts the following keys:

- rowIndex: The row index where the field will be displayed in the form.
- columnWidth: The width of the field in the grid layout.
