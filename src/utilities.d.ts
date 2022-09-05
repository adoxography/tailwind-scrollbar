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
