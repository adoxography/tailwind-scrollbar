module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    'jest/globals': true
  },
  plugins: [
    'jest',
    'jsdoc'
  ],
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'jsdoc/require-jsdoc': ['error', {
      publicOnly: true,
      require: {
        ArrowFunctionExpression: true
      }
    }]
  }
};
