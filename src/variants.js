const { flagEnabled } = require('tailwindcss/lib/featureFlags');

/**
 * Generates the variants that will need overriding for scrollbar variants to
 * work as expected.
 *
 * Each entry consists of the variant name, the format all non scrollbar
 * variants should take, and the format scrollbar variants should take.
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
