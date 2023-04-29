module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/base'
    // "plugin:vue/recommended"
    // "plugin:vue/essential",
    // "plugin:vue/strongly-recommended"
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  }
}
