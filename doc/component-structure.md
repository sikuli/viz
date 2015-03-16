# Component structure

The dir structure uses a structure in which the folder structures relate to
the structure of the HTML file. Each folder represents an HTML class in the
DOM, making it easy to grok, and separate concerns wrt application design.

The dir structure looks like so. All files related to a component belong in one
folder

## Layout

The component folder should follow this basic layout. This allows for modular
code, and it minimizes the mental burden of building a component.

```
  ├── component
  │   ├── Component.jsx (optional)
  │   ├── component.jade
  │   ├── component.js (optional)
  │   └── component.sass (optional)
```

There can and often should be sub-components within your components.
Sub-components should be stored inside of the parent component dir, and used
_only_ by parent component. In a sense, these should be invisible to the
components earlier in the hierarchy, as they are not concerned with the
implementation details of sub-components.

```
  ├── component
  │   ├── Component.jsx
  │   ├── component.jade
  │   └── sub-component
  |       └── sub-component.jade
  |       └── sub-component.jsx
```

## Using your component

1. Make sure you export your component to make it importable.
  ```js
  modules.exports = MyComponent;
  ```

1. Make sure you import your template wherever it is needed. We use
browserify to use es6 import behavior. This means that you can import your
code like so:
  ```js
  import MyComponent from "./components/my-component/MyComponent";
  ```

1. Edit [../app/index.sass](../app/index.sass) and add a line to include your
`*.sass` files.
