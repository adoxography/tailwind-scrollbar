const _ = require('lodash');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const scrollbarPlugin = require('..');

/**
 * Runs a config through tailwind
 *
 * @see https://www.oliverdavies.uk/blog/testing-tailwind-css-plugins-jest
 * @param {object} config Tailwind config options to pass to tailwind
 * @returns {Promise<string>} The CSS generated using the provided config
 */
const generateTailwindCss = async (config = {}) => {
  const { currentTestName } = expect.getState();

  const result = await postcss(tailwindcss(config))
    .process('@tailwind utilities;', {
      from: `${path.resolve(__filename)}?test=${currentTestName}`
    });

  return result.css;
};
/**
 * Generates the CSS for the plugin
 *
 * @see https://www.oliverdavies.uk/blog/testing-tailwind-css-plugins-jest
 * @param {object} config Tailwind config options to pass to tailwind
 * @param {object} options Options to pass to the scrollbar plugin
 * @returns {Promise<string>} The CSS generated from the plugin using the provided config
 */
const generatePluginCss = async (config = {}, options = {}) => {
  const tailwindConfig = _.merge({
    plugins: [scrollbarPlugin(options)]
  }, config);

  return generateTailwindCss(tailwindConfig);
};

module.exports = {
  generateTailwindCss,
  generatePluginCss
};
