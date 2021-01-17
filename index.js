const plugin = require('tailwindcss/plugin');

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
  const generateScrollbarColorUtilities = (colors, prefix = '') => Object.entries(colors)
    .reduce((memo, [key, value]) => ({
      ...memo,
      ...(
        typeof value === 'object'
          ? generateScrollbarColorUtilities(value, `${e(key)}-`)
          : generateScrollbarClasses(`${prefix}${e(key)}`, value)
      )
    }), {});

  addBase({
    '*': {
      'scrollbar-color': 'initial',
      'scrollbar-width': 'initial'
    }
  });

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
  }, [variants('scrollbar')]);
});
