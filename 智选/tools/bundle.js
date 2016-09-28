/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import chalk from 'chalk';

/**
 * Bundles JavaScript, CSS and images into one or more packages
 * ready to be used in a browser.
 */
function bundle() {
  console.log('watch', global.WATCH);
  return new Promise((resolve, reject) => {
    const bundlers = webpackConfig.map(config => {
      return webpack(config)
    });
    let bundlerRunCount = 0;

    function getHandler(index) {
      return function onComplete(err, stats) {
        if (err) {
          return reject(err);
        }

        function log(o, n) {
          for (let k in o) {
            // modules 太大，会刷屏
            k !== 'modules' && console.info(' '.repeat(n * 2), k, o[k]);
          }
        }

        var statsObj = stats.toJson();

        // log(statsObj, 1);

        console.log(stats.toString(webpackConfig[0].stats));

        // replace with assets-webpack-plugin
        // if ( index === 0 ) {//appConfig
        //   let hashObj = {
        //     js: {},
        //     css: {}
        //   };
        //   let entries = statsObj.assetsByChunkName;
        //   for(let k in entries) {
        //     ( Object.prototype.toString.call(entries[k]) === "[object Array]" ? entries[k] : [ entries[k] ] ).forEach(filename => {
        //       let parts = filename.split('.');
        //       hashObj[parts[2]][k] = parts[1];
        //     });
        //   }
        //   saveHash(hashObj);
        // }


        if (++bundlerRunCount === webpackConfig.length) {
          return resolve();
        }
      };
    }

    bundlers.forEach((bundler, index) => bundler.run(getHandler(index)));
  });
}

function saveHash(hashObj) {
  var filename = 'build/public/hash.js';
  fs.writeFileSync(filename, `module.exports = ${JSON.stringify(hashObj, null, '  ')}`);
  console.log(chalk.green(`${' '.repeat(11)}${filename} created`));
}

export default bundle;
