/** @typedef {import('./typedefs').TailwindPlugin} TailwindPlugin */

/**
 * Adds scrollbar variants for styling webkit scrollbars' hover and active
 * states.
 *
 * Earlier iterations of this plugin hijacked the hover: and active: variants
 * directly to create a cleaner syntax, but there are several issues with that
 * approach:
 *     - It made the plugin prone to breaking other unrelated styles
 *     - It made logic like "make an element's scrollbar green when the
 *       _element_ is hovered impossible. (This is unusual, but should still
 *       be possible.)
 *     - It straight up does not work in Tailwind v4.
 *
 * @param {TailwindPlugin} tailwind - Tailwind's plugin object
 */
const addVariants = ({ addVariant }) => {
  addVariant('scrollbar-hover', '&::-webkit-scrollbar-thumb:hover');
  addVariant('scrollbar-track-hover', '&::-webkit-scrollbar-track:hover');
  addVariant('scrollbar-corner-hover', '&::-webkit-scrollbar-corner:hover');

  addVariant('scrollbar-active', '&::-webkit-scrollbar-thumb:active');
  addVariant('scrollbar-track-active', '&::-webkit-scrollbar-track:active');
  // Corners can't be active, so they don't get their own active variant.
};

module.exports = {
  addVariants
};
