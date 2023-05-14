/**
 * Imports a default export agnostic of whether CommonJS is in use or not.
 *
 * This is used to handle internal imoprts from Tailwind, since Tailwind Play
 * handles these imports differently.
 *
 * This is a hacky fix to get this working; in particular, it makes the typing
 * very loose. Converting the entire module to typescript might have the side
 * effect of making this function unnecessary.
 *
 * @param {string} path The path to import
 * @returns {unknown} The imported module
 */
export function agnosticRequire(path: string): unknown;
