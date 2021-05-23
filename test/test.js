const _ = require('lodash');
const postcss = require('postcss');
const snapshotDiff = require('snapshot-diff');
const tailwindcss = require('tailwindcss');
const path = require('path');

const scrollbarPlugin = require('..');

/**
 * Generates the CSS for the plugin
 *
 * From https://www.oliverdavies.uk/blog/testing-tailwind-css-plugins-jest
 *
 * @param config Tailwind config options to pass to tailwind
 *
 * @return The CSS generated from the plugin using the provided config
 */
const generatePluginCss = async (config = {}) => {
  const { warn } = console;
  console.warn = () => {}; // eslint-disable-line no-console

  const tailwindConfig = _.merge({
    theme: {
      colors: {
        black: '#000000',
        indigo: {
          DEFAULT: '#5c6ac4',
          dark: '#202e78'
        }
      }
    },
    corePlugins: [],
    plugins: [scrollbarPlugin]
  }, config);

  const result = await postcss(tailwindcss(tailwindConfig))
    .process('@tailwind utilities;', { from: undefined });

  console.warn = warn; // eslint-disable-line no-console

  return result.css;
};

/**
 * Generates a diff between a default tailwind run and one customized with a
 * config
 *
 * From https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/index.test.js
 *
 * @param config The config to diff against
 *
 * @return The diff between the configured tailwind run and the default
 */
async function diffOnly(config = {}) {
  const [before, after] = await Promise.all([
    generatePluginCss(),
    generatePluginCss(config)
  ]);

  return `\n\n${snapshotDiff(before, after, {
    aAnnotation: '__REMOVE_ME__',
    bAnnotation: '__REMOVE_ME__',
    contextLines: 0
  })
    .replace(/\n\n@@([^@@]*)@@/g, '') // Top level @@ signs
    .replace(/@@([^@@]*)@@/g, '\n---\n') // In between @@ signs
    .replace(/[-+] __REMOVE_ME__\n/g, '')
    .replace(/Snapshot Diff:\n/g, '')
    .replace(/"/g, '\'')
    .split('\n')
    .map(line => `  ${line}`.trimEnd())
    .join('\n')}\n\n`;
}

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

test('it works in jit mode', async () => {
  const css = await generatePluginCss({
    mode: 'jit',
    purge: [path.resolve(__dirname, './jit-mode.html')],
    corePlugins: ['textColor']
  });

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
    .scrollbar-thumb-indigo {
        --scrollbar-thumb: #5c6ac4;
    }
    .hover\\\\:text-black:hover {
        --tw-text-opacity: 1;
        color: rgba(0, 0, 0, var(--tw-text-opacity));
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
