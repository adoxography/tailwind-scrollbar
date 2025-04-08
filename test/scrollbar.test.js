const { generatePluginCss } = require('./util');

test('it generates .scrollbar utilities', async () => {
  const css = await generatePluginCss('scrollbar.html');

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar {
      &::-webkit-scrollbar-track {
        --_scrollbar-track-color: inherit;
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-color));
      }
      &::-webkit-scrollbar-track:hover {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color)));
      }
      &::-webkit-scrollbar-track:active {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-active-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color))));
      }
      &::-webkit-scrollbar-thumb {
        --_scrollbar-thumb-color: inherit;
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color));
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color)));
      }
      &::-webkit-scrollbar-thumb:active {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-active-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color))));
      }
      &::-webkit-scrollbar-corner {
        --_scrollbar-corner-color: inherit;
        background-color: var(--_scrollbar-corner-color, var(--scrollbar-corner-color));
      }
      scrollbar-width: auto;
      scrollbar-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color, initial)) var(--_scrollbar-track-color, var(--scrollbar-track-color, initial));
      &::-webkit-scrollbar {
        display: block;
        width: var(--_scrollbar-width, var(--scrollbar-width, 16px));
        height: var(--_scrollbar-height, var(--scrollbar-height, 16px));
      }
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
  `);
});

test('it generates .scrollbar-thin utilities', async () => {
  const css = await generatePluginCss('scrollbar-thin.html');

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thin {
      &::-webkit-scrollbar-track {
        --_scrollbar-track-color: inherit;
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-color));
      }
      &::-webkit-scrollbar-track:hover {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color)));
      }
      &::-webkit-scrollbar-track:active {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-active-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color))));
      }
      &::-webkit-scrollbar-thumb {
        --_scrollbar-thumb-color: inherit;
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color));
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color)));
      }
      &::-webkit-scrollbar-thumb:active {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-active-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color))));
      }
      &::-webkit-scrollbar-corner {
        --_scrollbar-corner-color: inherit;
        background-color: var(--_scrollbar-corner-color, var(--scrollbar-corner-color));
      }
      scrollbar-width: thin;
      scrollbar-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color, initial)) var(--_scrollbar-track-color, var(--scrollbar-track-color, initial));
      &::-webkit-scrollbar {
        display: block;
        width: 8px;
        height: 8px;
      }
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
  `);
});

test('it generates .scrollbar-none utilities', async () => {
  const css = await generatePluginCss('scrollbar-none.html');

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-none {
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
  `);
});

describe('it limits scrollbar properties to Firefox when pseudoelements are preferred', () => {
  test('for scrollbar', async () => {
    const css = await generatePluginCss('scrollbar.html', {
      pluginOptions: '{ preferredStrategy: "pseudoelements" }'
    });

    expect(css).toMatchInlineSnapshot(`
    ".scrollbar {
      &::-webkit-scrollbar-track {
        --_scrollbar-track-color: inherit;
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-color));
      }
      &::-webkit-scrollbar-track:hover {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color)));
      }
      &::-webkit-scrollbar-track:active {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-active-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color))));
      }
      &::-webkit-scrollbar-thumb {
        --_scrollbar-thumb-color: inherit;
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color));
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color)));
      }
      &::-webkit-scrollbar-thumb:active {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-active-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color))));
      }
      &::-webkit-scrollbar-corner {
        --_scrollbar-corner-color: inherit;
        background-color: var(--_scrollbar-corner-color, var(--scrollbar-corner-color));
      }
      @supports (-moz-appearance:none) {
        scrollbar-width: auto;
        scrollbar-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color, initial)) var(--_scrollbar-track-color, var(--scrollbar-track-color, initial));
      }
      &::-webkit-scrollbar {
        display: block;
        width: var(--_scrollbar-width, var(--scrollbar-width, 16px));
        height: var(--_scrollbar-height, var(--scrollbar-height, 16px));
      }
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        @supports (-moz-appearance:none) {
          scrollbar-color: initial;
          scrollbar-width: initial;
        }
      }
    }"
  `);
  });

  test('for scrollbar-thin', async () => {
    const css = await generatePluginCss('scrollbar-thin.html', {
      pluginOptions: '{ preferredStrategy: "pseudoelements" }'
    });

    expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thin {
      &::-webkit-scrollbar-track {
        --_scrollbar-track-color: inherit;
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-color));
      }
      &::-webkit-scrollbar-track:hover {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color)));
      }
      &::-webkit-scrollbar-track:active {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-active-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color))));
      }
      &::-webkit-scrollbar-thumb {
        --_scrollbar-thumb-color: inherit;
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color));
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color)));
      }
      &::-webkit-scrollbar-thumb:active {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-active-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color))));
      }
      &::-webkit-scrollbar-corner {
        --_scrollbar-corner-color: inherit;
        background-color: var(--_scrollbar-corner-color, var(--scrollbar-corner-color));
      }
      @supports (-moz-appearance:none) {
        scrollbar-width: thin;
        scrollbar-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color, initial)) var(--_scrollbar-track-color, var(--scrollbar-track-color, initial));
      }
      &::-webkit-scrollbar {
        display: block;
        width: 8px;
        height: 8px;
      }
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        @supports (-moz-appearance:none) {
          scrollbar-color: initial;
          scrollbar-width: initial;
        }
      }
    }"
  `);
  });

  test('for scrollbar-none', async () => {
    const css = await generatePluginCss('scrollbar-none.html', {
      pluginOptions: '{ preferredStrategy: "pseudoelements" }'
    });

    expect(css).toMatchInlineSnapshot(`
    ".scrollbar-none {
      @supports (-moz-appearance:none) {
        scrollbar-width: none;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        @supports (-moz-appearance:none) {
          scrollbar-color: initial;
          scrollbar-width: initial;
        }
      }
    }"
  `);
  });

  test('as lowercase', async () => {
    const css = await generatePluginCss('scrollbar-none.html', {
      pluginOptions: '{ preferredstrategy: "pseudoelements" }'
    });

    expect(css).toMatchInlineSnapshot(`
    ".scrollbar-none {
      @supports (-moz-appearance:none) {
        scrollbar-width: none;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        @supports (-moz-appearance:none) {
          scrollbar-color: initial;
          scrollbar-width: initial;
        }
      }
    }"
  `);
  });
});

test('it generates scrollbar track utilities', async () => {
  const css = await generatePluginCss('scrollbar-track.html', {
    theme: `
      --color-black: #000000;
      --color-indigo: #5c6ac4;
      --color-indigo-dark: #202e78;
      --color-indigo-100: #808080;
    `
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-black {
      --_scrollbar-track-color: #000000;
    }
    .scrollbar-track-indigo {
      --_scrollbar-track-color: #5c6ac4;
    }
    .scrollbar-track-indigo-100 {
      --_scrollbar-track-color: #808080;
    }
    .scrollbar-track-indigo-dark {
      --_scrollbar-track-color: #202e78;
    }
    :root, :host {
      --color-black: #000000;
      --color-indigo: #5c6ac4;
      --color-indigo-dark: #202e78;
      --color-indigo-100: #808080;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
  `);
});

test('it generates scrollbar thumb utilities', async () => {
  const css = await generatePluginCss('scrollbar-thumb.html', {
    theme: `
      --color-black: #000000;
      --color-indigo: #5c6ac4;
      --color-indigo-dark: #202e78;
      --color-indigo-100: #808080;
    `
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-black {
      --_scrollbar-thumb-color: #000000;
    }
    .scrollbar-thumb-indigo {
      --_scrollbar-thumb-color: #5c6ac4;
    }
    .scrollbar-thumb-indigo-100 {
      --_scrollbar-thumb-color: #808080;
    }
    .scrollbar-thumb-indigo-dark {
      --_scrollbar-thumb-color: #202e78;
    }
    :root, :host {
      --color-black: #000000;
      --color-indigo: #5c6ac4;
      --color-indigo-dark: #202e78;
      --color-indigo-100: #808080;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
  `);
});

test('it generates scrollbar corner utilities', async () => {
  const css = await generatePluginCss('scrollbar-corner.html', {
    theme: `
      --color-black: #000000;
      --color-indigo: #5c6ac4;
      --color-indigo-dark: #202e78;
      --color-indigo-100: #808080;
    `
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-corner-black {
      --_scrollbar-corner-color: #000000;
    }
    .scrollbar-corner-indigo {
      --_scrollbar-corner-color: #5c6ac4;
    }
    .scrollbar-corner-indigo-100 {
      --_scrollbar-corner-color: #808080;
    }
    .scrollbar-corner-indigo-dark {
      --_scrollbar-corner-color: #202e78;
    }
    :root, :host {
      --color-black: #000000;
      --color-indigo: #5c6ac4;
      --color-indigo-dark: #202e78;
      --color-indigo-100: #808080;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
  `);
});

test('it uses arbitrary color values', async () => {
  const css = await generatePluginCss('arbitrary-colors.html');

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-\\[\\#ff0000\\] {
      --_scrollbar-track-color: #ff0000;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
  `);
});

test('it can use opacity modifiers', async () => {
  const css = await generatePluginCss('opacity.html', {
    theme: '--color-red-100: rgb(254 226 226);'
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-red-100\\/50 {
      --_scrollbar-track-color: color-mix(in oklab, rgb(254 226 226) 50%, transparent);
    }
    :root, :host {
      --color-red-100: rgb(254 226 226);
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
  `);
});

test.skip('it handles color functions', async () => {
  const css = await generatePluginCss({
    theme: {
      colors: {
        func: () => 'red'
      }
    },
    content: [{
      raw: `
        <div class="scrollbar-thumb-func" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-func {
        --scrollbar-thumb: red
    }"
`);
});

test('it generates thumb hover utilities', async () => {
  const css = await generatePluginCss('thumb-hover.html', {
    theme: `
      --color-white: #fff;
      --color-black: #000;
    `
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-white {
      --_scrollbar-thumb-color: #fff;
    }
    .scrollbar-hover\\:scrollbar-thumb-black {
      &::-webkit-scrollbar-thumb:hover {
        --_scrollbar-thumb-color: #000;
      }
    }
    :root, :host {
      --color-white: #fff;
      --color-black: #000;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});

test('it generates track hover utilities', async () => {
  const css = await generatePluginCss('track-hover.html', {
    theme: `
      --color-white: #fff;
      --color-black: #000;
    `
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-white {
      --_scrollbar-track-color: #fff;
    }
    .scrollbar-track-hover\\:scrollbar-track-black {
      &::-webkit-scrollbar-track:hover {
        --_scrollbar-track-color: #000;
      }
    }
    :root, :host {
      --color-white: #fff;
      --color-black: #000;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});

test('it generates thumb active utilities', async () => {
  const css = await generatePluginCss('thumb-active.html', {
    theme: `
      --color-white: #fff;
      --color-black: #000;
    `
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-white {
      --_scrollbar-thumb-color: #fff;
    }
    .scrollbar-active\\:scrollbar-thumb-black {
      &::-webkit-scrollbar-thumb:active {
        --_scrollbar-thumb-color: #000;
      }
    }
    :root, :host {
      --color-white: #fff;
      --color-black: #000;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});

test('it generates track active utilities', async () => {
  const css = await generatePluginCss('track-active.html', {
    theme: `
      --color-white: #fff;
      --color-black: #000;
    `
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-white {
      --_scrollbar-track-color: #fff;
    }
    .scrollbar-track-active\\:scrollbar-track-black {
      &::-webkit-scrollbar-track:active {
        --_scrollbar-track-color: #000;
      }
    }
    :root, :host {
      --color-white: #fff;
      --color-black: #000;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});

test('it generates dark utilities', async () => {
  const css = await generatePluginCss('dark-mode.html', {
    theme: '--color-black: #000000;'
  });

  expect(css).toMatchInlineSnapshot(`
    ".dark\\:scrollbar-thumb-black {
      @media (prefers-color-scheme: dark) {
        --_scrollbar-thumb-color: #000000;
      }
    }
    :root, :host {
      --color-black: #000000;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
  `);
});

test('it generates width utilties in nocompatible mode', async () => {
  const css = await generatePluginCss('width.html', {
    theme: `
      --width-1: 0.25rem;
      --width-full: 100%;
    `,
    pluginOptions: '{ nocompatible: true }'
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-w-1 {
      --_scrollbar-width: 0.25rem;
    }
    .scrollbar-w-\\[3px\\] {
      --_scrollbar-width: 3px;
    }
    .scrollbar-w-full {
      --_scrollbar-width: 100%;
    }
    :root, :host {
      --width-1: 0.25rem;
      --width-full: 100%;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-track-radius {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-radius {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-radius {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});

test('it generates height utilties in nocompatible mode', async () => {
  const css = await generatePluginCss('height.html', {
    theme: `
      --height-1: 0.25rem;
      --height-full: 100%;
    `,
    pluginOptions: '{ nocompatible: true }'
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-h-1 {
      --_scrollbar-height: 0.25rem;
    }
    .scrollbar-h-\\[3px\\] {
      --_scrollbar-height: 3px;
    }
    .scrollbar-h-full {
      --_scrollbar-height: 100%;
    }
    :root, :host {
      --height-1: 0.25rem;
      --height-full: 100%;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-track-radius {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-radius {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-radius {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});

test('it generates rounded states in nocompatible mode', async () => {
  const css = await generatePluginCss('rounded.html', {
    theme: `
      --rounded: 0.25rem;
      --rounded-md: 0.375rem;
    `,
    pluginOptions: '{ nocompatible: true }'
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar {
      &::-webkit-scrollbar-track {
        --_scrollbar-track-color: inherit;
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-color));
        --_scrollbar-track-radius: inherit;
        border-radius: var(--_scrollbar-track-radius, var(--scrollbar-track-radius));
      }
      &::-webkit-scrollbar-track:hover {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color)));
      }
      &::-webkit-scrollbar-track:active {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-active-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color))));
      }
      &::-webkit-scrollbar-thumb {
        --_scrollbar-thumb-color: inherit;
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color));
        --_scrollbar-thumb-radius: inherit;
        border-radius: var(--_scrollbar-thumb-radius, var(--scrollbar-thumb-radius));
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color)));
      }
      &::-webkit-scrollbar-thumb:active {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-active-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color))));
      }
      &::-webkit-scrollbar-corner {
        --_scrollbar-corner-color: inherit;
        background-color: var(--_scrollbar-corner-color, var(--scrollbar-corner-color));
        --_scrollbar-corner-radius: inherit;
        border-radius: var(--_scrollbar-corner-radius, var(--scrollbar-corner-radius));
      }
      scrollbar-width: auto;
      scrollbar-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color, initial)) var(--_scrollbar-track-color, var(--scrollbar-track-color, initial));
      &::-webkit-scrollbar {
        display: block;
        width: var(--_scrollbar-width, var(--scrollbar-width, 16px));
        height: var(--_scrollbar-height, var(--scrollbar-height, 16px));
      }
    }
    .scrollbar-corner-rounded {
      --_scrollbar-corner-radius: 0.25rem;
    }
    .scrollbar-thumb-rounded {
      --_scrollbar-thumb-radius: 0.25rem;
    }
    .scrollbar-thumb-rounded-md {
      --_scrollbar-thumb-radius: 0.375rem;
    }
    .scrollbar-track-rounded {
      --_scrollbar-track-radius: 0.25rem;
    }
    .scrollbar-track-rounded-\\[16px\\] {
      --_scrollbar-track-radius: 16px;
    }
    .scrollbar-track-rounded-md {
      --_scrollbar-track-radius: 0.375rem;
    }
    :root, :host {
      --rounded: 0.25rem;
      --rounded-md: 0.375rem;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-track-radius {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-radius {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-radius {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});

test('it does not generate width utilties in compatible mode', async () => {
  const css = await generatePluginCss('width.html', {
    theme: `
      --width-1: 0.25rem;
      --width-full: 100%;
    `
  });

  expect(css).toMatchInlineSnapshot(`
    ":root, :host {
      --width-1: 0.25rem;
      --width-full: 100%;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});

test('it does not generate height utilties in compatible mode', async () => {
  const css = await generatePluginCss('height.html', {
    theme: `
      --height-1: 0.25rem;
      --height-full: 100%;
    `
  });

  expect(css).toMatchInlineSnapshot(`
    ":root, :host {
      --height-1: 0.25rem;
      --height-full: 100%;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});

test('it does not generate rounded states when not in compatible mode', async () => {
  const css = await generatePluginCss('rounded.html', {
    theme: '--rounded: 0.25rem;'
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar {
      &::-webkit-scrollbar-track {
        --_scrollbar-track-color: inherit;
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-color));
      }
      &::-webkit-scrollbar-track:hover {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color)));
      }
      &::-webkit-scrollbar-track:active {
        background-color: var(--_scrollbar-track-color, var(--scrollbar-track-active-color, var(--scrollbar-track-hover-color, var(--scrollbar-track-color))));
      }
      &::-webkit-scrollbar-thumb {
        --_scrollbar-thumb-color: inherit;
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color));
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color)));
      }
      &::-webkit-scrollbar-thumb:active {
        background-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-active-color, var(--scrollbar-thumb-hover-color, var(--scrollbar-thumb-color))));
      }
      &::-webkit-scrollbar-corner {
        --_scrollbar-corner-color: inherit;
        background-color: var(--_scrollbar-corner-color, var(--scrollbar-corner-color));
      }
      scrollbar-width: auto;
      scrollbar-color: var(--_scrollbar-thumb-color, var(--scrollbar-thumb-color, initial)) var(--_scrollbar-track-color, var(--scrollbar-track-color, initial));
      &::-webkit-scrollbar {
        display: block;
        width: var(--_scrollbar-width, var(--scrollbar-width, 16px));
        height: var(--_scrollbar-height, var(--scrollbar-height, 16px));
      }
    }
    :root, :host {
      --rounded: 0.25rem;
    }
    @layer base {
      @property --_scrollbar-track-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-thumb-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-corner-color {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-width {
        syntax: "*";
        inherits: false;
      }
      @property --_scrollbar-height {
        syntax: "*";
        inherits: false;
      }
      * {
        scrollbar-color: initial;
        scrollbar-width: initial;
      }
    }"
`);
});
