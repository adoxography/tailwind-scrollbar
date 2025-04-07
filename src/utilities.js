// TODO: Figure out why the linter is unhappy with this import
// eslint-disable-next-line import/no-unresolved
const flattenColorPaletteImport = require('tailwindcss/lib/util/flattenColorPalette');
const typedefs = require('./typedefs');
const { importDefault } = require('./helpers');
const props = require('./props');

// Tailwind Play will import these internal imports as ES6 imports, while most
// other workflows will import them as CommonJS imports.
const flattenColorPalette = importDefault(flattenColorPaletteImport);

const COMPONENTS = ['track', 'thumb', 'corner'];

/**
 * Creates a nested chain of CSS properties with fallbacks
 * (e.g. var(--foo, var(...)))
 *
 * @param {string[]} properties The properties, in order of precedence
 * @param {string?} fallback The finall fallback value in the chain
 * @returns {string} The resulting CSS value
 */
const buildPropertyFallbackChain = (properties, fallback) => {
  const [first, ...rest] = properties;

  if (!first) {
    return '';
  }

  if (!rest.length) {
    if (fallback) {
      return `var(${first}, ${fallback})`;
    }

    return `var(${first})`;
  }

  return `var(${first}, ${buildPropertyFallbackChain(rest, fallback)})`;
};

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
  addBase([
    // The _ prefixed properties represent properties set by utilities (as
    // opposed to global configuration). We mark them as not inherited by
    // default, since utilities specified with variants are scoped to their
    // respective pseudoelements, preventing them from being inherited. This
    // keeps them consistent across the board.
    Object.fromEntries(COMPONENTS.map(component => [`@property ${props.colourUtility(component)}`, {
      syntax: '"*"',
      inherits: false
    }])),

    {
      '*': scrollbarProperties({
        'scrollbar-color': 'initial',
        'scrollbar-width': 'initial'
      }, preferredStrategy === 'pseudoelements')
    }
  ]);
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

    const utilityProperty = props.colourUtility(component);
    const idleProperty = props.colourDefault(component);
    const hoverProperty = props.hoverColourDefault(component);
    const activeProperty = props.activeColourDefault(component);

    const entries = [
      // Styles applied to the pseudoelement (without any pseudoselectors)
      [base, {
        // The utility-defined colour is set on the element itself, but we want
        // the pseudoelement to inherit it. It's set to not inherit by default.
        [utilityProperty]: 'inherit',

        // Prefer the value from a utility, but fall back to the globally
        // configured value.
        'background-color': buildPropertyFallbackChain([utilityProperty, idleProperty]),
        'border-radius': `var(--scrollbar-${component}-radius)`
      }],

      // Styles applied to the :hover pseudoselector of the pseudoelement
      [`${base}:hover`, {
        // Prefer the value from a utility, then fall back to the value(s) from
        // the configuration. If there wsa not conifgured hover value, use the
        // default configured value.
        'background-color': buildPropertyFallbackChain([
          utilityProperty,
          hoverProperty,
          idleProperty
        ])
      }]
    ];

    // Corners can't be active, so don't bother including CSS for handling
    // their active states.
    if (component !== 'corner') {
      entries.push([`${base}:active`, {
        'background-color': buildPropertyFallbackChain([
          utilityProperty,
          activeProperty,
          hoverProperty,
          idleProperty
        ])
      }]);
    }

    return entries;
  }).flat())
});

/**
 * Utilities for initializing a custom styled scrollbar, which implicitly set
 * the scrollbar's size and set up the logic for colour assignment.
 *
 * @param {object} options - Options
 * @param {boolean} options.preferPseudoElements - If true, only browsers that
 *    cannot use pseudoelements will specify scrollbar-width
 * @returns {Record<string, unknown>} - Base size utilities for scrollbars
 */
const generateScrollbarSizeUtilities = ({ preferPseudoElements }) => {
  const scrollbarThumbColor = buildPropertyFallbackChain([
    props.colourUtility('thumb'),
    props.colourDefault('thumb')
  ], 'initial');
  const scrollbarTrackColor = buildPropertyFallbackChain([
    props.colourUtility('track'),
    props.colourDefault('track')
  ], 'initial');
  const scrollbarColorValue = `${scrollbarThumbColor} ${scrollbarTrackColor}`;

  return {
    '.scrollbar': {
      ...generateBaseUtilities(),
      ...scrollbarProperties({
        'scrollbar-width': 'auto',
        'scrollbar-color': scrollbarColorValue
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
        'scrollbar-color': scrollbarColorValue
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
  };
};

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
          [props.colourUtility(component)]: toColorValue(value)
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
