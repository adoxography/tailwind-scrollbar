const plugin = require('tailwindcss/plugin');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette');
const toColorValue = require('tailwindcss/lib/util/toColorValue');

const { BASE_STYLES, SCROLLBAR_SIZE_UTILITIES } = require('./utilities');
const { scrollbarAwareVariant } = require('./variants');

const scrollbarComponents = ['track', 'thumb', 'corner'];

module.exports = plugin.withOptions((options = {}) => (tailwind => {
  const areRoundedVariantsSpecified = () => {
    if (tailwind.config('variants.scrollbar', []).includes('rounded')) {
      /* eslint-disable-next-line no-console */
      console.log('DEPRECATION: adding rounded classes via the variants array is deprecated. Use nocompatible mode instead (i.e. when adding the plugin, use `scrollbarPlugin({ nocompatible: true })`)');
      return true;
    }

    return false;
  };

  const themeColors = flattenColorPalette.default(tailwind.theme('colors'));
  const colors = Object.fromEntries(
    Object.entries(themeColors).map(([k, v]) => [k, toColorValue.default(v)])
  );

  tailwind.addBase(BASE_STYLES);
  tailwind.addUtilities(SCROLLBAR_SIZE_UTILITIES);

  scrollbarComponents.forEach(component => {
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

  if (options.nocompatible || areRoundedVariantsSpecified()) {
    scrollbarComponents.forEach(component => {
      tailwind.matchUtilities(
        {
          [`scrollbar-${component}-rounded`]: value => ({
            [`&::-webkit-scrollbar-${component}`]: {
              'border-radius': value
            }
          })
        },
        {
          values: tailwind.theme('borderRadius')
        }
      );
    });
  }

  tailwind.addVariant('hover', scrollbarAwareVariant('hover', tailwind.e));
  tailwind.addVariant('active', scrollbarAwareVariant('active', tailwind.e));
}));
