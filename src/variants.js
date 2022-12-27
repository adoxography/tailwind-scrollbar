const { flagEnabled } = require('tailwindcss/lib/featureFlags');
const typedefs = require('./typedefs');

/**
 * @typedef {object} VariantOverride
 * @property {string} variant - The variant name as it appears in the utitlity
 * @property {string} defaultFormat - The format for non-scrollbar utilities
 * @property {string} scrollbarFormat - The format for scrollbar utilities
 */

/**
 * Generates the variants that will need overriding for scrollbar variants to
 * work as expected.
 *
 * Each entry consists of the variant name, the format all non scrollbar
 * variants should take, and the format scrollbar variants should take.
 *
 * @param {Function} config - Accesses Tailwind's configuration
 * @returns {VariantOverride[]} - The overrides
 */
const generateVariantOverrides = config => [
  ...[
    !flagEnabled(config(), 'hoverOnlyWhenSupported')
      ? {
        variant: 'hover',
        defaultFormat: '&:hover',
        scrollbarFormat: '&'
      }
      : {
        variant: 'hover',
        defaultFormat: '@media (hover: hover) and (pointer: fine) { &:hover }',
        scrollbarFormat: '@media (hover: hover) and (pointer: fine) { & }'
      }
  ],
  {
    variant: 'active',
    defaultFormat: '&:active',
    scrollbarFormat: '&'
  }
];

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
  const variantOverrides = generateVariantOverrides(config);

  variantOverrides.forEach(({ variant, defaultFormat, scrollbarFormat }) => {
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

      return found ? scrollbarFormat : defaultFormat;
    });
  });
};

module.exports = {
  addVariantOverrides
};
