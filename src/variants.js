/**
 * Tailwind's JIT engine assumes that hover variants always mean the element's
 * :hover selector should be targeted, but that's not the case when it comes
 * to webkit scrollbars. The remedy here is to inject our own scrollbar-aware
 * version of the hover variant. It's super brittle, but hopefully the JIT
 * engine will expose more options as it matures.
 *
 * @param {Function} e A function for escaping class names
 * @returns {Function} A function that applies hover variants to selectors
 */
const scrollbarAwareHover = e => ({ modifySelectors, separator }) => {
  modifySelectors(({ className }) => {
    let pseudoEl = '';
    const match = className.match(/^scrollbar-(thumb|track)-/);

    if (match) {
      pseudoEl = `::-webkit-scrollbar-${match[1]}`;
    }

    return `.${e(`hover${separator}${className}`)}${pseudoEl}:hover`;
  });
};

module.exports = {
  scrollbarAwareHover
};
