export type TailwindPlugin = import("./typedefs").TailwindPlugin;
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
export function addVariants({ addVariant }: TailwindPlugin): void;
