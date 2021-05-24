const plugin = require('tailwindcss/plugin');
const {
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES,
  buildSuffixMap,
  generateColorUtilities,
  generateUtilitiesFromSuffixes,
  generateCustomUtilities
} = require('./utilities');
const { scrollbarAwareHover } = require('./variants');

module.exports = plugin(tailwind => {
  const scrollbarColorUtilities = generateUtilitiesFromSuffixes(
    buildSuffixMap(tailwind.theme('colors', {}), tailwind.e),
    generateColorUtilities
  );

  const customUtilities = tailwind.theme('scrollbar', [])
    .reduce((memo, [utilityName, property, values]) => ({
      ...memo,
      ...generateCustomUtilities(utilityName, property, values, tailwind.e)
    }), {});

  tailwind.addBase(BASE_STYLES);

  tailwind.addUtilities({
    ...SCROLLBAR_SIZE_UTILITIES,
    ...customUtilities,
    ...scrollbarColorUtilities
  }, [tailwind.variants('scrollbar', [])]);

  if (tailwind.config('mode') === 'jit') {
    tailwind.addVariant('hover', scrollbarAwareHover(tailwind.e));
  }
});
