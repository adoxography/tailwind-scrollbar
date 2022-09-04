const { generatePluginCss } = require('./util');

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
    .scrollbar-thumb-indigo-100 {
        --scrollbar-thumb: #808080 !important
    }
    .scrollbar-thumb-indigo {
        --scrollbar-thumb: #5c6ac4 !important
    }
    .scrollbar-thumb-indigo-dark {
        --scrollbar-thumb: #202e78 !important
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
    .scrollbar-corner-indigo-100 {
        --scrollbar-corner: #808080 !important
    }
    .scrollbar-corner-indigo {
        --scrollbar-corner: #5c6ac4 !important
    }
    .scrollbar-corner-indigo-dark {
        --scrollbar-corner: #202e78 !important
    }"
  `);
});

test('it ignores colors that are\'t strings', async () => {
  const css = await generatePluginCss({
    theme: {
      colors: {
        string: '#ffffff',
        number: 100,
        object: {
          value: '#888888'
        },
        noop: () => {}
      }
    },
    content: [{
      raw: `
        <div class="scrollbar-thumb-string" />
        <div class="scrollbar-thumb-number" />
        <div class="scrollbar-thumb-object-value" />
        <div class="scrollbar-thumb-noop" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-string {
        --scrollbar-thumb: #ffffff !important
    }
    .scrollbar-thumb-object-value {
        --scrollbar-thumb: #888888 !important
    }"
`);
});

test('it generates thumb hover utilities', async () => {
  const css = await generatePluginCss({
    theme: {
      colors: {
        black: '#000000'
      }
    },
    content: [{
      raw: `
        <div class="hover:scrollbar-thumb-black" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".hover\\:scrollbar-thumb-black:hover::-webkit-scrollbar-thumb {
        --scrollbar-thumb: #000000 !important
    }"
`);
});

test('it generates track hover utilities', async () => {
  const css = await generatePluginCss({
    theme: {
      colors: {
        black: '#000000'
      }
    },
    content: [{
      raw: `
        <div class="hover:scrollbar-track-black" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".hover\\:scrollbar-track-black:hover::-webkit-scrollbar-track {
        --scrollbar-track: #000000 !important
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
      `
    }]
  }, {
    nocompatible: true
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
        border-radius: 0.25rem
    }
    .scrollbar-track-rounded::-webkit-scrollbar-track {
        border-radius: 0.25rem
    }
    .scrollbar-thumb-rounded-md::-webkit-scrollbar-thumb {
        border-radius: 0.375rem
    }
    .scrollbar-track-rounded-md::-webkit-scrollbar-track {
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
        <div class="scrollbar-track-rounded" />
        <div class="scrollbar-thumb-rounded-md" />
        <div class="scrollbar-track-rounded-md" />
      `
    }]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
        border-radius: 0.25rem
    }
    .scrollbar-track-rounded::-webkit-scrollbar-track {
        border-radius: 0.25rem
    }
    .scrollbar-thumb-rounded-md::-webkit-scrollbar-thumb {
        border-radius: 0.375rem
    }
    .scrollbar-track-rounded-md::-webkit-scrollbar-track {
        border-radius: 0.375rem
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
