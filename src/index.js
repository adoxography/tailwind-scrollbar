const plugin = require('tailwindcss/plugin');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette');
const toColorValue = require('tailwindcss/lib/util/toColorValue');
const {
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES,
  buildSuffixMap,
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

  const themeColors = flattenColorPalette.default(tailwind.theme('colors'));
  const colors = Object.fromEntries(
    Object.entries(themeColors).map(([k, v]) => [k, toColorValue.default(v)])
  );

  ['track', 'thumb', 'corner'].forEach(component => {
    tailwind.matchUtilities(
      {
        [`scrollbar-${component}`]: value => ({
          [`--scrollbar-${component}`]: `${value} !important`
        })
      },
      {
        values: colors,
        type: 'color'
      }
    );
  });

  tailwind.addVariant('hover', scrollbarAwareVariant('hover', tailwind.e));
  tailwind.addVariant('active', scrollbarAwareVariant('active', tailwind.e));
}));
