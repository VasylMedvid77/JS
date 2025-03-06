module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 15,
  },
  rules: {
    "max-classes-per-file": "off",
    quotes: "off",
    "no-use-before-define": "off",
    "no-return-await": "off",
  },
};
