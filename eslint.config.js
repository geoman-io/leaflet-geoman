const eslintPluginCypress = require('eslint-plugin-cypress');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['cypress/libs/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        L: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      cypress: eslintPluginCypress,
    },
    rules: {
      'no-underscore-dangle': 0,
      'import/prefer-default-export': 0,
      'keyword-spacing': 0,
      'no-param-reassign': 0,
      'no-restricted-syntax': 0,
      'guard-for-in': 0,
      ...eslintPluginCypress.configs.recommended.rules,
      'cypress/unsafe-to-chain-command': 0,
    },
  },
  eslintConfigPrettier,
];
