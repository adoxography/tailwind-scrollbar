const _ = require('lodash');
const postcss = require('postcss');
const snapshotDiff = require('snapshot-diff');
const tailwindcss = require('tailwindcss');

const scrollbarPlugin = require('.');

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
  const tailwindConfig = _.merge({
    theme: {
      colors: { black: '#000000' }
    },
    corePlugins: [],
    plugins: [scrollbarPlugin]
  }, config);

  const result = await postcss(tailwindcss(tailwindConfig))
    .process('@tailwind utilities;', { from: undefined });

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

    .scrollbar-track-black {
      --scrollbar-track: #000000;
    }

    .scrollbar-thumb-black {
      --scrollbar-thumb: #000000;
    }

    .hover\\\\:scrollbar-thumb-black::-webkit-scrollbar-thumb:hover {
      --scrollbar-thumb: #000000;
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
      + }

    "
`);
});
