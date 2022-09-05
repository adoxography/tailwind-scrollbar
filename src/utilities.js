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
  },

  '&::-webkit-scrollbar-corner': {
    'background-color': 'var(--scrollbar-corner)'
  },

  '&::-webkit-scrollbar-track:hover': {
    'background-color': 'var(--scrollbar-track-hover)'
  },

  '&::-webkit-scrollbar-thumb:hover': {
    'background-color': 'var(--scrollbar-thumb-hover)'
  },

  '&::-webkit-scrollbar-corner:hover': {
    'background-color': 'var(--scrollbar-corner-hover)'
  },

  '&::-webkit-scrollbar-track:active': {
    'background-color': 'var(--scrollbar-track-active)'
  },

  '&::-webkit-scrollbar-thumb:active': {
    'background-color': 'var(--scrollbar-thumb-active)'
  },

  '&::-webkit-scrollbar-corner:active': {
    'background-color': 'var(--scrollbar-corner-active)'
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

module.exports = {
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES
};
