const plugin = require('tailwindcss/plugin');
const {
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES,
  buildSuffixMap,
  generateColorUtilities,
  generateRadiusUtilities,
  generateUtilitiesFromSuffixes
} = require('./utilities');
const { scrollbarAwareVariant } = require('./variants');

module.exports = plugin.withOptions((options = {}) => (tailwind => {
  const areRoundedVariantsSpecified = () => {
    if (tailwind.config('variants.scrollbar', []).includes('rounded')) {
      /* eslint-disable-next-line no-console */
      console.log('DEPRECATION: adding rounded classes via the variants array is deprecated. Use nocompatible mode instead (i.e. when adding the plugin, use `scrollbarPlugin({ nocompatible: true })`)');
      return true;
    }

    return false;
  };

  const scrollbarColorUtilities = generateUtilitiesFromSuffixes(
    buildSuffixMap(tailwind.theme('colors', {}), tailwind.e),
    (k, v) => generateColorUtilities(k, v)
  );

  let scrollbarRadiusUtilities = {};
  if (options.nocompatible || areRoundedVariantsSpecified()) {
    scrollbarRadiusUtilities = generateUtilitiesFromSuffixes(
      buildSuffixMap(tailwind.theme('borderRadius', {}), tailwind.e),
      generateRadiusUtilities
    );
  }

  tailwind.addBase(BASE_STYLES);

  tailwind.addUtilities({
    ...SCROLLBAR_SIZE_UTILITIES,
    ...scrollbarRadiusUtilities
  });

  tailwind.addUtilities(scrollbarColorUtilities);

  tailwind.addVariant('hover', scrollbarAwareVariant('hover', tailwind.e));
  tailwind.addVariant('active', scrollbarAwareVariant('active', tailwind.e));
}));
