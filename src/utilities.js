/**
 * Collapses a nested object into a flat object of suffix/value pairs.
 *
 * @param {object} configObj The object to collapse
 * @param {Function} e       A function that escapes special characters from keys
 * @param {string} sep       The separator between key segments
 * @returns {object} A flat object that maps suffixes to their values
 */
const buildSuffixMap = (configObj, e, sep = '-') => {
  const build = (obj, prefix = '') => Object.entries(obj)
    .reduce((memo, [key, value]) => {
      const suffix = `${sep}${e(key)}`;
      let result;

      if (typeof value === 'object') {
        result = build(value, suffix);
      } else {
        const compoundKey = key === 'DEFAULT' ? prefix : `${prefix}${suffix}`;
        result = { [compoundKey]: value };
      }

      return { ...memo, ...result };
    }, {});

  return build(configObj);
};

/**
 * Builds a CSS-in-JS object by passing a map of suffixes and values into a
 * function.
 *
 * @param {object} suffixMap A map of string suffixes to CSS values
 * @param {Function} func    A function that consumes class suffixes and CSS
 *                           values to produce a CSS-in-JS object
 * @returns {object} A CSS-in-JS object consisting of all of the objects
 *                   generated for each suffix/value pair
 */
const generateUtilitiesFromSuffixes = (suffixMap, func) => Object.entries(suffixMap)
  .reduce((memo, [key, value]) => ({ ...memo, ...func(key, value) }), {});

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
  overflow: 'overlay',

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
 * @param {string} key                 The text to use in the class name
 * @param {string} value               The color to set the element to
 * @param {boolean} generateTrackHover Whether to generate track hover styles
 * @returns {object} The generated utilities
 */
const generateColorUtilities = (key, value, generateTrackHover = false) => {
  const utilities = {};
  const cssValue = `${value} !important`;

  utilities[`.scrollbar-track${key}`] = {
    '--scrollbar-track': cssValue
  };

  utilities[`.scrollbar-thumb${key}`] = {
    '--scrollbar-thumb': cssValue
  };

  utilities[`.hover\\:scrollbar-thumb${key}`] = {
    '&::-webkit-scrollbar-thumb:hover': {
      '--scrollbar-thumb': cssValue
    }
  };

  if (generateTrackHover) {
    utilities[`.hover\\:scrollbar-track${key}`] = {
      '&::-webkit-scrollbar-thumb:track': {
        '--scrollbar-track': cssValue
      }
    };
  }

  return utilities;
};

/**
 * Generates a rounded style for a given name/value pair
 *
 * @param {string} key   The text to use in the class name
 * @param {string} value The CSS value to use as the border-radius
 * @returns {object} The generated rounded track and thumb utilities
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
