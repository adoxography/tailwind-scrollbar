const DEFAULT_ARROW_COLOR = '#374151'; // gray-700
/**
 * Generates a mapping of CSS variables to their respective arrow SVGs
 *
 * @param {string} value A CSS colour value
 * @returns {object} A mapping of arrow SVGs
 */
const generateArrowSVGs = value => ({
  '--scrollbar-arrow-up': `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${value}'><polygon points='50,00 0,50 100,50'/></svg>")`,
  '--scrollbar-arrow-down': `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${value}'><polygon points='0,0 100,0 50,50'/></svg>")`,
  '--scrollbar-arrow-right': `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${value}'><polygon points='0,0 0,100 50,50'/></svg>")`,
  '--scrollbar-arrow-left': `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${value}'><polygon points='100,100 100,0 50,50'/></svg>")`
});

/**
 * @constant
 * @default
 */
const BASE_BUTTON_UTILITIES = {
  '.scrollbar-buttons': {
    '--scrollbar-button-bg': 'var(--scrollbar-track)',
    ...generateArrowSVGs(DEFAULT_ARROW_COLOR),

    '&::-webkit-scrollbar-button': {
      'background-color': 'var(--scrollbar-button-bg)',
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
      },

      '&:horizontal': {
        width: '16px',

        '&:increment': {
          'background-position': '6px center'
        },

        '&:decrement': {
          'background-position': '0 center'
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
        'background-image': 'var(--scrollbar-arrow-down)'
      },

      '&:decrement': {
        'background-image': 'var(--scrollbar-arrow-up)'
      }
    },

    '&::-webkit-scrollbar-button:horizontal': {
      '&:increment': {
        'background-image': 'var(--scrollbar-arrow-right)'
      },

      '&:decrement': {
        'background-image': 'var(--scrollbar-arrow-left)'
      }
    }
  }
};

/**
 * @param {object} suffixMap A mapping of class suffixes to CSS values
 * @returns {object} A CSS-in-JS object containing button (background) and
 *                   arrow utilities
 */
const generateButtonColors = suffixMap => Object.entries(suffixMap)
  .reduce((memo, [suffix, value]) => ({
    ...memo,
    [`.scrollbar-button-bg${suffix}`]: {
      '--scrollbar-button-bg': value
    },
    [`.scrollbar-arrows${suffix}`]: generateArrowSVGs(value)
  }), {});

module.exports = {
  BASE_BUTTON_UTILITIES,
  generateButtonColors
};
