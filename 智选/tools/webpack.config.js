/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import SmartBannerPlugin from 'smart-banner-webpack-plugin';

// deep copy
import merge from 'lodash.merge';
import pkg from '../package.json';
import chalk from 'chalk';

const DEBUG = !process.argv.includes('--release');
console.log('debug', DEBUG)
const VERBOSE = process.argv.includes('--verbose');
const WATCH = global.WATCH === undefined ? false : global.WATCH;

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
  // fix the superagent bug
  // see: https://github.com/visionmedia/superagent/issues/672
  'global.GENTLY': "false"
};

const getBannerComment = () => `[filename] v${pkg.version}\n\nAuthor: nilzh\nDate: ${new Date().toLocaleString()}\n`;

//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    alias: {}
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: DEBUG,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0'
          ],
          plugins: [
            'transform-runtime',
            // 'transform-object-rest-spread', //exist in babel-preset-stage-2
            'transform-decorators-legacy',
            ...DEBUG ? [] : [
              // 'transform-react-remove-prop-types', // remove react propTypes, be careful
              'transform-react-constant-elements',
              'transform-react-inline-elements'
            ]
          ]
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.txt$/,
        loader: 'raw-loader'
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !DEBUG,
          })}`,
          'postcss-loader?pack=modules',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            minimize: !DEBUG
          })}`,
          'postcss-loader?pack=scss'
        ]
      }
    ],
  },

  postcss: function (bundler) {
    return {
      /*
      defaults: [
        require('postcss-nested')(),
        require('cssnext')(),
        require('autoprefixer-core')(AUTOPREFIXER_BROWSERS)
      ]*/
      scss: [
        require('postcss-import')({ addDependencyTo: bundler }),
        require('precss')(),
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
      ],
      modules: [
        // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
        // https://github.com/postcss/postcss-import
        require('postcss-import')({ addDependencyTo: bundler }),
        // scss variable declaration, e.g. $color: red;
        // https://github.com/jonathantneal/postcss-advanced-variables
        require('postcss-advanced-variables'),
        // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
        // https://github.com/postcss/postcss-custom-properties
        require('postcss-custom-properties')(),
        // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
        // https://github.com/postcss/postcss-custom-media
        require('postcss-custom-media')(),
        // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
        // https://github.com/postcss/postcss-media-minmax
        require('postcss-media-minmax')(),
        // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
        // https://github.com/postcss/postcss-custom-selectors
        require('postcss-custom-selectors')(),
        // Allows you to nest one style rule inside another
        // https://github.com/jonathantneal/postcss-nesting
        require('postcss-nesting')(),
        // W3C color() function, e.g. div { background: color(red alpha(90%)); }
        // https://github.com/postcss/postcss-color-function
        require('postcss-color-function')(),
        // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
        // https://github.com/iamvdo/pleeease-filters
        require('pleeease-filters')(),
        // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
        // https://github.com/postcss/postcss-selector-matches
        require('postcss-selector-matches')(),
        // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
        // https://github.com/postcss/postcss-selector-not
        require('postcss-selector-not')(),
        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ]
    };
  }
};

//
// Configuration for the client-side bundle (app.js)
// 可以提取的包:normalize.css, fast-click
// -----------------------------------------------------------------------------

const appConfig = merge({}, config, {
  entry: {
    app: [
      ...(WATCH ? ['webpack-hot-middleware/client'] : []),
      './src/appEntry.js',
    ],
    login: [
      ...(WATCH ? ['webpack-hot-middleware/client'] : []),
      './src/loginEntry.js',
    ]
  },
  target: 'web',
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: DEBUG ? '[name].js?[chunkhash:8]' : '[name].[chunkhash:8].js'
  },
  resolve: {
    alias: {
      // not recommended
      'babel-polyfill': 'babel-polyfill/dist/polyfill.min.js',
      //'react': deps['react']//因为react/lib依赖react，所以不能单独优化react
    }
  },

  // react-tap-event-plugin will inject tap event
  // into react which is not the same react invoked
  // from external, therefore tap-event won't work
  // as expected
  // externals: [
  //   {
  //     'react': 'React',
  //     'react-dom': 'ReactDOM'
  //   }
  // ],

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      ...GLOBALS,
      'process.env.BROWSER': true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['app', 'login'],
      filename: DEBUG ? 'common.js?[hash:8]' : 'common.[hash:8].js'
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build/public'),
      filename: 'hash.js',
      processOutput: o => {
        let r = {};
        for(let entry in o) {
          for(let t in o[entry]) {
            r[t] || (r[t] = {});
            r[t][entry] = o[entry][t];
          }
        }
        console.log(chalk.green(`${' '.repeat(11)}build/public/hash.js created\n`));
        return `module.exports = ${JSON.stringify(r, null, '  ')}`;
      }
    }),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // do not support IE6-8 quirks
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []),
    new SmartBannerPlugin(getBannerComment(),
       { raw: false, entryOnly: true })
  ]
});

appConfig.module.loaders
  .filter(x => WATCH && x.loader === 'babel-loader')
  .forEach(x => (x.query = {
    ...x.query,

    // Wraps all React components into arbitrary transforms
    // https://github.com/gaearon/babel-plugin-react-transform
    plugins: [
      ...(x.query ? x.query.plugins : []),
      ['react-transform', {
        transforms: [
          {
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module'],
          }, {
            transform: 'react-transform-catch-errors',
            imports: ['react', 'redbox-react'],
          },
        ],
      },
      ],
    ],
  }));

//material-ui及其他组件对react/lib下的库
//有很多依赖，单独抽离react.js并不能真正的抽离出react
//必须得用webpack CommonsChunkPlugin
// const reactConfig = merge({}, config, {
//   entry: './src/react-with-tap.js',
//   output: {
//     path: './build/public',
//     filename: 'react.min.js',
//     libraryTarget: 'var',
//     library: 'React'
//   },
//   plugins: [
//     new webpack.SmartBannerPlugin(`${getBannerComment('react.js')}`,
//        { raw: false, entryOnly: true })
//   ]
// });

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = merge({}, config, {
  entry: './src/server.js',
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: [
    "./public/hash", // app.js, login.js hash 值
    {
      "react": {
        commonjs2: 'react/dist/react.min.js'
      }
    },
    // 服务器 bundle 不打包 node_modules 下的包
    // 如果打进来，例如 express 和 superagent
    // 等包会出问题
    //
    // http://webpack.github.io/docs/configuration.html#externals
    function filter(context, request, cb) {
      const isExternal =
        request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) // 不匹配以.开始的相对路径
        || request.match(/\.\/config$/i)
        // && !request.match(/^react-router/)
        // && !context.match(/[\\/]react-router/);
      // console.log(isExternal, request)
      if ( request.includes('config') ) {
        let flag = Boolean(isExternal)
        // server.js 引用的config.js
        cb( null, flag ? './config' : flag);
        return;
      }
      cb(null, Boolean(isExternal));
    },
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      ...GLOBALS,
      // bug fix with webpack in superagent
      // see: https://github.com/webpack/webpack/issues/196
      'process.env.BROWSER': false
    }),
    new SmartBannerPlugin('require("source-map-support").install();',
       { raw: true, entryOnly: false }),
    // // uglify 目前不能解析 es6的一些语法
    // // 故而去掉 uglify
    // ...( DEBUG ? [] : [
    //   new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //       warnings: false,
    //     },
    //   })
    // ]),
    new SmartBannerPlugin(getBannerComment(),
       { raw: false, entryOnly: true })
  ]
});

serverConfig.module.loaders
  .filter(x => x.loader === 'babel-loader')
  .forEach(x => {
    x.query = {
      ...x.query,
      presets: [
        // uglify 无法解析 es6 的某些语法，
        // 所以 es2015-node 和 uglify
        // 只能二选一。
        // 又或者保留 uglify，将此处改为 es2015
        'react',
        'node5',
        'stage-0'
      ]
    }
  });

// const deps = {
//   'react': 'react/dist/react.min.js',
//   // react 15.x 将 react-dom 和 react-dom/server 从 react 中分离出来了
//   // 'react-dom/server': 'react-dom/dist/react-dom-server.min.js',
//   // 'react-dom': 'react-dom/dist/react-dom.min.js'
// };

//必须放到externals的最前面，否则其中的 function
//对react、react-dom/server 返回 false，就不会有replace的行为
// serverConfig.externals.unshift(reactExternalDeps);

export default [appConfig, serverConfig];

// console.log('\nappconfig\n', appConfig.module.loaders[0], '\nplugins\n', appConfig.plugins, '\nserverconfig\n', serverConfig.module.loaders[0], '\nplugins\n', serverConfig.plugins)
