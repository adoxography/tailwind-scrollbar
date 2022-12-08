const { generatePluginCss } = require('./util');

test('it generaste .scrollbar-horizontal spacing utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="scrollbar-horizontal-1" />
        <div class="scrollbar-horizontal-2" />
        <div class="scrollbar-horizontal-3" />
      `
    }]
  });
  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-horizontal-1 {
        height: 0.25rem
    }
    .scrollbar-horizontal-2 {
        height: 0.5rem
    }
    .scrollbar-horizontal-3 {
        height: 0.75rem
    }"
  `);
});

test('it generates .scrollbar utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="scrollbar" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar {
        --scrollbar-track: initial;
        --scrollbar-thumb: initial;
        --scrollbar-corner: initial;
        --scrollbar-track-hover: var(--scrollbar-track);
        --scrollbar-thumb-hover: var(--scrollbar-thumb);
        --scrollbar-corner-hover: var(--scrollbar-corner);
        --scrollbar-track-active: var(--scrollbar-track-hover);
        --scrollbar-thumb-active: var(--scrollbar-thumb-hover);
        --scrollbar-corner-active: var(--scrollbar-corner-hover);
        scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
        overflow: overlay;
    }
    .scrollbar.overflow-x-hidden {
        overflow-x: hidden;
    }
    .scrollbar.overflow-y-hidden {
        overflow-y: hidden;
    }
    .scrollbar::-webkit-scrollbar-track {
        background-color: var(--scrollbar-track);
    }
    .scrollbar::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb);
    }
    .scrollbar::-webkit-scrollbar-corner {
        background-color: var(--scrollbar-corner);
    }
    .scrollbar::-webkit-scrollbar-track:hover {
        background-color: var(--scrollbar-track-hover);
    }
    .scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: var(--scrollbar-thumb-hover);
    }
    .scrollbar::-webkit-scrollbar-corner:hover {
        background-color: var(--scrollbar-corner-hover);
    }
    .scrollbar::-webkit-scrollbar-track:active {
        background-color: var(--scrollbar-track-active);
    }
    .scrollbar::-webkit-scrollbar-thumb:active {
        background-color: var(--scrollbar-thumb-active);
    }
    .scrollbar::-webkit-scrollbar-corner:active {
        background-color: var(--scrollbar-corner-active);
    }
    .scrollbar {
        scrollbar-width: auto;
    }
    .scrollbar::-webkit-scrollbar {
        width: 16px;
        height: 16px;
    }"
  `);
});

test('it generates .scrollbar-thin utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="scrollbar-thin" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thin {
        --scrollbar-track: initial;
        --scrollbar-thumb: initial;
        --scrollbar-corner: initial;
        --scrollbar-track-hover: var(--scrollbar-track);
        --scrollbar-thumb-hover: var(--scrollbar-thumb);
        --scrollbar-corner-hover: var(--scrollbar-corner);
        --scrollbar-track-active: var(--scrollbar-track-hover);
        --scrollbar-thumb-active: var(--scrollbar-thumb-hover);
        --scrollbar-corner-active: var(--scrollbar-corner-hover);
        scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
        overflow: overlay;
    }
    .scrollbar-thin.overflow-x-hidden {
        overflow-x: hidden;
    }
    .scrollbar-thin.overflow-y-hidden {
        overflow-y: hidden;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
        background-color: var(--scrollbar-track);
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb);
    }
    .scrollbar-thin::-webkit-scrollbar-corner {
        background-color: var(--scrollbar-corner);
    }
    .scrollbar-thin::-webkit-scrollbar-track:hover {
        background-color: var(--scrollbar-track-hover);
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background-color: var(--scrollbar-thumb-hover);
    }
    .scrollbar-thin::-webkit-scrollbar-corner:hover {
        background-color: var(--scrollbar-corner-hover);
    }
    .scrollbar-thin::-webkit-scrollbar-track:active {
        background-color: var(--scrollbar-track-active);
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:active {
        background-color: var(--scrollbar-thumb-active);
    }
    .scrollbar-thin::-webkit-scrollbar-corner:active {
        background-color: var(--scrollbar-corner-active);
    }
    .scrollbar-thin {
        scrollbar-width: thin;
    }
    .scrollbar-thin::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }"
  `);
});

test('it generates .scrollbar-none utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="scrollbar-none" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-none {
        scrollbar-width: none;
    }
    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }"
  `);
});

test('it generates scrollbar track utilities', async () => {
  const css = await generatePluginCss({
    theme: {
      colors: {
        black: '#000000',
        indigo: {
          DEFAULT: '#5c6ac4',
          dark: '#202e78'
        }
      }
    },
    content: [{
      raw: `
        <div class="scrollbar-track-black" />
        <div class="scrollbar-track-indigo" />
        <div class="scrollbar-track-indigo-dark" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-black {
        --scrollbar-track: #000000 !important
    }
    .scrollbar-track-indigo {
        --scrollbar-track: #5c6ac4 !important
    }
    .scrollbar-track-indigo-dark {
        --scrollbar-track: #202e78 !important
    }"
  `);
});

test('it generates scrollbar thumb utilities', async () => {
  const css = await generatePluginCss({
    theme: {
      colors: {
        black: '#000000',
        indigo: {
          DEFAULT: '#5c6ac4',
          dark: '#202e78',
          100: '#808080'
        }
      }
    },
    content: [{
      raw: `
        <div class="scrollbar-thumb-black" />
        <div class="scrollbar-thumb-indigo" />
        <div class="scrollbar-thumb-indigo-dark" />
        <div class="scrollbar-thumb-indigo-100" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-black {
        --scrollbar-thumb: #000000 !important
    }
    .scrollbar-thumb-indigo {
        --scrollbar-thumb: #5c6ac4 !important
    }
    .scrollbar-thumb-indigo-dark {
        --scrollbar-thumb: #202e78 !important
    }
    .scrollbar-thumb-indigo-100 {
        --scrollbar-thumb: #808080 !important
    }"
  `);
});

test('it generates scrollbar corner utilities', async () => {
  const css = await generatePluginCss({
    theme: {
      colors: {
        black: '#000000',
        indigo: {
          DEFAULT: '#5c6ac4',
          dark: '#202e78',
          100: '#808080'
        }
      }
    },
    content: [{
      raw: `
        <div class="scrollbar-corner-black" />
        <div class="scrollbar-corner-indigo" />
        <div class="scrollbar-corner-indigo-dark" />
        <div class="scrollbar-corner-indigo-100" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-corner-black {
        --scrollbar-corner: #000000 !important
    }
    .scrollbar-corner-indigo {
        --scrollbar-corner: #5c6ac4 !important
    }
    .scrollbar-corner-indigo-dark {
        --scrollbar-corner: #202e78 !important
    }
    .scrollbar-corner-indigo-100 {
        --scrollbar-corner: #808080 !important
    }"
  `);
});

test('it uses arbitrary color values', async () => {
  const css = await generatePluginCss({
    theme: {},
    content: [{
      raw: `
        <div class="scrollbar-track-[#ff0000]" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-\\[\\#ff0000\\] {
        --scrollbar-track: #ff0000 !important
    }"
  `);
});

test('it can use opacity modifiers', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="scrollbar-track-red-100/50" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-red-100\\/50 {
        --scrollbar-track: rgb(254 226 226 / 0.5) !important
    }"
  `);
});

test('it can use opacity modifiers with custom properties', async () => {
  const css = await generatePluginCss({
    theme: {
      extend: {
        colors: {
          surface: 'hsl(var(--color-surface) / <alpha-value>)'
        }
      }
    },
    content: [{
      raw: `
        <div class="scrollbar-track-surface" />
        <div class="scrollbar-track-surface/100" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-surface {
        --scrollbar-track: hsl(var(--color-surface) / 1) !important
    }
    .scrollbar-track-surface\\/100 {
        --scrollbar-track: hsl(var(--color-surface) / 1) !important
    }"
  `);
});

test('it handles color functions', async () => {
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
        --scrollbar-thumb: red !important
    }"
`);
});

test('it generates thumb hover utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="scrollbar-thumb-white hover:scrollbar-thumb-black" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-white {
        --scrollbar-thumb: #fff !important
    }
    .hover\\:scrollbar-thumb-black {
        --scrollbar-thumb-hover: #000 !important
    }"
`);
});

test('it generates track hover utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="scrollbar-track-white hover:scrollbar-track-black" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-white {
        --scrollbar-track: #fff !important
    }
    .hover\\:scrollbar-track-black {
        --scrollbar-track-hover: #000 !important
    }"
`);
});

test("it doesn't get in the way of the hoverOnlyWhenSupported flag", async () => {
  const css = await generatePluginCss({
    theme: {
      colors: {
        black: '#000000'
      }
    },
    future: {
      hoverOnlyWhenSupported: true
    },
    content: [{
      raw: `
        <div class="hover:scrollbar-track-black" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    "@media (hover: hover) and (pointer: fine) {
        .hover\\:scrollbar-track-black {
            --scrollbar-track-hover: #000000 !important
        }
    }"
`);
});

test('it generates thumb active utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
          <div class="scrollbar-thumb-white active:scrollbar-thumb-black" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-white {
        --scrollbar-thumb: #fff !important
    }
    .active\\:scrollbar-thumb-black {
        --scrollbar-thumb-active: #000 !important
    }"
`);
});

test('it generates track active utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="scrollbar-track-white active:scrollbar-track-black" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-white {
        --scrollbar-track: #fff !important
    }
    .active\\:scrollbar-track-black {
        --scrollbar-track-active: #000 !important
    }"
`);
});

test('it does not insert scrollbar elements in other hover utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="hover:px-1" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".hover\\:px-1:hover {
        padding-left: 0.25rem;
        padding-right: 0.25rem
    }"
`);
});

test('it does not insert scrollbar elements in other active utilities', async () => {
  const css = await generatePluginCss({
    content: [{
      raw: `
        <div class="active:px-1" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".active\\:px-1:active {
        padding-left: 0.25rem;
        padding-right: 0.25rem
    }"
`);
});

test('it generates dark utilities', async () => {
  const css = await generatePluginCss({
    theme: {
      colors: {
        black: '#000000'
      }
    },
    darkMode: 'media',
    content: [{
      raw: `
        <div class="dark:scrollbar-thumb-black" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    "@media (prefers-color-scheme: dark) {
        .dark\\:scrollbar-thumb-black {
            --scrollbar-thumb: #000000 !important
        }
    }"
  `);
});

test('it generates rounded states in nocompatible mode', async () => {
  const css = await generatePluginCss({
    theme: {
      borderRadius: {
        DEFAULT: '0.25rem',
        md: '0.375rem'
      }
    },
    content: [{
      raw: `
        <div class="scrollbar-thumb-rounded" />
        <div class="scrollbar-track-rounded" />
        <div class="scrollbar-thumb-rounded-md" />
        <div class="scrollbar-track-rounded-md" />
        <div class="scrollbar-track-rounded-[16px]" />
      `
    }]
  }, {
    nocompatible: true
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-track-rounded::-webkit-scrollbar-track {
        border-radius: 0.25rem
    }
    .scrollbar-track-rounded-md::-webkit-scrollbar-track {
        border-radius: 0.375rem
    }
    .scrollbar-track-rounded-\\[16px\\]::-webkit-scrollbar-track {
        border-radius: 16px
    }
    .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
        border-radius: 0.25rem
    }
    .scrollbar-thumb-rounded-md::-webkit-scrollbar-thumb {
        border-radius: 0.375rem
    }"
`);
});

test('it generates rounded states when "rounded" is specified as a variant', async () => {
  // Deprecated
  const css = await generatePluginCss({
    theme: {
      borderRadius: {
        DEFAULT: '0.25rem',
        md: '0.375rem'
      }
    },
    variants: {
      scrollbar: ['rounded']
    },
    content: [{
      raw: `
        <div class="scrollbar-thumb-rounded" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
        border-radius: 0.25rem
    }"
`);
});

test('it does not generate rounded states when not in nocompatible mode', async () => {
  const css = await generatePluginCss({
    theme: {
      borderRadius: {
        DEFAULT: '0.25rem'
      }
    },
    content: [{
      raw: `
        <div class="scrollbar-thumb-rounded" />
        <div class="scrollbar-track-rounded" />
        <div class="scrollbar-thumb-rounded-md" />
        <div class="scrollbar-track-rounded-md" />
      `
    }]
  }, {
    nocompatible: false
  });

  expect(css).toBe('');
});
