import sortPropertiesRule from './rules/sort-properties.js';

const plugin = {
  meta: {
    name: '@repo/eslint-plugin-vanilla-extract',
    version: '0.0.1',
  },
  rules: {
    'sort-properties': sortPropertiesRule,
  },
};

plugin.configs = {
  recommended: [
    {
      files: ['**/*.css.ts'],
      plugins: {
        'vanilla-extract': plugin,
      },
      rules: {
        'vanilla-extract/sort-properties': 'error',
      },
    },
  ],
};

export default plugin;
