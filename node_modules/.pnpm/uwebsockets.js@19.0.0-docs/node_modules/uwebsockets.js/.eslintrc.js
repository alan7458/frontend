module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: { es6: true },
  root: true,
  env: {
    node: true,
  },
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
};
