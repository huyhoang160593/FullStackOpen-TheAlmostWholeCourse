/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
  },
  ignorePatterns: ['/node_modules/*'],
};
