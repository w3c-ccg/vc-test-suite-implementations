module.exports = {
  root: true,
  extends: [
    'eslint-config-digitalbazaar',
    'eslint-config-digitalbazaar/jsdoc',
    'digitalbazaar/module',
  ],
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['dist/'],
  rules: {
    'jsdoc/check-examples': 'off'
  }
};
