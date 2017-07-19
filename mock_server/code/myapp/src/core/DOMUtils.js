export function updateTag(tagName, keyName, keyValue, attrName, attrValue) {
  const node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"]`);
  if (node && node.getAttribute(attrName) === attrValue) return;

  // Remove and create a new tag in order to make it work with bookmarks in Safari
  if (node) {
    node.parentNode.removeChild(node);
  }
  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName);
    nextNode.setAttribute(keyName, keyValue);
    nextNode.setAttribute(attrName, attrValue);
    document.head.appendChild(nextNode);
  }
}

export function updateMeta(name, content) {
  updateTag('meta', 'name', name, 'content', content);
}

export function updateCustomMeta(property, content) {
  updateTag('meta', 'property', property, 'content', content);
}

export function updateLink(rel, href) {
  updateTag('link', 'rel', rel, 'href', href);
}


/* eslint-disable prefer-template, no-param-reassign */
export function addEventListener(node, event, listener) {
  if (!node) return;
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else if (node.attachEvent) {
    node.attachEvent('on' + event, listener);
  } else {
    node['on' + event] = listener;
  }
}

export function removeEventListener(node, event, listener) {
  if (!node) return;
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else if (node.detachEvent) {
    node.detachEvent('on' + event, listener);
  } else {
    let l = node['on' + event];
    if (l && l === listener) {
      l = null;
      delete node['on' + event];
    }
  }
}

export function addTransitionEndListener(node, listener) {
  addEventListener(node, 'transitionend', listener);
  addEventListener(node, 'webkitTransitionEnd', listener);
  addEventListener(node, 'otransitionend', listener);
}

export function removeTransitionEndListener(node, listener) {
  removeEventListener(node, 'transitionend', listener);
  removeEventListener(node, 'webkitTransitionEnd', listener);
  removeEventListener(node, 'otransitionend', listener);
}

export function raf(fn) {
  if (!window.requestAnimationFrame) {
    const prefixers = ['webkit', 'moz', 'ms', 'o'];
    for (const pr of prefixers) { // eslint-disable-line
      if (window[pr + 'RequestAnimationFrame']) {
        window.requestAnimationFrame = window[pr + 'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[pr + 'CancelRequestAnimationFrame'];
        break;
      }
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = fn => window.setTimeout(fn, 1000 / 60); // eslint-disable-line
      window.cancelRequestAnimationFrame = id => window.clearTimeout(id);
    }
  }
  window.requestAnimationFrame(fn);
}

export function windowScrollX() {
  return (window.pageXOffset !== undefined) ? window.pageXOffset :
    (document.documentElement || document.body.parentNode || document.body).scrollLeft;
}

export function windowScrollY() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset :
    (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

export function getJSLoader() {
  const doc = document;
  const head = doc.head || doc.getElementsByTagName('head')[0];
  const baseElement = head.getElementsByTagName('base')[0];

  return function innerLoad(urls, callback) {
    const url = urls.shift();
    let node = doc.createElement('script');

    node.charset = 'utf-8';

    if ('onload' in node) {
      node.onload = onload;
      node.onerror = onerror;
    } else {
      node.onreadystatechange = function onreadystatechange() {
        if (/loaded|complete/.test(node.readyState)) {
          onload();
        }
      };
    }

    function onload() {
      console.log('script loaded: ', node.src); // eslint-disable-line
      // Ensure only run once and handle memory leak in IE
      node.onload = node.onerror = node.onreadystatechange = null;
      // Remove the script to reduce memory leak
      head.removeChild(node);
      // Dereference the node
      node = null;

      if (urls.length) {
        innerLoad(urls, callback);
      } else {
        console.log('scripts load finish!'); // eslint-disable-line
        if (callback) callback();
      }
    }

    function onerror(url) { // eslint-disable-line
      try {
        throw new Error('script loading failed: url( ' + url + ' )');
      } catch (e) {
        if (callback) callback(e);
      }
    }

    node.async = 'async';
    node.src = url;

    // ref: #185 & http://dev.jquery.com/ticket/2709
    if (baseElement) {
      head.insertBefore(node, baseElement);
    } else {
      head.appendChild(node);
    }
  };
}

export function download(url) {
  // replace window.location.href with iframe
  // to prevent window from replacing with error page
  // when timeout occurs in downloading
  //
  // window.location.href = url;
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  function iframeLoad() {
    console.log('iframe onload'); // eslint-disable-line
    const win = iframe.contentWindow;
    const doc = win.document;
    if (win.location.href === url) {
      if (doc.body.childNodes.length > 0) {
        // response is error
      }
      iframe.parentNode.removeChild(iframe);
    }
  }
  if ('onload' in iframe) {
    iframe.onload = iframeLoad;
  } else if (iframe.attachEvent) {
    iframe.attachEvent('onload', iframeLoad);
  } else {
    iframe.onreadystatechange = function onreadystatechange() {
      if (iframe.readyState === 'complete') {
        iframeLoad();
      }
    };
  }
  iframe.src = '';
  document.body.appendChild(iframe);

  setTimeout(function loadUrl() { // eslint-disable-line
    iframe.contentWindow.location.href = url;
  }, 50);

  // window.open 打开的窗口在IE11上没有Referer信息
  // 下面的方法在IE上没反映
  // let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  // save_link.href = url;
  // save_link.target = '_blank';
  // save_link.download = name || '报表';

  // let evt = document.createEvent('MouseEvents');
  // eslint-disable-next-line
  // evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  // save_link.dispatchEvent(evt);
}
