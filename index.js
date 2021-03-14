const plugin = require('tailwindcss/plugin');

const CUSTOM_VARIANTS = ['rounded'];

/**
 * Base resets to make the plugin's utilities work
 */
const BASE_STYLES = {
  '*': {
    'scrollbar-color': 'initial',
    'scrollbar-width': 'initial'
  }
};

/**
 * Tells an element what to do with --scrollbar-track and --scrollbar-thumb
 * variables
 */
const SCROLLBAR_SIZE_BASE = {
  '--scrollbar-track': 'initial',
  '--scrollbar-thumb': 'initial',
  'scrollbar-color': 'var(--scrollbar-thumb) var(--scrollbar-track)',
  
  // Make sure the scrollbars are calculated in the elements width
  // NOTE: only has effect in webkit-based browsers, but is only really needed
  // in webkit-based browsers in the first place.
  'overflow': 'overlay',
  
  // Prevent the plugin from overriding overflow-hidden
  '&.overflow-x-hidden': {
    'overflow-x': 'hidden'
  },

  '&.overflow-y-hidden': {
    'overflow-y': 'hidden'
  },

  '&::-webkit-scrollbar-track': {
    'background-color': 'var(--scrollbar-track)'
  },

  '&::-webkit-scrollbar-thumb': {
    'background-color': 'var(--scrollbar-thumb)'
  }
};

/**
 * Utilities for initializing a custom styled scrollbar, which implicitly set
 * the scrollbar's size
 */
const SCROLLBAR_SIZE_UTILITIES = {
  '.scrollbar': {
    ...SCROLLBAR_SIZE_BASE,
    'scrollbar-width': 'auto',

    '&::-webkit-scrollbar': {
      width: '16px',
      height: '16px'
    }
  },

  '.scrollbar-thin': {
    ...SCROLLBAR_SIZE_BASE,
    'scrollbar-width': 'thin',

    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px'
    }
  }
};

/**
 * Generates a track style, a thumb style, and a thumb hover style for a given
 * name/color pair
 *
 * @param key   The text to use in the class name
 * @param value The color to set the element to
 *
 * @return An object containing the generated utilities
 */
const generateScrollbarColorUtilities = (key, value) => ({
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
 * Generates a rounded style for a given name/value pair
 *
 * @param key   The text to use in the class name
 * @param value The CSS value to use as the border-radius
 *
 * @return an object containing the generated utility
 */
const generateScrollbarRadiusUtilities = (key, value) => {
  let className = '.scrollbar-thumb-rounded';

  if (key !== 'DEFAULT') {
    className += `-${key}`;
  }

  return {
    [className]: {
      '&::-webkit-scrollbar-thumb': {
        'border-radius': value
      }
    }
  };
};

module.exports = plugin(function ({ e, addUtilities, theme, addBase, variants }) {
  const scrollbarVariants = variants('scrollbar', []);

  const generateAllScrollbarColorUtilities = (colors, prefix = '') => Object.entries(colors)
    .reduce((memo, [key, value]) => ({
      ...memo,
      ...(
        typeof value === 'object'
          ? generateAllScrollbarColorUtilities(value, `${e(key)}-`)
          : generateScrollbarColorUtilities(key === 'DEFAULT' ? prefix.replace(/-$/, '') : `${prefix}${e(key)}`, value)
      )
    }), {});

  const generateAllScrollbarRadiusUtilities = radii => Object.entries(radii)
    .reduce((memo, [key, value]) => ({
      ...memo,
      ...generateScrollbarRadiusUtilities(e(key), value)
    }), {});

  let scrollbarRadiusUtilities = {};
  const scrollbarColorUtilities = generateAllScrollbarColorUtilities(theme('colors', {}));

  if (scrollbarVariants.includes('rounded')) {
    scrollbarRadiusUtilities = generateAllScrollbarRadiusUtilities(theme('borderRadius', {}));
  }

  addBase(BASE_STYLES);

  addUtilities({
    ...SCROLLBAR_SIZE_UTILITIES,
    ...scrollbarRadiusUtilities,
    ...scrollbarColorUtilities
  }, [scrollbarVariants.filter(variant => !CUSTOM_VARIANTS.includes(variant))]);
});
