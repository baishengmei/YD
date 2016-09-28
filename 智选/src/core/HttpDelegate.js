/* This is used to send a http request to java service */
import request from 'superagent';
import logResponseTime from '../middlewares/responseTimeLog';
import { getDebugger } from './utils';

const myDebug = getDebugger('HttpDelegate');

const reslogger = logResponseTime('java');

const addUserToken = user => `sponsorId=${user.sponsorId}`;

/**
 * post: 新建
 * put: 全量更新
 * patch: 修改个别字段
 */
let methods = ['get', 'post', 'put', 'patch'];


/**
 * java response 格式说明
 * {
 *   error_code: 0,
 *   error_message: "",
 *   data: {}
 * }
 */
const dealRes = (resolve, reject) => (err, res) => {
  try {
    if (err) {
      myDebug('\n' + err.stack);
      reject(err);
      return;
    }
    let ret;
    if ( res.text ) {
      ret = JSON.parse(res.text);
      if ( ret.error_code === 0 ) {
        resolve(ret.data);
      } else {
        let newErr = new Error(ret.error_message);
        newErr.response = res;
        newErr.status = res.statusCode || res.status;
        reject(newErr);
      }
    } else {
      resolve(res);
    }
  } catch (e) {
    reject(e);
  }
};

let Http = {};

methods.forEach(method => {
  Http[method] = (path, {
    accessId,
    user = {},
    timeout = 5000,
    query,
    data,
    ...rest
  }) =>
  new Promise((resolve, reject) => {
    path = path.replace(/{([\w]+)}/g, (s0, s1) => user[s1] || rest[s1] || s0);
    let canSend = ['post', 'put'].includes(method);
    let req = request[method](path);

    if ( !canSend ) {
      query && req.query(query);
    } else if ( data ) {
      req.send(data);
    }

    // login request do not contain sponsorId
    'sponsorId' in user && req.set('sponsorId', user.sponsorId)

    req
      .use(reslogger(accessId))
      .query({t: +new Date})
      .accept('application/json')
      .timeout(timeout)
      .end(dealRes(resolve, reject))
  });
});

methods = null;

Http.getOctetStream = (path, {
    accessId,
    user = {},
    timeout = 5000,
  }) =>
  new Promise((resolve, reject) => {
    request
      .get(path)
      .use(reslogger(accessId))
      .timeout(timeout)
      ////////////////////////////////////////////////////////////////
      // superagent 只会自动转换 5 种 content-type 的 response 数据流        //
      // 包括 text, json, image, urlencoded, multiform                     //
      // 其中，multiform 的 parser 是调用 formidable.IncomingForm 的 parser //
      // 这里 reg.163.com 的服务返回的 content-type                         //
      // 是 application/octet-stream ( 返回这种数据类型，本身就很奇怪 )      //
      // 所以需要指定一个 parser 才可以, 如果不指定，会返回 undefined         //
      ////////////////////////////////////////////////////////////////
      //.parse(request.parse.text)

      /////////////////////////////////////////////
      // buffer 为 true，默认使用 parse.text 作为 parser                    //
      // 对于 octet-stream 这种流，需要一点时间接收流数据，                   //
      // 因此 buffer 需要设为 true，否则会立即返回 response.text 的结果       //
      // 而此时流数据还未到达，所以为 ''                                     //
      /////////////////////////////////////////////
      .buffer(true)
      .end((err, res) => {
        try {
          if ( err ) {
            myDebug('%cerror', 'color: red', err);
            reject(err);
          } else {
            resolve(res.res.text);
          }
        } catch (e) {
          reject(e);
        }
      })
  });

export {
  Http as default,
  addUserToken
};
