module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers'],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-console': 'warn',
        'import-helpers/order-imports': [
          'warn',
          {
            newlinesBetween: 'never',
            groups: ['module', ['parent', 'sibling', 'index']],
            alphabetize: { order: 'asc', ignoreCase: true },
          },
        ],
      },
    },
  ],
};
