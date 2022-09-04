const _ = require('lodash');
const postcss = require('postcss');

/* eslint-disable import/no-dynamic-require */
const tailwindcss = require(
  process.env.TAILWINDCSS_VERSION
    ? `tailwindcss-${process.env.TAILWINDCSS_VERSION}`
    : 'tailwindcss'
);
/* eslint-enable import/no-dynamic-require */

const scrollbarPlugin = require('..');

/**
 * Generates the CSS for the plugin
 *
 * @see https://www.oliverdavies.uk/blog/testing-tailwind-css-plugins-jest
 * @param {object} config Tailwind config options to pass to tailwind
 * @param {object} options Options to pass to the scrollbar plugin
 * @returns {string} The CSS generated from the plugin using the provided config
 */
const generatePluginCss = async (config = {}, options = {}) => {
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
    plugins: [scrollbarPlugin(options)]
  }, config);

  const result = await postcss(tailwindcss(tailwindConfig))
    .process('@tailwind utilities;', { from: undefined });

  console.warn = warn; // eslint-disable-line no-console

  return result.css;
};

module.exports = {
  generatePluginCss
};
