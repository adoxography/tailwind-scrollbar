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
        '--scrollbar-corner': string;
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
        '&::-webkit-scrollbar-corner': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-track:hover': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-thumb:hover': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-corner:hover': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-track:active': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-thumb:active': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-corner:active': {
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
        '--scrollbar-corner': string;
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
        '&::-webkit-scrollbar-corner': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-track:hover': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-thumb:hover': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-corner:hover': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-track:active': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-thumb:active': {
            'background-color': string;
        };
        '&::-webkit-scrollbar-corner:active': {
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
