import qs from 'query-string';
import fetch from './fetch'
import { filterObject } from './utils';;

const Http = Object.create(null);

['get', 'post'].forEach((method) => {
  Http[method] = (path, { data, query, timeout = 5000 } = {}) => {
    let url = path;

    const opts = {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        credentials: 'include'
      },
      timeout,
      mode: 'same-origin',
      cache: 'no-cache'
    };

    if (query) {
      url += `${url.includes('?') ? '&' : '?'}${qs.stringify(filterObject(query, Boolean))}`;
    }

    if (method === 'post' && data) {
      opts.body = qs.stringify(filterObject(data, Boolean));
    }

    return fetch(url, opts)
      .then(res => res.json())
      .then(({ errcode = 0, errmsg, data }) => { // eslint-disable-line no-shadow
        if (errcode !== 0) {
          throw new Error(errmsg);
        }
        return data;
      });
  };
});

export default Http;
