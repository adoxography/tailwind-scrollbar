// TODO: Figure out why the linter is unhappy with this import
// eslint-disable-next-line import/no-unresolved
const flattenColorPaletteImport = require('tailwindcss/lib/util/flattenColorPalette');
const typedefs = require('./typedefs');
const { importDefault } = require('./helpers');
const props = require('./props');

/**
 * @typedef {{
 *     preferredStrategy: 'standard' | 'pseudoelements';
 *     nocompatible: boolean;
 * }} ScrollbarOptions
 */

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
 * @param {object} options - Style options
 * @param {'standard' | 'pseudoelements'} options.preferredStrategy - The preferred
 *    scrollbar styling strategy: standards track or pseudoelements
 * @param {boolean} options.nocompatible - True is incompatible properties are permitted
 */
const addBaseStyles = ({ addBase }, { preferredStrategy, nocompatible }) => {
  // Properties set by utilities (as opposed to global configuration) are not
  // inherited by default. Utilities specified with variants are scoped to their
  // respective pseudoelements, preventing them from being inherited, so this
  // keeps the inheritance (or lack thereof) consistent.
  const properties = [
    ...COMPONENTS.map(props.colourUtility),
    props.dimensionUtility('width'),
    props.dimensionUtility('height')
  ];

  if (nocompatible) {
    properties.push(...COMPONENTS.map(props.radiusUtility));
  }

  addBase([
    Object.fromEntries(properties.map(property => [`@property ${property}`, {
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
 * @param {ScrollbarOptions} options - Plugin options
 * @returns {Record<string, unknown>} - The generated CSS
 */
const generateBaseUtilities = ({ nocompatible }) => ({
  ...Object.fromEntries(COMPONENTS.map(component => {
    const base = `&::-webkit-scrollbar-${component}`;

    const utilityProperty = props.colourUtility(component);
    const idleProperty = props.colourDefault(component);
    const hoverProperty = props.hoverColourDefault(component);
    const activeProperty = props.activeColourDefault(component);

    const radiusUtilityProperty = props.radiusUtility(component);
    const radiusProperty = props.radiusDefault(component);

    // Styles applied to the pseudoelement (without any pseudoselectors)
    const baseStyles = {
      // The utility-defined colour is set on the element itself, but we want
      // the pseudoelement to inherit it. It's set to not inherit by default.
      [utilityProperty]: 'inherit',

      // Prefer the value from a utility, but fall back to the globally
      // configured value.
      'background-color': buildPropertyFallbackChain([utilityProperty, idleProperty])
    };

    // Only add rounded logic to the base styles in nocompatible mode
    if (nocompatible) {
      baseStyles[radiusUtilityProperty] = 'inherit';
      baseStyles['border-radius'] = buildPropertyFallbackChain([radiusUtilityProperty, radiusProperty]);
    }

    const entries = [
      [base, baseStyles]
    ];

    // Corners don't have active/hover states, so don't bother including CSS
    // for handling them.
    if (component !== 'corner') {
      entries.push([`${base}:hover`, {
        'background-color': buildPropertyFallbackChain([
          utilityProperty,
          hoverProperty,
          idleProperty
        ])
      }]);

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
 * @param {ScrollbarOptions} options - Plugin options
 * @returns {Record<string, unknown>} - Base size utilities for scrollbars
 */
const generateScrollbarSizeUtilities = options => {
  const preferPseudoElements = options.preferredStrategy === 'pseudoelements';

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
      ...generateBaseUtilities(options),
      ...scrollbarProperties({
        'scrollbar-width': 'auto',
        'scrollbar-color': scrollbarColorValue
      }, preferPseudoElements),

      '&::-webkit-scrollbar': {
        display: 'block',
        width: buildPropertyFallbackChain([
          props.dimensionUtility('width'),
          props.dimensionDefault('width')
        ], '16px'),
        height: buildPropertyFallbackChain([
          props.dimensionUtility('height'),
          props.dimensionDefault('height')
        ], '16px')
      }
    },

    '.scrollbar-thin': {
      ...generateBaseUtilities(options),
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
          [props.radiusUtility(component)]: value
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
 * @param {ScrollbarOptions} options - Plugin options
 */
const addBaseSizeUtilities = ({ addUtilities }, options) => {
  addUtilities(generateScrollbarSizeUtilities(options));
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
        [props.dimensionUtility(dimension)]: value
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
