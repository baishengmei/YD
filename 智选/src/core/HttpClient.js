import request from 'superagent';
import { getDebugger } from './utils';

const myDebug = getDebugger('HttpClient');

const dealRes = (resolve, reject) => (err, res) => {
  try {
    if (err) {
      if (err.status === 403) {
        if (res.text === 'needLogin') {
          reject('请重新登录');
        } else {
          reject(res.text || err.message);
        }
      } else if ( 'timeout' in err ){
        reject('请求超时');
      } else {
        myDebug('%cerror:', 'color: red', err);
        reject('status' in err ? err.message : '网络错误');
      }
    } else {
      let t = res.text ? JSON.parse(res.text) : res.text;
      if ( t.errcode ) {
        reject(t.errmsg);
      } else {
        resolve(t);
      }
    }
  } catch (e) {
    reject(e.message);
  }
};

let Http = {};

['get', 'post'].forEach(method => {
  Http[method] = (path, { data, timeout = 5000 }) =>
    new Promise((resolve, reject) => {
      if ( method === 'get' ) {
        path += ( path.includes('?') ? '&' : '?' ) + `t=${+new Date}`;
      }
      let req = request[method](path);
      if ( method === 'post' ) {
        req.type('form');
        data && req.send(data);
      } else {
        data && req.query(data);
      }
      req
        .accept('application/json')
        .timeout(timeout)
        .end(dealRes(resolve, reject));
    });
});

export default Http;
