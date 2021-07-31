module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/newline-after-import': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': 0,
    'no-console': 0,
    'import/extensions': 0,
  },
};
