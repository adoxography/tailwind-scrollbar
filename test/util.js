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

/**
 * Generates a diff between a default tailwind run and one customized with a
 * config
 *
 * @see https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/index.test.js
 * @param {object} config The config to diff against
 * @returns {string} The diff between the configured tailwind run and the default
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

module.exports = {
  generatePluginCss,
  diffOnly
};
