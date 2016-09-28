/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import webpack from 'webpack';
import webpackConfig from './webpack.config';
import chalk from 'chalk';

/**
 * Bundles JavaScript, CSS and images into one or more packages
 * ready to be used in a browser.
 */
function bundleSingle (...args) {
  let entry = args.filter(p => ['app', 'server'].includes(p));
  if ( entry.length === 0 ) {
    console.error(chalk.red(`invalid bundleSingle options: ${args}`));
    return;
  }

  entry = entry[0];

  return new Promise((resolve, reject) => {
    let configIndex = {'app': 0, 'server': 1}[entry];
    let cfg = webpackConfig[configIndex];
    const bundler = webpack(cfg);

    function onComplete(err, stats) {
      if (err) {
        return reject(err);
      }

      //stats.toJson()

      console.log(stats.toString(webpackConfig[configIndex].stats));

      return resolve();
    }

    if (global.WATCH) {
      bundler.watch(200, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });
}

export default bundleSingle;
