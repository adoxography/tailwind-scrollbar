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
const {
  BASE_BUTTON_UTILITIES,
  generateButtonColors,
  generateGaps
} = require('./buttons');

const CUSTOM_VARIANTS = ['rounded'];

module.exports = plugin.withOptions((options = {}) => tailwind => {
  const scrollbarVariants = tailwind.variants('scrollbar', []);
  const colorSuffixMap = buildSuffixMap(tailwind.theme('colors', {}), tailwind.e);

  const scrollbarColorUtilities = generateUtilitiesFromSuffixes(
    colorSuffixMap,
    (k, v) => generateColorUtilities(k, v, scrollbarVariants.includes('hover'))
  );

  let scrollbarRadiusUtilities = {};
  if (scrollbarVariants.includes('rounded')) {
    scrollbarRadiusUtilities = generateUtilitiesFromSuffixes(
      buildSuffixMap(tailwind.theme('borderRadius', {}), tailwind.e),
      generateRadiusUtilities
    );
  }

  let scrollbarButtonUtilities = {};
  if (options.webkitButtons) {
    scrollbarButtonUtilities = {
      ...BASE_BUTTON_UTILITIES,
      ...generateButtonColors(colorSuffixMap),
      ...generateGaps(buildSuffixMap(tailwind.theme('spacing', {}), tailwind.e))
    };
  }

  tailwind.addBase(BASE_STYLES);

  tailwind.addUtilities({
    ...SCROLLBAR_SIZE_UTILITIES,
    ...scrollbarRadiusUtilities,
    ...scrollbarButtonUtilities
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
