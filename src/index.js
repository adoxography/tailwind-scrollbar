const plugin = require('tailwindcss/plugin');
const {
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES,
  buildSuffixMap,
  generateColorUtilities,
  generateRadiusUtilities,
  generateUtilitiesFromSuffixes
} = require('./utilities');
const { scrollbarAwareHover } = require('./variants');

module.exports = plugin.withOptions(options => (tailwind => {
  const scrollbarVariants = tailwind.config('variants.scrollbar', []);

  const scrollbarColorUtilities = generateUtilitiesFromSuffixes(
    buildSuffixMap(tailwind.theme('colors', {}), tailwind.e),
    (k, v) => generateColorUtilities(k, v, scrollbarVariants.includes('hover'))
  );

  let scrollbarRadiusUtilities = {};
  if (options?.nocompatible) {
    scrollbarRadiusUtilities = generateUtilitiesFromSuffixes(
      buildSuffixMap(tailwind.theme('borderRadius', {}), tailwind.e),
      generateRadiusUtilities
    );
  }

  tailwind.addBase(BASE_STYLES);

  tailwind.addUtilities({
    ...SCROLLBAR_SIZE_UTILITIES,
    ...scrollbarRadiusUtilities
  }, scrollbarVariants);

  tailwind.addUtilities(scrollbarColorUtilities, scrollbarVariants);

  if (tailwind.config('mode') === 'jit') {
    tailwind.addVariant('hover', scrollbarAwareHover(tailwind.e));
  }
}));
