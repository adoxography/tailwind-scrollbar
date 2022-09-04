/**
 * Base resets to make the plugin's utilities work
 */
export const BASE_STYLES: {
    '*': {
        'scrollbar-color': string;
        'scrollbar-width': string;
    };
};
/**
 * Utilities for initializing a custom styled scrollbar, which implicitly set
 * the scrollbar's size
 */
export const SCROLLBAR_SIZE_UTILITIES: {
    '.scrollbar': {
        'scrollbar-width': string;
        '&::-webkit-scrollbar': {
            width: string;
            height: string;
        };
        '--scrollbar-track': string;
        '--scrollbar-thumb': string;
        'scrollbar-color': string;
        overflow: string;
        '&.overflow-x-hidden': {
            'overflow-x': string;
        };
        '&.overflow-y-hidden': {
            'overflow-y': string;
        };
        '&::-webkit-scrollbar-track': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-thumb': {
            'background-color': string;
        };
    };
    '.scrollbar-thin': {
        'scrollbar-width': string;
        '&::-webkit-scrollbar': {
            width: string;
            height: string;
        };
        '--scrollbar-track': string;
        '--scrollbar-thumb': string;
        'scrollbar-color': string;
        overflow: string;
        '&.overflow-x-hidden': {
            'overflow-x': string;
        };
        '&.overflow-y-hidden': {
            'overflow-y': string;
        };
        '&::-webkit-scrollbar-track': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-thumb': {
            'background-color': string;
        };
    };
    '.scrollbar-none': {
        'scrollbar-width': string;
        '&::-webkit-scrollbar': {
            display: string;
        };
    };
};
/**
 * Collapses a nested object into a flat object of suffix/value pairs.
 *
 * @param {object} configObj The object to collapse
 * @param {Function} e       A function that escapes special characters from keys
 * @param {string} sep       The separator between key segments
 * @returns {object} A flat object that maps suffixes to their values
 */
export function buildSuffixMap(configObj: object, e: Function, sep?: string): object;
/**
 * Generates a track style, a thumb style, and a thumb hover style for a given
 * name/color pair
 *
 * @param {string} key                 The text to use in the class name
 * @param {string} value               The color to set the element to
 * @returns {object} The generated utilities
 */
export function generateColorUtilities(key: string, value: string): object;
/**
 * Generates a rounded style for a given name/value pair
 *
 * @param {string} key   The text to use in the class name
 * @param {string} value The CSS value to use as the border-radius
 * @returns {object} The generated rounded track and thumb utilities
 */
export function generateRadiusUtilities(key: string, value: string): object;
/**
 * Builds a CSS-in-JS object by passing a map of suffixes and values into a
 * function.
 *
 * @param {object} suffixMap A map of string suffixes to CSS values
 * @param {Function} func    A function that consumes class suffixes and CSS
 *                           values to produce a CSS-in-JS object
 * @returns {object} A CSS-in-JS object consisting of all of the objects
 *                   generated for each suffix/value pair
 */
export function generateUtilitiesFromSuffixes(suffixMap: object, func: Function): object;
