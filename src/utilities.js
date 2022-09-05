const VARIANTS = ['hover', 'active'];
const COMPONENTS = ['track', 'thumb', 'corner'];

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
  '--scrollbar-corner': 'initial',
  '--scrollbar-track-hover': 'var(--scrollbar-track)',
  '--scrollbar-thumb-hover': 'var(--scrollbar-thumb)',
  '--scrollbar-corner-hover': 'var(--scrollbar-corner)',
  '--scrollbar-track-active': 'var(--scrollbar-track-hover)',
  '--scrollbar-thumb-active': 'var(--scrollbar-thumb-hover)',
  '--scrollbar-corner-active': 'var(--scrollbar-corner-hover)',

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

  ...Object.fromEntries(['', ...VARIANTS].map(variant => {
    const classSep = variant ? ':' : '';
    const valueSep = variant ? '-' : '';

    return COMPONENTS.map(component => ([
      `&::-webkit-scrollbar-${component}${classSep}${variant}`,
      {
        'background-color': `var(--scrollbar-${component}${valueSep}${variant})`
      }
    ]));
  }).flat())
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

module.exports = {
  BASE_STYLES,
  COMPONENTS,
  SCROLLBAR_SIZE_UTILITIES
};
