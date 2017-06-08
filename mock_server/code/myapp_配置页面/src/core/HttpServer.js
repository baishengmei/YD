/* This is used to send a http request to java service */
import qs from 'querystring';
import fetch from './fetch';
import { filterObject } from './utils';
/**
 * post: 新建
 * put: 全量更新
 * patch: 修改个别字段
 */
let methods = ['get', 'post', 'put', 'patch'];

const Http = Object.create(null);

methods.forEach((method) => {
  const canSend = ['post', 'put', 'patch'].includes(method);

  Http[method] = (path, {
    accessId,
    user = {},
    timeout = 5000,
    query,
    data,
    ...rest
  }) => {
    path = path.replace(/{([\w]+)}/g, (s0, s1) => user[s1] || rest[s1] || /* istanbul ignore next */ s0); // eslint-disable-line

    const opts = {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      timeout,
      mode: 'cors',
      cache: 'no-cache'
    };

    if ('sponsorId' in user) {
      opts.headers.sponsorIdHeader = user.sponsorId;
    }

    if (query) {
      path += `?${qs.stringify(filterObject(query, Boolean))}`; // eslint-disable-line no-param-reassign
    }

    if (canSend && data) {
      opts.body = qs.stringify(filterObject(data, Boolean));
    }

    return fetch(accessId, path, opts)
      .then(res => res.json())
      .then(({ error_code, error_message, data }) => { // eslint-disable-line no-shadow
        if (error_code !== 0) { // eslint-disable-line camelcase
          const err = new Error(error_message);
          err.type = 'backend';
          throw err;
        }
        return data;
      })
      .catch((err) => {
        console.log('url', path);
        console.log('error', err);
        const { type, name = '' } = err;
        if ((type || name).includes('timeout')) {
          const nErr = new Error(`服务器响应超时 (timeout: ${timeout}ms)`);
          nErr.statusCode = 500;
          throw nErr;
        }
        throw err;
      });
  };
});

methods = null;

Http.getStream = (path, {
  accessId,
  timeout = 5000,
}) => {
  const opts = {
    method: 'GET',
    timeout,
    mode: 'cors'
  };

  return fetch(accessId, path, opts)
    .then(res => res.text());
};

export default Http;
