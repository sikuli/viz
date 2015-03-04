# Component structure

The dir structure uses a structure in which the folder structures relate to
the structure of the HTML file. Each folder represents an HTML class in the
DOM, making it easy to grok, and separate concerns wrt application design.

The dir structure looks like so. All files related to a component belong in one
folder:

```
app/components/
├── data-viewer
│   └── data-viewer.jade
├── footer
│   ├── footer.jade
│   └── footer.scss
├── header
│   ├── Header.jsx
│   ├── header.jade
│   ├── header.js
│   └── header.scss
├── template-viewer
│   └── template-viewer.jade
└── visualizer
    └── visualizer.jade
```

## Notes

- The component folder should follow this basic layout:

```
  ├── component
  │   ├── Component.jsx (optional)
  │   ├── component.jade
  │   ├── component.js (optional)
  │   └── component.scss (optional)
```

- In order to make your component play well with the compiler:
    1. Edit [../app/boilerplate/scripts.jade]( ../app/boilerplate/scripts.jade )
    and add a line to include your `*.js` files.
    1. Edit [../app/index.scss](../app/index.scss) and add a line to include your
    `*.scss` files.
