/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@quantumqa/eslint-config/base'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-constant-condition': ['error', { checkLoops: false }],
  },
};
