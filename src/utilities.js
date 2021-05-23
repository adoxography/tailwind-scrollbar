/**
 * Collapses a nested object into a flat object of suffix/value pairs.
 *
 * @param obj  The object to collapse
 * @param e    A function that escapes special characters from keys
 * @param sep  A string to use as the separator between key segments
 *
 * @return A flat object that maps suffixes to their values
 */
const buildSuffixMap = (obj, e, sep = '-') => {
  const build = (obj, prefix = '') => Object.entries(obj)
    .reduce((memo, [key, value]) => {
      const suffix = `${sep}${e(key)}`;
      let result;

      if (typeof value === 'object') {
        result = build(value, suffix);
      } else {
        const compoundKey = key === 'DEFAULT' ? prefix : `${prefix}${suffix}`;
        result = { [compoundKey]: value }
      }

      return { ...memo, ...result };
    }, {});

  return build(obj);
};

/**
 * Builds a CSS-in-JS object by passing a map of suffixes and values into a
 * function.
 *
 * @param suffixMap A map of string suffixes to CSS values
 * @param func      A function that consumes class suffixes and CSS values to
 *                  produce a CSS-in-JS object
 *
 * @return A CSS-in-JS object consisting of all of the objects generated for
 *         each suffix/value pair
 */
const generateUtilitiesFromSuffixes = (suffixMap, func) => Object.entries(suffixMap)
  .reduce((memo, [ key, value ]) => ({ ...memo, ...func(key, value) }), {});

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
  },

  '.scrollbar-none': {
    'scrollbar-width': 'none',

    '&::-webkit-scrollbar': {
      display: 'none'
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
const generateColorUtilities = (key, value) => ({
  [`.scrollbar-track${key}`]: {
    '--scrollbar-track': value
  },

  [`.scrollbar-thumb${key}`]: {
    '--scrollbar-thumb': value
  },

  [`.hover\\:scrollbar-thumb${key}`]: {
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
 * @return an object containing the generated rounded track and thumb utilities
 */
const generateRadiusUtilities = (key, value) => ({
  [`.scrollbar-thumb-rounded${key}`]: {
    '&::-webkit-scrollbar-thumb': {
      'border-radius': value
    }
  },
  [`.scrollbar-track-rounded${key}`]: {
    '&::-webkit-scrollbar-track': {
      'border-radius': value
    }
  }
});

module.exports = {
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES,
  buildSuffixMap,
  generateColorUtilities,
  generateRadiusUtilities,
  generateUtilitiesFromSuffixes
};
