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

const CUSTOM_VARIANTS = ['rounded'];

module.exports = plugin(tailwind => {
  const scrollbarVariants = tailwind.variants('scrollbar', []);

  const colors = tailwind.theme('colors', {});
  Object.keys(colors).forEach(c => {
    if (typeof colors[c] === 'function') delete colors[c];
  });
  const scrollbarColorUtilities = generateUtilitiesFromSuffixes(
    buildSuffixMap(colors, tailwind.e),
    (k, v) => generateColorUtilities(k, v, scrollbarVariants.includes('hover'))
  );

  let scrollbarRadiusUtilities = {};
  if (scrollbarVariants.includes('rounded')) {
    scrollbarRadiusUtilities = generateUtilitiesFromSuffixes(
      buildSuffixMap(tailwind.theme('borderRadius', {}), tailwind.e),
      generateRadiusUtilities
    );
  }

  tailwind.addBase(BASE_STYLES);

  tailwind.addUtilities({
    ...SCROLLBAR_SIZE_UTILITIES,
    ...scrollbarRadiusUtilities
  }, scrollbarVariants.filter(variant => !CUSTOM_VARIANTS.includes(variant)));

  tailwind.addUtilities(
    scrollbarColorUtilities,
    scrollbarVariants.filter(
      variant => variant !== 'hover' && !CUSTOM_VARIANTS.includes(variant)
    )
  );

  if (tailwind.config('mode') === 'jit') {
    tailwind.addVariant('hover', scrollbarAwareHover(tailwind.e));
  }
});
