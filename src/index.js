const plugin = require('tailwindcss/plugin');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette');
const toColorValue = require('tailwindcss/lib/util/toColorValue');
const { flagEnabled } = require('tailwindcss/lib/featureFlags');

const {
  COMPONENTS,
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES
} = require('./utilities');

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

  COMPONENTS.forEach(component => {
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
    COMPONENTS.forEach(component => {
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

  const variantOverrides = [
    ...[
      !flagEnabled(tailwind.config(), 'hoverOnlyWhenSupported')
        ? {
          variant: 'hover',
          defaultFormat: '&:hover',
          scrollbarFormat: '&'
        }
        : {
          variant: 'hover',
          defaultFormat: '@media (hover: hover) and (pointer: fine) { &:hover }',
          scrollbarFormat: '@media (hover: hover) and (pointer: fine) { & }'
        }
    ],
    {
      variant: 'active',
      defaultFormat: '&:active',
      scrollbarFormat: '&'
    }
  ];

  variantOverrides.forEach(({ variant, defaultFormat, scrollbarFormat }) => {
    tailwind.addVariant(variant, ({ container }) => {
      const suffix = `-${variant}`;
      let found = false;

      container.walkRules(rule => {
        rule.walkDecls(/^--scrollbar-/, decl => {
          found = true;
          if (!decl.prop.endsWith(suffix)) {
            /* eslint-disable-next-line no-param-reassign */
            decl.prop += suffix;
          }
        });
      });

      return found ? scrollbarFormat : defaultFormat;
    });
  });
}));
