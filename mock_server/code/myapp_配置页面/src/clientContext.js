const context = {
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(style => style._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
  setTitle: (value) => {
    document.title = value;
  },
  setMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    const elements = document.getElementsByTagName('meta');
    Array.from(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  },
  getUA: () => navigator.userAgent,
  getUsername: () => {
    const cookies = document.cookie.split(';');
    let username = '';
    cookies.forEach((s) => {
      const t = s.replace(/^\s+|\s+$/g, '').split('=');
      if (t[0] === 'YOUDAO_YEX_EMAIL') {
        username = t[1];
      }
    });
    return username;
  }
};

export default context;
