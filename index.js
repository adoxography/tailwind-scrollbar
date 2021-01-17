const plugin = require('tailwindcss/plugin');

const CUSTOM_VARIANTS = ['rounded'];

/**
 * Generates a track style, a thumb style, and a thumb hover style for a given
 * name/color pair
 *
 * @param name  The text to use in the class name
 * @param color The color to set the element to
 *
 * @return An object containing the generated classes
 */
const generateScrollbarClasses = (key, value) => ({
  [`.scrollbar-track-${key}`]: {
    '--scrollbar-track': value
  },

  [`.scrollbar-thumb-${key}`]: {
    '--scrollbar-thumb': value
  },

  [`.hover\\:scrollbar-thumb-${key}`]: {
    '&::-webkit-scrollbar-thumb:hover': {
      '--scrollbar-thumb': value
    }
  }
});

const generateScrollbarRadiusUtilities = (key, value) => ({
  [`.scrollbar-thumb-rounded-${key}`]: {
    '&::-webkit-scrollbar-thumb': {
      'border-radius': value
    }
  }
});

/**
 * Tells an element what to do with --scrollbar-track and --scrollbar-thumb
 * variables
 */
const scrollbarBase = {
  '--scrollbar-track': 'initial',
  '--scrollbar-thumb': 'initial',
  'scrollbar-color': 'var(--scrollbar-thumb) var(--scrollbar-track)',
  
  // Make sure the scrollbars are calculated in the elements width
  // NOTE: only has effect in webkit-based browsers, but is only really needed
  // in webkit-based browsers in the first place.
  'overflow': 'overlay',
  
  '&::-webkit-scrollbar-track': {
    'background-color': 'var(--scrollbar-track)'
  },

  '&::-webkit-scrollbar-thumb': {
    'background-color': 'var(--scrollbar-thumb)'
  }
};

module.exports = plugin(function ({ e, addUtilities, theme, addBase, variants }) {
  const scrollbarVariants = variants('scrollbar', []);

  const generateScrollbarColorUtilities = (colors, prefix = '') => Object.entries(colors)
    .reduce((memo, [key, value]) => ({
      ...memo,
      ...(
        typeof value === 'object'
          ? generateScrollbarColorUtilities(value, `${e(key)}-`)
          : generateScrollbarClasses(`${prefix}${e(key)}`, value)
      )
    }), {});

  const generateAllScrollbarRadiusUtilities = radii => Object.entries(radii)
    .reduce((memo, [key, value]) => ({
      ...memo,
      ...generateScrollbarRadiusUtilities(e(key), value)
    }), {});

  addBase({
    '*': {
      'scrollbar-color': 'initial',
      'scrollbar-width': 'initial'
    }
  });

  if (scrollbarVariants.includes('rounded')) {
    const scrollbarRadiusUtilities = generateAllScrollbarRadiusUtilities(theme('borderRadius', {}));
    addUtilities(scrollbarRadiusUtilities);
  }

  addUtilities({
    '.scrollbar': {
      ...scrollbarBase,
      'scrollbar-width': 'auto',

      '&::-webkit-scrollbar': {
        width: '16px',
        height: '16px'
      }
    },

    '.scrollbar-thin': {
      ...scrollbarBase,
      'scrollbar-width': 'thin',

      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px'
      }
    },

    ...generateScrollbarColorUtilities(theme('colors', {}))
  }, [scrollbarVariants.filter(variant => !CUSTOM_VARIANTS.includes(variant))]);
});
