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
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],
    'jest/no-standalone-expect': [
      'error',
      { additionalTestBlockFunctions: ['testUnlessVersion'] }
    ],
    'jsdoc/require-jsdoc': ['error', {
      publicOnly: true,
      require: {
        ArrowFunctionExpression: true
      }
    }]
  },
  settings: {
    jsdoc: {
      mode: 'typescript'
    }
  }
};
