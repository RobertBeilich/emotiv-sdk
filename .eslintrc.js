module.exports = {
  root: true,
  env: {
    es2017: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["import"],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_", ignoreRestSiblings: true }],
    eqeqeq: "error",
    curly: ["error", "multi-line"],
    "no-duplicate-imports": "error",
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: ["builtin", "external", "internal", "parent", ["sibling", "index"]],
      },
    ],
    "require-await": "error",
    "no-console": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        printWidth: 120,
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
      rules: {
        curly: ["error", "multi-line"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", ignoreRestSiblings: true }],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "variable",
            format: ["strictCamelCase", "UPPER_CASE", "StrictPascalCase"],
            leadingUnderscore: "allow",
          },
          {
            selector: "function",
            format: ["strictCamelCase"],
          },
          {
            selector: "enumMember",
            format: ["StrictPascalCase"],
          },
          {
            selector: "typeLike",
            format: ["StrictPascalCase"],
          },
        ],
        "@typescript-eslint/array-type": ["error", { default: "array" }],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
};
