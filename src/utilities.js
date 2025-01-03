// TODO: Figure out why the linter is unhappy with this import
// eslint-disable-next-line import/no-unresolved
const flattenColorPaletteImport = require('tailwindcss/lib/util/flattenColorPalette');
const typedefs = require('./typedefs');
const { importDefault } = require('./helpers');

// Tailwind Play will import these internal imports as ES6 imports, while most
// other workflows will import them as CommonJS imports.
const flattenColorPalette = importDefault(flattenColorPaletteImport);

const COMPONENTS = ['track', 'thumb', 'corner'];

/**
 * @param {Record<never, unknown>} properties - The properties to assign
 * @param {boolean} preferPseudoElements - If true, only browsers that cannot
 *    use pseudoelements will specify scrollbar properties
 * @returns {Record<string, unknown>} - The generated CSS rules
 */
const scrollbarProperties = (properties, preferPseudoElements) => {
  if (preferPseudoElements) {
    return {
      '@supports (-moz-appearance:none)': properties
    };
  }

  return properties;
};

/**
 * Base resets to make the plugin's utilities work
 *
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 * @param {'standard' | 'peseudoelements'} preferredStrategy - The preferred
 *    scrollbar styling strategy: standards track or pseudoelements
 */
const addBaseStyles = ({ addBase }, preferredStrategy) => {
  addBase({
    '*': scrollbarProperties({
      'scrollbar-color': 'initial',
      'scrollbar-width': 'initial'
    }, preferredStrategy === 'pseudoelements')
  });
};

/**
 * Generates utilties that tell an element what to do with
 * --scrollbar-track and --scrollbar-thumb custom properties
 *
 * @returns {Record<string, unknown>} - The generated CSS
 */
const generateBaseUtilities = () => ({
  ...Object.fromEntries(COMPONENTS.map(component => {
    const base = `&::-webkit-scrollbar-${component}`;

    return [
      [base, {
        'background-color': `var(--scrollbar-${component})`,
        'border-radius': `var(--scrollbar-${component}-radius)`
      }]
    ];
  }).flat())
});

/**
 * Utilities for initializing a custom styled scrollbar, which implicitly set
 * the scrollbar's size
 *
 * @param {object} options - Options
 * @param {boolean} options.preferPseudoElements - If true, only browsers that
 *    cannot use pseudoelements will specify scrollbar-width
 * @returns {Record<string, unknown>} - Base size utilities for scrollbars
 */
const generateScrollbarSizeUtilities = ({ preferPseudoElements }) => ({
  '.scrollbar': {
    ...generateBaseUtilities(),
    ...scrollbarProperties({
      'scrollbar-width': 'auto',
      'scrollbar-color': 'var(--scrollbar-thumb, initial) var(--scrollbar-track, initial)'
    }, preferPseudoElements),

    '&::-webkit-scrollbar': {
      display: 'block',
      width: 'var(--scrollbar-width, 16px)',
      height: 'var(--scrollbar-height, 16px)'
    }
  },

  '.scrollbar-thin': {
    ...generateBaseUtilities(),
    ...scrollbarProperties({
      'scrollbar-width': 'thin',
      'scrollbar-color': 'var(--scrollbar-thumb, initial) var(--scrollbar-track, initial)'
    }, preferPseudoElements),

    '&::-webkit-scrollbar': {
      display: 'block',
      width: '8px',
      height: '8px'
    }
  },

  '.scrollbar-none': {
    ...scrollbarProperties({
      'scrollbar-width': 'none'
    }, preferPseudoElements),

    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }
});

/**
 * Converts a color value or function to a color value
 *
 * @param {string | Function} maybeFunction - The color value or function
 * @returns {string} - The color value
 */
const toColorValue = maybeFunction => (typeof maybeFunction === 'function' ? maybeFunction({}) : maybeFunction);

/**
 * Adds scrollbar-COMPONENT-COLOR utilities for every scrollbar component.
 *
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 */
const addColorUtilities = ({ matchUtilities, theme }) => {
  const themeColors = flattenColorPalette(theme('colors'));
  const colors = Object.fromEntries(
    Object.entries(themeColors).map(([k, v]) => [k, toColorValue(v)])
  );

  COMPONENTS.forEach(component => {
    matchUtilities(
      {
        [`scrollbar-${component}`]: value => ({
          [`--scrollbar-${component}`]: toColorValue(value)
        })
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
          [`--scrollbar-${component}-radius`]: value
        })
      },
      {
        values: theme('borderRadius')
      }
    );
  });
};

/**
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 * @param {'standard' | 'peseudoelements'} preferredStrategy - The preferred
 *    scrollbar styling strategy: standards track or pseudoelements
 */
const addBaseSizeUtilities = ({ addUtilities }, preferredStrategy) => {
  addUtilities(generateScrollbarSizeUtilities({
    preferPseudoElements: preferredStrategy === 'pseudoelements'
  }));
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
        [`--scrollbar-${dimension}`]: value
      })
    }, {
      values: theme(dimension)
    });
  });
};

module.exports = {
  addBaseStyles,
  addBaseSizeUtilities,
  addColorUtilities,
  addRoundedUtilities,
  addSizeUtilities
};
