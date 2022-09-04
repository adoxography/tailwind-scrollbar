/**
 * Tailwind doesn't take into account pseudo elements. The remedy here is to
 * inject our own scrollbar-aware version of particular variants.
 *
 * @param {string} variant The name of the variant that is being addressed
 * @param {Function} e A function for escaping class names
 * @returns {Function} A function that applies hover variants to selectors
 */
const scrollbarAwareVariant = (variant, e) => ({ modifySelectors, separator }) => {
  modifySelectors(({ className }) => {
    let pseudoEl = '';
    const match = className.match(/^scrollbar-(thumb|track|corner)-/);

    if (match) {
      pseudoEl = `::-webkit-scrollbar-${match[1]}`;
    }

    return `.${e(`${variant}${separator}${className}`)}${pseudoEl}:${variant}`;
  });
};

module.exports = {
  scrollbarAwareVariant
};
