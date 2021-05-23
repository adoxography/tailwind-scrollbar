module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    'jest/globals': true
  },
  plugins: [
    'jest'
  ],
  extends: [
    'airbnb-base',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never']
  }
};
