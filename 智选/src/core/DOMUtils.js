export function addEventListener(node, event, listener) {
  if(!node) return;
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else if (node.attachEvent) {
    node.attachEvent('on' + event, listener);
  } else {
    node['on' + event] = listener;
  }
}

export function removeEventListener(node, event, listener) {
  if(!node)return;
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else if ( node.detachEvent ) {
    node.detachEvent('on' + event, listener);
  } else {
    var l = node['on' + event];
    if ( l && l === listener ) {
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

export function windowScrollX() {
  return (window.pageXOffset !== undefined) ? window.pageXOffset :
    (document.documentElement || document.body.parentNode || document.body).scrollLeft;
}

export function windowScrollY() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset :
    (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

export function download(url) {
  // replace window.location.href with iframe
  // to prevent window from replacing with error page
  // when timeout occurs in downloading
  //
  // window.location.href = url;
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  function iframeLoad() {
    console.log('iframe onload');
    var win = iframe.contentWindow;
    var doc = win.document;
    if ( win.location.href === url ) {
      if ( doc.body.childNodes.length > 0 ) {
        // response is error
      }
      iframe.parentNode.removeChild(iframe);
    }
  }
  if ( 'onload' in iframe ) {
    iframe.onload = iframeLoad;
  } else if ( iframe.attachEvent ) {
    iframe.attachEvent('onload', iframeLoad);
  } else {
    iframe.onreadystatechange = function() {
      if ( iframe.readyState === 'complete' ) {
        iframeLoad();
      }
    };
  }
  iframe.src = '';
  document.body.appendChild(iframe);

  setTimeout(function() {
    var win = iframe.contentWindow;
    win.location.href = url;
  }, 50);

  //window.open 打开的窗口在IE11上没有Referer信息
  //下面的方法在IE上没反映
  // let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  // save_link.href = url;
  // save_link.target = "_blank";
  // save_link.download = name || '报表';

  // let evt = document.createEvent('MouseEvents');
  // evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  // save_link.dispatchEvent(evt);
}
