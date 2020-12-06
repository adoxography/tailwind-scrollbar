# Scrollbar Plugin for Tailwind CSS

Adds styling utilities for scrollbars in Firefox and webkit-based browsers.

## Installation

```
yarn add -D tailwind-scrollbar
```
or
```
npm install --save-dev tailwind-scrollbar
```

## Usage

Add it to the plugins array of your Tailwind config.

```
plugins: [
    // ...
    require('tailwind-scrollbar'),
],
```

For every element that you want to style, add either the `.scrollbar` or `.scrollbar-thin` class. You may then add any `scrollbar-track-{color}`, `scrollbar-thumb-{color}` or `hover:scrollbar-thumb-{color}` classes you like. (Note that `hover:scrollbar-thumb-{color}` classes only have effects in webkit-based browsers.

## License

This project is licensed under the [MIT License](/LICENSE).
