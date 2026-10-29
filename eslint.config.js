const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['dist/', 'node_modules/'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.browser, module: 'readonly' }
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': 'error'
    }
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: { globals: { ...globals.node, ...globals.jest, ...globals.browser } }
  },
  {
    files: ['eslint.config.js'],
    languageOptions: { globals: globals.node }
  }
];
