const path = require('path');
const postcss = require('postcss');
const tailwindcssPostcss = require('@tailwindcss/postcss');

/**
 * Generates the CSS for the plugin
 *
 * @see https://www.oliverdavies.uk/blog/testing-tailwind-css-plugins-jest
 * @param {string} file The input file
 * @param {object} [options] Tailwind configuration modifications
 * @param {string} [options.theme] Additions to the generated theme
 * @param {string} [options.pluginOptions] Options for the scrollbar plugin
 * @returns {Promise<string>} The CSS generated from the plugin using the provided config
 */
const generatePluginCss = async (file, options = {}) => {
  const { currentTestName } = expect.getState();

  const configInsert = options.theme ? `@theme {\n${options.theme}\n}` : '';
  const pluginOptions = options.pluginOptions ? ` ${options.pluginOptions}` : ';';

  const result = await postcss(tailwindcssPostcss()).process(`
      @import 'tailwindcss/utilities' source(none);
      @plugin '.'${pluginOptions}
      @source './test/${file}';

      ${configInsert}
  `, {
    from: `${path.resolve(__dirname)}?test=${currentTestName}`
  });

  // Strip off extra whitespace, as well as comments left by Tailwind.
  return result.css.replace(/^\/\*!.*?\n/, '').trim();
};

module.exports = {
  generatePluginCss
};
