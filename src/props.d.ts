/**
 * @param {string} component The scrollbar component
 * @returns {string} The colour utility property for the given component
 */
export function colourUtility(component: string): string;
/**
 * @param {string} component The scrollbar component
 * @returns {string} The default idle colour property for the given component
 */
export function colourDefault(component: string): string;
/**
 * @param {string} component The scrollbar component
 * @returns {string} The default hover colour property for the given component
 */
export function hoverColourDefault(component: string): string;
/**
 * @param {string} component The scrollbar component
 * @returns {string} The default active colour property for the given component
 */
export function activeColourDefault(component: string): string;
/**
 * @param {'width' | 'height'} dimension The scrollbar dimension
 * @returns {string} The utility property for the given dimension
 */
export function dimensionUtility(dimension: "width" | "height"): string;
/**
 * @param {'width' | 'height'} dimension The scrollbar dimension
 * @returns {string} The default property for the given dimension
 */
export function dimensionDefault(dimension: "width" | "height"): string;
/**
 * @param {string} component The scrollbar component
 * @returns {string} The radius utility property for the given component
 */
export function radiusUtility(component: string): string;
/**
 * @param {string} component The scrollbar component
 * @returns {string} The default radius property for the given component
 */
export function radiusDefault(component: string): string;
