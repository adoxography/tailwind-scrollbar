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

Add it to the plugins array of your Tailwind config.

```js
plugins: [
    // ...
    require('tailwind-scrollbar'),
],
```

## Usage

**NB:** This plugin *styles* scrollbars; it does not force them to appear. Use typical CSS techniques to force content to overflow and trigger a scrollbar.

For every element that you want to style, add either the `.scrollbar` or `.scrollbar-thin` class. You may then add any `scrollbar-track-{color}`, `scrollbar-thumb-{color}` or `hover:scrollbar-thumb-{color}` classes you like. (Note that `hover:scrollbar-thumb-{color}` classes only have effects in webkit-based browsers.

Here's a minimal example (keeping in mind that the `h-32` and `h-64` classes are just there to force the scrollbar to appear):

```html
<div class="h-32 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
    <div class="h-64"></div>
</div>
```

A live version of this demo [can be found here](https://repl.it/@adoxography/tailwind-scrollbar-example#public/index.html).

## Configuration

If you'd like to add variants for the scrollbar utilities (e.g. [dark mode](https://tailwindcss.com/docs/dark-mode)), add them to the `variants` object in your Tailwind config:

```js
variants: {
    // ...
    scrollbar: ['dark']
}
```

## License

This project is licensed under the [MIT License](/LICENSE).
