/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['error', {
      allow: ['info', 'error'],
    }],
    'prefer-destructuring': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 'off',
  },
  ignorePatterns: ['/node_modules/*'],
};
