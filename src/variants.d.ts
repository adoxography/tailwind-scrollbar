/**
 * Tailwind doesn't take into account pseudo elements. The remedy here is to
 * inject our own scrollbar-aware version of particular variants.
 *
 * @param {string} variant The name of the variant that is being addressed
 * @param {Function} e A function for escaping class names
 * @returns {Function} A function that applies hover variants to selectors
 */
export function scrollbarAwareVariant(variant: string, e: Function): Function;
