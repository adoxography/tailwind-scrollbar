export type ScrollbarOptions = {
    preferredStrategy: "standard" | "pseudoelements";
    nocompatible: boolean;
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
export function addBaseStyles({ addBase }: typedefs.TailwindPlugin, { preferredStrategy, nocompatible }: {
    preferredStrategy: "standard" | "pseudoelements";
    nocompatible: boolean;
}): void;
/**
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 * @param {ScrollbarOptions} options - Plugin options
 */
export function addBaseSizeUtilities({ addUtilities }: typedefs.TailwindPlugin, options: ScrollbarOptions): void;
/**
 * Adds scrollbar-COMPONENT-COLOR utilities for every scrollbar component.
 *
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 */
export function addColorUtilities({ matchUtilities, theme }: typedefs.TailwindPlugin): void;
/**
 * Adds scrollbar-COMPONENT-rounded-VALUE utilities for every scrollbar
 * component.
 *
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 */
export function addRoundedUtilities({ theme, matchUtilities }: typedefs.TailwindPlugin): void;
/**
 * Adds scrollbar-w-* and scrollbar-h-* utilities
 *
 * @param {typedefs.TailwindPlugin} tailwind - Tailwind's plugin object
 */
export function addSizeUtilities({ matchUtilities, theme }: typedefs.TailwindPlugin): void;
import typedefs = require("./typedefs");
