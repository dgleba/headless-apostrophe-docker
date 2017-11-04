// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard', // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  ],
  plugins: [
    'html', // required to lint *.vue files
  ],
  globals: {
    describe: true,
    it: true,
    expect: true,
    Promise: true,
    apos: true,
    YT: true,
    $: true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow comma-dangle
    'comma-dangle': 0,
    // allow multi-spaces
    'no-multi-spaces': 0
  }
}
