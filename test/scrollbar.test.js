const { generatePluginCss, diffOnly } = require('./util');

test('it generates scrollbar utilities', async () => {
  const css = await generatePluginCss();

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar {
      --scrollbar-track: initial;
      --scrollbar-thumb: initial;
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

    .scrollbar {
      scrollbar-width: auto;
    }

    .scrollbar::-webkit-scrollbar {
      width: 16px;
      height: 16px;
    }

    .scrollbar-thin {
      --scrollbar-track: initial;
      --scrollbar-thumb: initial;
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

    .scrollbar-thin {
      scrollbar-width: thin;
    }

    .scrollbar-thin::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    .scrollbar-none {
      scrollbar-width: none;
    }

    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }

    .scrollbar-track-black {
      --scrollbar-track: #000000;
    }

    .scrollbar-thumb-black {
      --scrollbar-thumb: #000000;
    }

    .hover\\\\:scrollbar-thumb-black::-webkit-scrollbar-thumb:hover {
      --scrollbar-thumb: #000000;
    }

    .scrollbar-track-indigo {
      --scrollbar-track: #5c6ac4;
    }

    .scrollbar-thumb-indigo {
      --scrollbar-thumb: #5c6ac4;
    }

    .hover\\\\:scrollbar-thumb-indigo::-webkit-scrollbar-thumb:hover {
      --scrollbar-thumb: #5c6ac4;
    }

    .scrollbar-track-indigo-dark {
      --scrollbar-track: #202e78;
    }

    .scrollbar-thumb-indigo-dark {
      --scrollbar-thumb: #202e78;
    }

    .hover\\\\:scrollbar-thumb-indigo-dark::-webkit-scrollbar-thumb:hover {
      --scrollbar-thumb: #202e78;
    }"
`);
});

test('it generates dark utilities', async () => {
  const css = await diffOnly({
    darkMode: 'media',
    variants: {
      scrollbar: ['dark']
    }
  });

  expect(css).toMatchInlineSnapshot(`
    "

      +
      + @media (prefers-color-scheme: dark) {
      +   .dark\\\\:scrollbar {
      +     --scrollbar-track: initial;
      +     --scrollbar-thumb: initial;
      +     scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
      +     overflow: overlay;
      +   }
      +
      +   .scrollbar.dark\\\\:overflow-x-hidden {
      +     overflow-x: hidden;
      +   }
      +
      +   .scrollbar.dark\\\\:overflow-y-hidden {
      +     overflow-y: hidden;
      +   }
      +
      +   .dark\\\\:scrollbar::-webkit-scrollbar-track {
      +     background-color: var(--scrollbar-track);
      +   }
      +
      +   .dark\\\\:scrollbar::-webkit-scrollbar-thumb {
      +     background-color: var(--scrollbar-thumb);
      +   }
      +
      +   .dark\\\\:scrollbar {
      +     scrollbar-width: auto;
      +   }
      +
      +   .dark\\\\:scrollbar::-webkit-scrollbar {
      +     width: 16px;
      +     height: 16px;
      +   }
      +
      +   .dark\\\\:scrollbar-thin {
      +     --scrollbar-track: initial;
      +     --scrollbar-thumb: initial;
      +     scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
      +     overflow: overlay;
      +   }
      +
      +   .scrollbar-thin.dark\\\\:overflow-x-hidden {
      +     overflow-x: hidden;
      +   }
      +
      +   .scrollbar-thin.dark\\\\:overflow-y-hidden {
      +     overflow-y: hidden;
      +   }
      +
      +   .dark\\\\:scrollbar-thin::-webkit-scrollbar-track {
      +     background-color: var(--scrollbar-track);
      +   }
      +
      +   .dark\\\\:scrollbar-thin::-webkit-scrollbar-thumb {
      +     background-color: var(--scrollbar-thumb);
      +   }
      +
      +   .dark\\\\:scrollbar-thin {
      +     scrollbar-width: thin;
      +   }
      +
      +   .dark\\\\:scrollbar-thin::-webkit-scrollbar {
      +     width: 8px;
      +     height: 8px;
      +   }
      +
      +   .dark\\\\:scrollbar-none {
      +     scrollbar-width: none;
      +   }
      +
      +   .dark\\\\:scrollbar-none::-webkit-scrollbar {
      +     display: none;
      +   }
      +
      +   .dark\\\\:scrollbar-track-black {
      +     --scrollbar-track: #000000;
      +   }
      +
      +   .dark\\\\:scrollbar-thumb-black {
      +     --scrollbar-thumb: #000000;
      +   }
      +
      +   .dark\\\\:hover\\\\:scrollbar-thumb-black::-webkit-scrollbar-thumb:hover {
      +     --scrollbar-thumb: #000000;
      +   }
      +
      +   .dark\\\\:scrollbar-track-indigo {
      +     --scrollbar-track: #5c6ac4;
      +   }
      +
      +   .dark\\\\:scrollbar-thumb-indigo {
      +     --scrollbar-thumb: #5c6ac4;
      +   }
      +
      +   .dark\\\\:hover\\\\:scrollbar-thumb-indigo::-webkit-scrollbar-thumb:hover {
      +     --scrollbar-thumb: #5c6ac4;
      +   }
      +
      +   .dark\\\\:scrollbar-track-indigo-dark {
      +     --scrollbar-track: #202e78;
      +   }
      +
      +   .dark\\\\:scrollbar-thumb-indigo-dark {
      +     --scrollbar-thumb: #202e78;
      +   }
      +
      +   .dark\\\\:hover\\\\:scrollbar-thumb-indigo-dark::-webkit-scrollbar-thumb:hover {
      +     --scrollbar-thumb: #202e78;
      +   }
      + }

    "
`);
});

test('it generates rounded states', async () => {
  const css = await diffOnly({
    theme: {
      borderRadius: {
        DEFAULT: '0.25rem',
        md: '0.375rem'
      }
    },
    variants: {
      scrollbar: ['rounded']
    }
  });

  expect(css).toMatchInlineSnapshot(`
    "

      + .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
      +   border-radius: 0.25rem;
      + }
      +
      + .scrollbar-track-rounded::-webkit-scrollbar-track {
      +   border-radius: 0.25rem;
      + }
      +
      + .scrollbar-thumb-rounded-md::-webkit-scrollbar-thumb {
      +   border-radius: 0.375rem;
      + }
      +
      + .scrollbar-track-rounded-md::-webkit-scrollbar-track {
      +   border-radius: 0.375rem;
      + }
      +

    "
`);
});
