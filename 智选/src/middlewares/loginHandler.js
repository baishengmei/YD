import router from '../loginRoute';;
import serverRender from './serverRender';
import { md5, getip } from '../core/serverUtils';
import ensureReferer from '../core/refererMatch';
import request from '../core/HttpDelegate';
import { api } from '../config';
import checkNTESLogin from '../core/NTESLogin';

const sendResponse = (res, code = 1, str) => res.status(200).send({
  errcode: code,
  errmsg: str
});

// 获取表单中的 username，去掉 @ 部分
const getUsername = req => {
  let username = req.body && req.body.username || '';
  if ( username ) {
    username = username.replace(/^\s+|\s+$/g, '');
    username.includes('@') && (username = username.split('@')[0]);
  }
  return username;
};

// 去 java service 获取用户 id, token 信息
const getUserInfo = async (accessId, email) => {
  let url = `${api['login']}?username=${email}`;
  let obj;
  try {
    obj = await request.get(url, { accessId });
  } catch(err) {
    obj = {
      status: 1,
      error: err
    };
  }

  return obj;
};

// 登录处理逻辑：获取登录页面和登录认证
export default async (req, res, next) => {

  let accessId = req._accessId;
  let method = req.method.toUpperCase();

  // 显示登录页面
  if ('GET' === method) {

    await serverRender(router, false)(req, res, next);

  } else if ('POST' === method) {// 登录认证

    if ( !req.sessionID || !ensureReferer(req) ) {
      sendResponse(res, 403, '非法请求');
      return;
    }

    let username = getUsername(req);
    let pw = req.body && req.body.pw || '';

    if ( !username || !pw ) {
      sendResponse(res, 1, !username ? '用户名不能为空' : '密码不能为空');
      return;
    }

    let ret = await checkNTESLogin(accessId, username, md5(pw), getip(req));

    if ( ret.status !== 'ok' ) {
      next(ret.error);
      return;
    }

    let email = `${username}@163.com`;

    ret = await getUserInfo(accessId, email);

    if (0 === ret.status) {
      req.session.user = {
        id: ret.dspId,
        username: ret.username,
        email: email,
        token: ret.token
      };

      // 设置用户名
      res.setHeader('set-cookie', `YOUDAO_YEX_EMAIL=${email}; Path=/;`);

      sendResponse(res, 0, '');
    } else if ( ret.error ) {
        next(ret.error);
    } else {
      sendResponse(res, 1, '您还没有注册广告系统，请先注册再登录');
    }

  } else {
    next();
  }
};
