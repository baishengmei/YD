/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

async function run(fn, ...options) {
  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();
  console.log(`[${format(start)}] Starting '${task.name}${options ? `(${options})` : ''}'...`);
  await task(...options);
  const end = new Date();
  const time = end.getTime() - start.getTime();
  console.log(`[${format(end)}] Finished '${task.name}' after ${time} ms`);
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename]; // eslint-disable-line no-underscore-dangle
  const module = require(`./${process.argv[2]}.js`).default;
  run(module, ...process.argv.slice(3)).catch(err => { console.error(err.stack); process.exit(1); });
}

export default run;
