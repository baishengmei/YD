/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import run from './run';
global.WATCH = true;

// Client-side bundle configuration
const webpackConfig = require('./webpack.config').default;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(require('./build'));
  await run(require('./serve'));

  const bundler = webpack(webpackConfig);
  const devMiddleware = webpackMiddleware(bundler, {
    // IMPORTANT: dev middleware can't access config, so we should
    // provide publicPath by ourselves
    publicPath: webpackConfig[0].output.publicPath,

    // Pretty colored output
    stats: webpackConfig[0].stats,

    // For other settings see
    // http://webpack.github.io/docs/webpack-dev-middleware.html
  });
  const hotMiddlewares = bundler
    .compilers
    .filter(compiler => compiler.options.target !== 'node')
    .map(compiler => webpackHotMiddleware(compiler));

  browserSync({
    proxy: {

      target: 'localhost:5000',

      middleware: [
        devMiddleware,
        // webpack-dev-middleware asks
        // hot middlewares' bundler should be the same as dev middlewares' bundler
        // but webpack-middleware does not
        ...hotMiddlewares
      ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      // 'build/public/**/*.css',
      // 'build/public/**/*.html',
    ],
  });
}

export default start;
