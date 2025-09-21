# salesforce-lwc-checkbox-group

A reusable Lightning Web Component (LWC) that offers a more flexible and compact way to handle single or multiple checkbox validation than standard Salesforce components.

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)
  - [Properties (API)](#properties-api)
  - [Methods (API)](#methods-api)
  - [Events](#events)
  - [Examples](#examples)
- [Styling / Customization](#styling--customization)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 

---

## Requirements

- This component relies on the [`checkbox`](https://github.com/marnick94/salesforce-lwc-checkbox) component as its underlying building block.

---

## Usage

You can use this component inside your Lightning Web Components or Aura components.

### Properties (API)

| Property                   | Type      | Required | Default | Description                                            |
|----------------------------|-----------|----------|---------|--------------------------------------------------------|
| `label`                    | `String`  | No       | `<blank>` | Label of the checkbox-group.                         |
| `readonly`                 | `Boolean` | No       | `false` | If `true`, the checkbox-group is read-only.            |
| `required`                 | `Boolean` | No       | `false` | If `true`, at least one checkbox in the group must be selected. |
| `multiple`                 | `Boolean` | No       | `false` | If `false`, only one checkbox in the group can be selected at a time. |
| `messageWhenValueMissing`  | `String`  | No       | `Complete this field.` | Error message shown when the checkbox-group is `required` and no checkbox in the group has been selected. |

### Methods (API)

| Method              | Arguments   | Return Type | Description                                           |
|---------------------|-------------|-------------|-------------------------------------------------------|
| `clear`              | None | None | Clears the checkbox selection. |
| `blur`              | None | None | Removes focus from the last focused checkbox. |
| `focus`             | None | None | Sets focus on the first checkbox in the group. |
| `checkValidity`     | None | `Boolean` | Checks if the input is valid. Returns `false` if:<br>•&nbsp;&nbsp;`readonly = false` and custom validity is set<br>•&nbsp;&nbsp;`readonly = false` AND `required = true` AND no checkbox in the group has been selected<br>•&nbsp;&nbsp;at least one checkbox in the group is invalid<br>Otherwise returns `true`. |
| `reportValidity`    | None | `Boolean` | Displays the error messages and returns `false` if the checkbox-group is invalid. If the checkbox-group is valid, `reportValidity()` clears displayed error messages and returns `true`. |
| `setCustomValidity` | `message` : `String` | None | Sets a custom error message to be displayed immediately. If `message` is [`<blank>`, `null`, `undefined`], custom validity is unset. |

### Events

| Event               | Description                                       |
|---------------------|---------------------------------------------------|
| `change`            | The state of a checkbox in the group has changed. |
| `click`             | A checkbox in the group has been clicked.         |
| `input`             | Same as `change`.                                 |
| `focus`             | A checkbox in the group has gained focus.         |
| `blur`              | A checkbox in the group has lost focus.           |

## Examples

### Example 1: Basic Usage

![base_checkbox_group](https://github.com/user-attachments/assets/653c759f-75bf-469b-8f7d-839520618d05)

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox-group label="Lorem ipsum dolor sit amet, consectetur adipiscing elit." onchange={handleChange}>
      <c-checkbox data-id="a">Quisque efficitur elit ac leo aliquam, sed vestibulum dolor feugiat.</c-checkbox>
      <c-checkbox data-id="b">Fusce sit amet arcu auctor, volutpat sem nec, porta ante.</c-checkbox>
      <c-checkbox data-id="c">Morbi sit amet libero finibus, semper tortor et, aliquet urna.</c-checkbox>
      <c-checkbox data-id="d">Sed eros leo, convallis sed convallis id, elementum at elit.</c-checkbox>
      <c-checkbox data-id="e">Praesent ullamcorper ligula id ex lacinia, eu luctus mauris laoreet.</c-checkbox>
  </c-checkbox-group>
</template>
```

```js
// parentComponent.js
import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
  @track values = {};

  handleChange(event) {
      this.values[event.detail.dataset.id] = event.detail.checked;
  }
}
```

## Styling / Customization

You can customize styles (colors, size, margins, etc.) by editing the component's `.css` file.  
Use CSS variables or SLDS design tokens where possible to maintain compatibility with Salesforce themes (light/dark, accessibility).

---

## Contributing

1. Open an *Issue* to report bugs or request features.  
2. Fork the repository and create a new branch for your changes.  
3. Submit a *Pull Request* with a clear description of your updates.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
