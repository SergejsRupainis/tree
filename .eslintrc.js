module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  settings: {
    'import/core-modules': ['prop-types'],
  },
  rules: {
    'class-methods-use-this': 0,
  },
};
