// TODO: Figure out why the linter is unhappy with this import
// eslint-disable-next-line import/no-unresolved
const plugin = require('tailwindcss/plugin');
const {
  addBaseStyles,
  addBaseSizeUtilities,
  addColorUtilities,
  addRoundedUtilities,
  addSizeUtilities
} = require('./utilities');
const { addVariants } = require('./variants');

module.exports = plugin.withOptions((options = {}) => tailwind => {
  let preferredStrategy = options.preferredStrategy ?? options.preferredstrategy ?? 'standard';

  if (preferredStrategy !== 'standard' && preferredStrategy !== 'pseudoelements') {
    // eslint-disable-next-line no-console
    console.warn('WARNING: tailwind-scrollbar preferredStrategy should be \'standard\' or \'pseudoelements\'');
    preferredStrategy = 'standard';
  }

  addBaseStyles(tailwind, preferredStrategy);
  addBaseSizeUtilities(tailwind, preferredStrategy);
  addColorUtilities(tailwind);
  addVariants(tailwind);

  if (options.nocompatible) {
    addRoundedUtilities(tailwind);
    addSizeUtilities(tailwind);
  }
});
