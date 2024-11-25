/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    './.eslintrc-auto-import.json',
    '@vue/prettier'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'vue/comment-directive': 'off',
    'vue/multi-word-component-names': 'off',
    'nonblock-statement-body-position': ['error', 'beside'],
    curly: ['error', 'all'],
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'space-infix-ops': ['error'],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'eol-last': ['error', 'always'],
    quotes: ['error', 'single'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-prototype-builtins': ['error'],
    complexity: ['error', 15],
    'max-params': ['error', 6],
    'require-yield': ['error'],
    'no-dupe-class-members': ['error'],
    eqeqeq: ['error', 'always'],
    'no-fallthrough': 'error',
    'default-case': ['error', { commentPattern: '^skip\\sdefault' }],
    'max-depth': ['error', 4],
    'no-else-return': ['error', { allowElseIf: false }],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-empty-object-type': 'error',
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/prefer-namespace-keyword': 'error'
  }
}
