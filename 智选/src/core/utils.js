export const formatInterger = n => {
  n += '';
  let len = n.length;
  let dotIndex = n.indexOf('.');
  let r = dotIndex === -1 ? '' : n.substr(dotIndex);
  let i = dotIndex === -1 ? len - 1 : dotIndex - 1;

  for(let j = 1; i > -1; i--, j++) {
    r = n[i] + r;
    if ( j % 3 === 0 ) {
      r = ',' + r;
    }
  }

  return r[0] === ',' ?
    r.slice(1) :
    r;
};

export const emptyFunction = () => {};

export const getDebugger = name => {

  let debugConsole = emptyFunction;

  if ( __DEV__ ) {
    let debug = require('debug');
    debug.enable(name);
    debugConsole = debug(name);
  }

  return debugConsole;
}