module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'eslint-config-prettier',
    'react-app',
    'react-app/jest',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ]
  },
  ignorePatterns: [
    ".eslintrc.js"
],
};
