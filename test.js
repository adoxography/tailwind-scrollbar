const _ = require('lodash');
const postcss = require('postcss');
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
