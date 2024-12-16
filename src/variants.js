const typedefs = require('./typedefs');

let featureFlagsAvailable = true;

const { flagEnabled } = (() => {
  // from tailwind v4, featureFlags is not exist
  try {
    // with tailwind v3
    // eslint-disable-next-line global-require
    return require('tailwindcss/lib/featureFlags');
  } catch (e) {
    // with tailwind v4
    if (e instanceof Error && e.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
      featureFlagsAvailable = false;
      return {};
    }
    // unknown error
    throw e;
  }
})();

/**
 * @typedef {object} VariantOverride
 * @property {string} variant - The variant name as it appears in the utitlity
 * @property {string} defaultFormat - The format for non-scrollbar utilities
 * @property {string} scrollbarFormat - The format for scrollbar utilities
 */

/**
 * The variants tailwind-scrollbar cares about. hover and focus are the real
 * targets, but we include the others so that their relative order can be
 * preserved.
 */
const variants = [
  'hover',
  'focus',
  'focus-visible',
  'active',
  'enabled',
  'disabled'
];

/**
 * Gets the variant format string used by Tailwind for a variant.
 *
 * @param {string} variant The name of the variant
 * @param {typedefs.TailwindPlugin.config} config - Tailwind's configuration
 * @returns {string} The variant format string
 */
const getDefaultFormat = (variant, config) => {
  if (variant === 'hover') {
    if (!featureFlagsAvailable) {
      return '@media (hover: hover) { &:hover }';
    }

    if (flagEnabled && flagEnabled(config(), 'hoverOnlyWhenSupported')) {
      return '@media (hover: hover) and (pointer: fine) { &:hover }';
    }
  }

  return `&:${variant}`;
};

/**
 * Gets the variant format string that should be used if a rule is detected to
 * target a scrollbar
 *
 * @param {string} variant The name of the variant
 * @param {typedefs.TailwindPlugin.config} config - Tailwind's configuration
 * @returns {string} The variant format string
 */
const getScrollbarFormat = (variant, config) => {
  if (variant === 'hover') {
    if (!featureFlagsAvailable) {
      return '@media (hover: hover) { & }';
    }

    if (flagEnabled && flagEnabled(config(), 'hoverOnlyWhenSupported')) {
      return '@media (hover: hover) and (pointer: fine) { & }';
    }
  }

  return '&';
};

/**
 * Modifies the way variant utilities are generated for scrollbars.
 *
 * Tailwind isn't very good at styling arbitrary pseudo classes of pseudo
 * elements, so scrollbar colour classes keep track of a default, hover, and
 * active state and use the cascade to determine which one to use. Instead of
 * trying to style a pseudo class, scrollbar utilities modify the name of the
 * property that is being applied and apply directly to the original class.
 *
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 */
const addVariantOverrides = ({ addVariant, config }) => {
  variants.forEach(variant => {
    addVariant(variant, ({ container }) => {
      const suffix = `-${variant}`;
      let found = false;

      container.walkRules(rule => {
        rule.walkDecls(/^--scrollbar-/, decl => {
          found = true;
          if (!decl.prop.endsWith(suffix)) {
            /* eslint-disable-next-line no-param-reassign */
            decl.prop += suffix;
          }
        });
      });

      if (found) {
        return getScrollbarFormat(variant, config);
      }

      return getDefaultFormat(variant, config);
    });
  });
};

module.exports = {
  addVariantOverrides
};
