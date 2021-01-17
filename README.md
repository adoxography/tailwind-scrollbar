# Scrollbar Plugin for Tailwind CSS
![Tests](https://github.com/adoxography/tailwind-scrollbar/workflows/Tests/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/af892fe4afc048c4860462c5fc736675)](https://www.codacy.com/gh/adoxography/tailwind-scrollbar/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=adoxography/tailwind-scrollbar&amp;utm_campaign=Badge_Grade)

Adds styling utilities for scrollbars in Firefox and webkit-based browsers.

## Installation

```bash
yarn add -D tailwind-scrollbar
```
or
```bash
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

For every element that you want to style, add either the `.scrollbar` or `.scrollbar-thin` class. You may then add any `scrollbar-track-{color}`, `scrollbar-thumb-{color}` or `hover:scrollbar-thumb-{color}` classes you like. (Note that `hover:scrollbar-thumb-{color}` classes only have effects in webkit-based browsers.)

Here's a minimal example (keeping in mind that the `h-32` and `h-64` classes are just there to force the scrollbar to appear):

```html
<div class="h-32 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
    <div class="h-64"></div>
</div>
```

A live version of this demo [can be found here](https://tailwind-scrollbar-example.adoxography.repl.co/).

## Configuration

If you'd like to add variants for the scrollbar utilities (e.g. [dark mode](https://tailwindcss.com/docs/dark-mode)), add them to the `variants` object in your Tailwind config:

```js
variants: {
    // ...
    scrollbar: ['dark']
}
```

This plugin also capable of adding utilties for creating rounded scrollbars (by referencing your configured [border radius](https://tailwindcss.com/docs/border-radius#customizing) settings). However, as they are only supported in Webkit-based browsers, their usage is inadvisable in cross-browser applications. To enable rounded scrollbar utilities, add `'rounded'` to the list of scrollbar variants in your config file. This will add utilities such as `scrollbar-thumb-rounded` or `scrollbar-thumb-rounded-md`.

## License

This project is licensed under the [MIT License](/LICENSE).
