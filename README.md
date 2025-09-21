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

| Event               | Description                                       | Detail                                 |
|---------------------|---------------------------------------------------|----------------------------------------|
| `change`            | The state of a checkbox in the group has changed. | The checkbox that triggered the event. |
| `click`             | A checkbox in the group has been clicked.         | The checkbox that triggered the event. |
| `input`             | Same as `change`.                                 | The checkbox that triggered the event. |
| `focus`             | A checkbox in the group has gained focus.         | The checkbox that triggered the event. |
| `blur`              | A checkbox in the group has lost focus.           | The checkbox that triggered the event. |

## Examples

### Example 1: Base Usage

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

### Example 2: Multiple Selection

![multiple_checkbox_group](https://github.com/user-attachments/assets/6f6b3740-efcf-41a6-ae5e-aacd11d768f6)

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox-group label="Lorem ipsum dolor sit amet, consectetur adipiscing elit." onchange={handleChange} multiple>
      <c-checkbox data-id="a">Quisque efficitur elit ac leo aliquam, sed vestibulum dolor feugiat.</c-checkbox>
      <c-checkbox data-id="b">Fusce sit amet arcu auctor, volutpat sem nec, porta ante.</c-checkbox>
      <c-checkbox data-id="c">Morbi sit amet libero finibus, semper tortor et, aliquet urna.</c-checkbox>
      <c-checkbox data-id="d">Sed eros leo, convallis sed convallis id, elementum at elit.</c-checkbox>
      <c-checkbox data-id="e">Praesent ullamcorper ligula id ex lacinia, eu luctus mauris laoreet.</c-checkbox>
  </c-checkbox-group>
</template>
```

### Example 3: Required

![required_checkbox_group](https://github.com/user-attachments/assets/7194939b-3283-44f8-9e4a-e18d3446f3f3)

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox-group label="Lorem ipsum dolor sit amet, consectetur adipiscing elit." onchange={handleChange} required>
      <c-checkbox data-id="a">Quisque efficitur elit ac leo aliquam, sed vestibulum dolor feugiat.</c-checkbox>
      <c-checkbox data-id="b">Fusce sit amet arcu auctor, volutpat sem nec, porta ante.</c-checkbox>
      <c-checkbox data-id="c">Morbi sit amet libero finibus, semper tortor et, aliquet urna.</c-checkbox>
      <c-checkbox data-id="d">Sed eros leo, convallis sed convallis id, elementum at elit.</c-checkbox>
      <c-checkbox data-id="e">Praesent ullamcorper ligula id ex lacinia, eu luctus mauris laoreet.</c-checkbox>
  </c-checkbox-group>
</template>
```

### Example 4: Readonly

![readonly_checkbox_group](https://github.com/user-attachments/assets/8f224887-eaff-4b36-9104-033099460d23)

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox-group label="Lorem ipsum dolor sit amet, consectetur adipiscing elit." onchange={handleChange} readonly>
      <c-checkbox data-id="a" checked>Quisque efficitur elit ac leo aliquam, sed vestibulum dolor feugiat.</c-checkbox>
      <c-checkbox data-id="b" checked>Fusce sit amet arcu auctor, volutpat sem nec, porta ante.</c-checkbox>
      <c-checkbox data-id="c">Morbi sit amet libero finibus, semper tortor et, aliquet urna.</c-checkbox>
      <c-checkbox data-id="d" checked>Sed eros leo, convallis sed convallis id, elementum at elit.</c-checkbox>
      <c-checkbox data-id="e">Praesent ullamcorper ligula id ex lacinia, eu luctus mauris laoreet.</c-checkbox>
  </c-checkbox-group>
</template>
```

### Example 5: Custom Missing Value Message

![custom_error_checkbox_group](https://github.com/user-attachments/assets/9c59c1e1-dae9-4263-9109-caebc6008eef)

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox-group label="Lorem ipsum dolor sit amet, consectetur adipiscing elit." onchange={handleChange}
      message-when-value-missing="At least one option must be selected."
      required>
      <c-checkbox data-id="a">Quisque efficitur elit ac leo aliquam, sed vestibulum dolor feugiat.</c-checkbox>
      <c-checkbox data-id="b">Fusce sit amet arcu auctor, volutpat sem nec, porta ante.</c-checkbox>
      <c-checkbox data-id="c">Morbi sit amet libero finibus, semper tortor et, aliquet urna.</c-checkbox>
      <c-checkbox data-id="d">Sed eros leo, convallis sed convallis id, elementum at elit.</c-checkbox>
      <c-checkbox data-id="e">Praesent ullamcorper ligula id ex lacinia, eu luctus mauris laoreet.</c-checkbox>
  </c-checkbox-group>
</template>
```

### Example 6: Custom Validity

![custom_validity_checkbox_group](https://github.com/user-attachments/assets/aff4ea2c-aef6-4e3b-ba87-3d8bfc58b68a)

```html
<!-- parentComponent.html -->
<template>
  <lightning-button label="Toogle Custom Validity" onclick={handleCustomValidityToogle}></lightning-button>
  <c-checkbox-group label="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
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
import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
  handleCustomValidityToogle(event) {
    const checkboxGroup = this.template.querySelector('c-checkbox-group');
    checkboxGroup.setCustomValidity(checkboxGroup.checkValidity() ? 'This field is required.' : '');
  }
}
```

### Example 7: Clear Selection

![clear_checkbox_group](https://github.com/user-attachments/assets/8277dd2c-11e9-4357-93db-e1fde6fc0032)

```html
<!-- parentComponent.html -->
<template>
  <lightning-button label="Clear" onclick={handleClear}></lightning-button>
  <c-checkbox-group label="Lorem ipsum dolor sit amet, consectetur adipiscing elit." multiple>
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
import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
  handleClear(event) {
    const checkboxGroup = this.template.querySelector('c-checkbox-group');
    checkboxGroup.clear();
  }
}
```

### Example 8: Without Label

<img width="541" height="183" alt="image" src="https://github.com/user-attachments/assets/3d8a7f74-d577-4159-83ae-1b5df3b1ecbb" /><br>

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox-group>
      <c-checkbox data-id="a">Quisque efficitur elit ac leo aliquam, sed vestibulum dolor feugiat.</c-checkbox>
      <c-checkbox data-id="b">Fusce sit amet arcu auctor, volutpat sem nec, porta ante.</c-checkbox>
      <c-checkbox data-id="c">Morbi sit amet libero finibus, semper tortor et, aliquet urna.</c-checkbox>
      <c-checkbox data-id="d">Sed eros leo, convallis sed convallis id, elementum at elit.</c-checkbox>
      <c-checkbox data-id="e">Praesent ullamcorper ligula id ex lacinia, eu luctus mauris laoreet.</c-checkbox>
  </c-checkbox-group>
</template>
```

### Example 8: Long Label

<img width="795" height="305" alt="image" src="https://github.com/user-attachments/assets/184e4d6c-d0f5-48d8-ac44-f8fef767cd61" /><br>

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox-group label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices leo eget nunc imperdiet, et convallis neque rhoncus. Aenean finibus, enim vel imperdiet porttitor, mauris ipsum varius quam, vitae vulputate orci nisl vel justo. Quisque est ipsum, vehicula a ultricies ut, finibus ut orci. Proin et commodo nisi, sit amet suscipit dui. Nam pellentesque ligula at massa cursus, vitae cursus est ultrices. Sed non dictum ex, et efficitur magna. Donec in commodo leo." multiple>
      <c-checkbox data-id="a">Quisque efficitur elit ac leo aliquam, sed vestibulum dolor feugiat.</c-checkbox>
      <c-checkbox data-id="b">Fusce sit amet arcu auctor, volutpat sem nec, porta ante.</c-checkbox>
      <c-checkbox data-id="c">Morbi sit amet libero finibus, semper tortor et, aliquet urna.</c-checkbox>
      <c-checkbox data-id="d">Sed eros leo, convallis sed convallis id, elementum at elit.</c-checkbox>
      <c-checkbox data-id="e">Praesent ullamcorper ligula id ex lacinia, eu luctus mauris laoreet.</c-checkbox>
  </c-checkbox-group>
</template>
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
