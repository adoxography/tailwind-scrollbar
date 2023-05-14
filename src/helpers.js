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
const agnosticRequire = path => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const exported = require(path);
  // eslint-disable-next-line no-underscore-dangle
  return exported.__esModule && exported.default ? exported.default : exported;
};

module.exports = {
  agnosticRequire
};
