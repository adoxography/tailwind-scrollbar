const plugin = require('tailwindcss/plugin');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette');
const toColorValue = require('tailwindcss/lib/util/toColorValue');
const { flagEnabled } = require('tailwindcss/lib/featureFlags');

const { BASE_STYLES, SCROLLBAR_SIZE_UTILITIES } = require('./utilities');

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

  const variantOverrides = {
    // This is brittle and will need to be updated if/when this feature makes
    // it into core. There doesn't appear to be a way around it, though.
    hover: !flagEnabled(tailwind.config(), 'hoverOnlyWhenSupported')
      ? '&:hover'
      : '@media (hover: hover) and (pointer: fine) { &:hover }',
    active: '&:active'
  };

  Object.entries(variantOverrides).forEach(([variant, format]) => {
    tailwind.addVariant(variant, ({ container }) => {
      const suffix = `-${variant}`;

      container.walkRules(rule => {
        rule.walkDecls(/^--scrollbar-/, decl => {
          if (!decl.prop.endsWith(suffix)) {
            /* eslint-disable-next-line no-param-reassign */
            decl.prop += suffix;
          }
        });
      });

      return format;
    });
  });
}));
