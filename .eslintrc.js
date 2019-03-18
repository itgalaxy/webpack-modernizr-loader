"use strict";

module.exports = {
  parserOptions: {
    sourceType: "script"
  },
  extends: [
    "plugin:itgalaxy/node",
    "plugin:itgalaxy/esnext",
    "plugin:itgalaxy/jest",
    "plugin:itgalaxy/markdown"
  ],
  overrides: [
    {
      files: ["**/__tests__/**/*.js", "**/__mocks__/**/*.js"],
      parserOptions: {
        sourceType: "module"
      },
      rules: {
        "max-classes-per-file": "off",
        "node/no-unsupported-features/es-builtins": "off",
        "node/no-unsupported-features/es-syntax": "off",
        "node/no-unsupported-features/node-builtins": "off"
      }
    },
    {
      files: ["**/*.md"],
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      },
      rules: {
        strict: "off",
        "no-undef": "off",
        "no-unused-vars": "off",
        "no-process-env": "off",
        "no-process-exit": "off",
        "no-console": "off",
        "import/no-unresolved": "off",
        "node/no-unpublished-require": "off",
        "id-match": "off"
      }
    }
  ],
  root: true
};
