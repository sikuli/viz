# Adding a React Component

The build system will automatically compile all React `*.jsx` files down to
Javascript. All React classes will be globally visible in Javascript. Here are
the steps to writing a new React component.

1. Create a template file in [app/scripts/templates](../app/scripts/templates)
  - It should follow the naming convention `MyComponent.jsx`

1. Once you are finished creating your component, include the script inside of
  [index.html](../index.html), using `*.js` instead of `*.jsx`, since the file
  will have been compiled down to Javascript.

  ```html
  <script src="scripts/templates/MyComponent.js"></script>
  ```
