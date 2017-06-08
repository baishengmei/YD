const semver = require('semver');

if (!semver.satisfies(process.versions.node, '5.10.0 - 7')) {
  console.error('node versions does not match. 5.10.0 - 7 required'); // eslint-disable-line
  process.exit(1);
}

/* eslint-disable no-proto */
if (!global._babelPolyfill) {
  require('babel-polyfill'); // eslint-disable-line
}

const jsdom = require('jsdom').jsdom;
const sinon = require('sinon');

process.env.NODE_ENV = 'test';
global.__DEV__ = true;

// ui components
global.document = jsdom('');
const t = global.window = document.defaultView;
Object.keys(t).forEach((prop) => {
  if (typeof global[prop] === 'undefined') {
    global[prop] = t[prop];
  }
});

// window.navigator
global.navigator = {
  userAgent: 'node.js'
};

// global stub utils/getDebugger to disable console.log
delete require.cache[require.resolve('../src/core/utils')];
const utils = require('../src/core/utils');

sinon.stub(utils, 'getDebugger', () => noop);

function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.md'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;
