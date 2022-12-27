const plugin = require('tailwindcss/plugin');
const {
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES,
  addColorUtilities,
  addRoundedUtilities,
  addSizeUtilities
} = require('./utilities');
const { addVariantOverrides } = require('./variants');

module.exports = plugin.withOptions((options = {}) => tailwind => {
  const areRoundedVariantsSpecified = () => {
    if (tailwind.config('variants.scrollbar', []).includes('rounded')) {
      /* eslint-disable-next-line no-console */
      console.log('DEPRECATION: adding rounded classes via the variants array is deprecated. Use nocompatible mode instead (i.e. when adding the plugin, use `scrollbarPlugin({ nocompatible: true })`)');
      return true;
    }

    return false;
  };

  tailwind.addBase(BASE_STYLES);
  tailwind.addUtilities(SCROLLBAR_SIZE_UTILITIES);
  addColorUtilities(tailwind);
  addVariantOverrides(tailwind);

  if (options.nocompatible || areRoundedVariantsSpecified()) {
    addRoundedUtilities(tailwind);
  }

  if (options.nocompatible) {
    addSizeUtilities(tailwind);
  }
});
