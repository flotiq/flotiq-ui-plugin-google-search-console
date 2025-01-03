module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "linebreak-style": 0,

    /* This rule will warn when it encounters a reference to an identifier that has not yet been declared. */
    "no-use-before-define": [
      "error",
      {
        variables: false,
      },
    ],

    /* Enforce require() on the top-level module scope */
    "global-require": 0,

    "max-len": [
      "error",
      {
        code: 120,
      },
    ],

    "guard-for-in": 0,
    "no-underscore-dangle": 0,
    "import/prefer-default-export": 0,
    "import/no-anonymous-default-export": 0,
    "import/no-extraneous-dependencies": 0,
  },
};
