const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette');
const toColorValue = require('tailwindcss/lib/util/toColorValue');
const typedefs = require('./typedefs');

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
  'scrollbar-color': 'var(--scrollbar-thumb, initial) var(--scrollbar-track, initial)',

  // Make sure the scrollbars are calculated in the elements width
  // TODO: Retrace why this was included - firefox compatibility, maybe?
  overflow: 'overlay',

  // Prevent the plugin from overriding overflow-hidden
  '&.overflow-x-hidden': {
    'overflow-x': 'hidden'
  },

  '&.overflow-y-hidden': {
    'overflow-y': 'hidden'
  },

  ...Object.fromEntries(COMPONENTS.map(component => {
    const base = `&::-webkit-scrollbar-${component}`;

    return [
      [base, {
        'background-color': `var(--scrollbar-${component})`
      }],
      [`${base}:hover`, {
        'background-color': `var(--scrollbar-${component}-hover, var(--scrollbar-${component}))`
      }],
      [`${base}:active`, {
        'background-color': `var(--scrollbar-${component}-active, var(--scrollbar-${component}-hover, var(--scrollbar-${component})))`
      }]
    ];
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

/**
 * Adds scrollbar-COMPONENT-COLOR utilities for every scrollbar component.
 *
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 */
const addColorUtilities = ({ matchUtilities, theme }) => {
  const themeColors = flattenColorPalette.default(theme('colors'));
  const colors = Object.fromEntries(
    Object.entries(themeColors).map(([k, v]) => [k, toColorValue.default(v)])
  );

  COMPONENTS.forEach(component => {
    matchUtilities(
      {
        [`scrollbar-${component}`]: value => {
          const color = toColorValue.default(value);
          return {
            [`--scrollbar-${component}`]: `${color} !important`
          };
        }
      },
      {
        values: colors,
        type: 'color'
      }
    );
  });
};

/**
 * Adds scrollbar-COMPONENT-rounded-VALUE utilities for every scrollbar
 * component.
 *
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 */
const addRoundedUtilities = ({ theme, matchUtilities }) => {
  COMPONENTS.forEach(component => {
    matchUtilities(
      {
        [`scrollbar-${component}-rounded`]: value => ({
          [`&::-webkit-scrollbar-${component}`]: {
            'border-radius': value
          }
        })
      },
      {
        values: theme('borderRadius')
      }
    );
  });
};

/**
 * Adds scrollbar-w-* and scrollbar-h-* utilities
 *
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 */
const addSizeUtilities = ({ matchUtilities, theme }) => {
  ['width', 'height'].forEach(dimension => {
    matchUtilities({
      [`scrollbar-${dimension[0]}`]: value => ({
        '&::-webkit-scrollbar': {
          [dimension]: value
        }
      })
    }, {
      values: theme(dimension)
    });
  });
};

module.exports = {
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES,
  addColorUtilities,
  addRoundedUtilities,
  addSizeUtilities
};
