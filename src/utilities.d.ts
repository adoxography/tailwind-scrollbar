/**
 * Base resets to make the plugin's utilities work
 */
export const BASE_STYLES: {
    '*': {
        'scrollbar-color': string;
        'scrollbar-width': string;
    };
};
export const COMPONENTS: string[];
/**
 * Utilities for initializing a custom styled scrollbar, which implicitly set
 * the scrollbar's size
 */
export const SCROLLBAR_SIZE_UTILITIES: {
    '.scrollbar': any;
    '.scrollbar-thin': any;
    '.scrollbar-none': {
        'scrollbar-width': string;
        '&::-webkit-scrollbar': {
            display: string;
        };
    };
};
/**
 * Adds scrollbar-COMPONENT-COLOR utilities for every scrollbar component.
 */
export function addColorUtilities({ matchUtilities, theme }: {
    matchUtilities: any;
    theme: any;
}): void;
/**
 * Adds scrollbar-COMPONENT-rounded-VALUE utilities for every scrollbar
 * component.
 */
export function addRoundedUtilities({ theme, matchUtilities }: {
    theme: any;
    matchUtilities: any;
}): void;
/**
 * Adds scrollbar-w-* and scrollbar-h-* utilities
 */
export function addSizeUtilities({ matchUtilities, theme }: {
    matchUtilities: any;
    theme: any;
}): void;
