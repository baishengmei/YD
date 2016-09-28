/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import replace from 'replace';
import Promise from 'bluebird';
import watch from './lib/watch';
import CleanCSS from 'clean-css';
import chalk from 'chalk';
var babel = require('babel-core');
const ncp = Promise.promisify(require('ncp'));
const fs = Promise.promisifyAll(require('fs'));

const pkgTarget = 'build/package.json';
const cfgTarget = 'build/config.js';
const cssTarget = 'build/public/normalize.css';

/**
 * Copies static files such as package.json, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  try {
    assertDir('build');

    await Promise.all([
      copyPackage(),
      copyConfig(),
      // copyCSS() // replace local normalize.css with cdn resources, detail in components/Html.js
    ]);

    console.log(chalk.green(`${' '.repeat(11)}${pkgTarget} copied`));
    console.log(chalk.green(`${' '.repeat(11)}${cfgTarget} copied`));
    console.log(chalk.green(`${' '.repeat(11)}${cssTarget} copied and minified`));

    if (global.WATCH) {
      const watcher = await watch(['src/config.js']);
      watcher.on('changed', async (file) => {
        // const relPath = file.substr(path.join(__dirname, '../src/').length);
        await copyConfig();
        console.log(chalk.green(`${' '.repeat(11)}src/config.js changed and copied`));
      });
    }
  } catch (e) {
    console.error(chalk.red(`error occurs in copy task : \n${e}`));
  }
}

function assertDir(pathDir) {
  var dirArr = pathDir.split('/');
  var dir = '';
  while(dirArr.length > 0) {
    dir = dir + ( dir.length > 0 ? '/' : '' ) + dirArr.shift();
    try {
      fs.statSync(dir);
    } catch(e) {
      if ( e.code === 'ENOENT' ) {
        fs.mkdirSync(dir);
      } else {
        throw e;
      }
    }
  };
}

function assertNoFile(filepath) {
  try {
    fs.statSync(filepath);
    fs.unlinkSync(filepath);
  } catch(e) {}
}

function copyPackage() {
  assertNoFile(pkgTarget);
  return ncp('package.json', pkgTarget)
    .then(() =>
      replace({
        regex: '"start".*',
        replacement: '"start": "env NODE_ENV=production node server.js"',
        paths: [pkgTarget],
        recursive: false,
        silent: true,
      })
    );
}

function copyCSS() {
  assertDir('build/public');
  assertNoFile(cssTarget);

  ncp('node_modules/normalize.css/normalize.css', cssTarget)
  .then( () => fs.readFileAsync(cssTarget, { encoding: 'utf-8'}) )
  .then( css => new CleanCSS().minify(css).styles )
  .then( minifiedCss => fs.writeFileAsync(cssTarget, minifiedCss) );
}

function copyConfig() {
  // fs.createWriteStream 会直接覆盖源文件内容
  // assertNoFile(cfgTarget);
  return Promise.promisify(babel.transformFile)('src/config.js', {
    plugins: [
      'transform-es2015-computed-properties'
    ]
  })
  .then( result => result.code )
  .then( code => {
    const wstream = fs.createWriteStream(cfgTarget);
    return wstream.endAsync(code);
  })
  .error( err => {
    console.error(chalk.red(`error occurs when transform and copy src/config.js:\n${err}`));
  })
}

export default copy;
