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

module.exports = plugin.withOptions((options = {}) => tailwind => {
  const scrollbarVariants = tailwind.variants('scrollbar', []);

  const scrollbarColorUtilities = generateUtilitiesFromSuffixes(
    buildSuffixMap(tailwind.theme('colors', {}), tailwind.e),
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
      '.scrollbar-buttons': {
        '&::-webkit-scrollbar-button': {
          'background-color': 'var(--scrollbar-track)',
          'background-repeat': 'no-repeat'
        },

        '&.scrollbar::-webkit-scrollbar-button': {
          'background-size': '10px',

          '&:vertical': {
            height: '16px',

            '&:increment': {
              'background-position': 'center 5px'
            },

            '&:decrement': {
              'background-position': 'center 6px'
            }
          }
        },

        '&.scrollbar-thin::-webkit-scrollbar-button': {
          'background-size': '6px',

          '&:vertical': {
            height: '8px',

            '&:increment': {
              'background-position': 'center 2px'
            },

            '&:decrement': {
              'background-position': 'center 2px'
            }
          }
        },

        '&::-webkit-scrollbar-button:vertical': {
          '&:increment': {
            'background-image': 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' fill=\'rgb(73, 73, 73)\'><polygon points=\'0,0 100,0 50,50\'/></svg>")'
          },

          '&:decrement': {
            'background-image': 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' fill=\'rgb(73, 73, 73)\'><polygon points=\'50,00 0,50 100,50\'/></svg>")'
          }
        }
      }
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
