/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-refresh'],
  rules: {
    'prettier/prettier': ['warn', {
      'singleQuote': true,
      'trailingComma': 'all',
      'endOfLine': 'auto',
      'printWidth': 100
    }],
    'react-refresh/only-export-components': ['warn', {
      allowConstantExport: true
    }],
    "@typescript-eslint/no-unused-vars": "warn",
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true
    }],
    'react/jsx-curly-brace-presence': ['warn', {
      props: 'never',
      children: 'never'
    }]
  },
}
