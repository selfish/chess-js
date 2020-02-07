// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    FB: false,
    Konva: false,
    process: false
  },
  extends: ['eslint:recommended',],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue']
      }
    },
  },
  // add your custom rules here
  'rules': {
    "import/prefer-default-export": "off",
    "no-shadow": ["error", { "allow": ['state'] }],
    "no-unused-expressions": ["error", { "allowTernary": true }],
    "no-param-reassign": 0,


    // allow debbuging helpers during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'spaced-comment': 'off',
    'object-curly-spacing': 'off',
    'comma-dangle': 'off',

    'class-methods-use-this': 'off',
    'function-paren-newline': 'off',
    'no-trailing-spaces': 'off',
    'max-len': ['off'],

    'quotes': ["error", "single", { "avoidEscape": true }],
    'indent': ['warn', 2],

    "vue/max-attributes-per-line": ["error", {
      "singleline": 6,
      "multiline": {
        "max": 3,
        "allowFirstLine": true
      }
    }]
  }
};
