module.exports = {
  settings: {
    'import/resolver': {
      // alias supports modules resolver
      // node: true,
      // 'alias': [
      //   ['material-ui', 'material-ui-ie10']
      // ]
    }
  },
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'babel-eslint',
  parseOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      impliedStrict: true
    }
  },
  globals: {
    __DEV__: true
  },
  extends: [
    'airbnb',
    'plugin:css-modules/recommended'
  ],
  plugins: [
    'import',
    'css-modules'
  ],
  rules: {
    'comma-dangle': [2, 'only-multiline'], // 单行不必须逗号
    'semi': [1, 'always'],
    'linebreak-style': 0, // 换行符 unix/windows
    'consistent-return': 0,
    'no-use-before-define': 0,
    'no-multi-assign': 0,
    'yoda': 0, // 'abc' === a or a === 'abc' 的顺序
    'global-require': 1,
    'wrap-iife': [2, 'inside'],
    'jsx-quotes': [2, 'prefer-single'],
    'generator-star-spacing': 0, // fix for https://github.com/eslint/eslint/issues/6274
    'react/jsx-filename-extension': [2, { extensions: ['.js'] }],
    'react/forbid-prop-types': 0,
    'react/sort-comp': 1,
    'react/no-string-refs': 0,
    'react/prefer-stateless-function': 0,
    'jsx-a11y/no-static-element-interactions': 0
  },
};
