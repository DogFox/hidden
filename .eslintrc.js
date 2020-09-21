module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/typescript/recommended'],
  plugins: ['vuetify'],
  rules: {
    'object-shorthand': 'error',
    'curly': 'error',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'semi': [2, 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-empty': ['error'],
    'vue/attribute-hyphenation': ['warn', 'always', {
      'ignore': ['parentID', 'ownerID'],
    }],
    'vue/max-attributes-per-line': ['warn', {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],
    'vue/order-in-components': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vuetify/no-deprecated-classes': 'error',
  },
  "overrides": [
    {
      "files": ["*.vue", '*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    'extraFileExtensions': ['.vue'],
  },
};
