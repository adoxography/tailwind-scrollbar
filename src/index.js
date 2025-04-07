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
  const passedPreferredStrategy = options.preferredStrategy ?? options.preferredstrategy ?? 'standard';
  /** @type {'standard' | 'pseudoelements'} */
  let preferredStrategy;

  if (passedPreferredStrategy === 'standard' || passedPreferredStrategy === 'pseudoelements') {
    preferredStrategy = passedPreferredStrategy;
  } else {
    // eslint-disable-next-line no-console
    console.warn('WARNING: tailwind-scrollbar preferredStrategy should be \'standard\' or \'pseudoelements\'');
    preferredStrategy = 'standard';
  }

  const completeOptions = {
    preferredStrategy,
    nocompatible: !!options.nocompatible
  };

  addBaseStyles(tailwind, completeOptions);
  addBaseSizeUtilities(tailwind, completeOptions);
  addColorUtilities(tailwind);
  addVariants(tailwind);

  if (completeOptions.nocompatible) {
    addRoundedUtilities(tailwind);
    addSizeUtilities(tailwind);
  }
});
