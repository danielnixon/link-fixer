module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  extends: [
    "typed-fp",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended"
  ],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    browser: "readonly",
    chrome: "readonly"
  },
  plugins: ["sonarjs", "functional", "@typescript-eslint", "prettier", "total-functions"],
  rules: {}
};
