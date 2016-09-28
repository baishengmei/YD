import request from './HttpDelegate';
import NTESLoginErrorMap from '../constants/NTESErrorMap';

///////////////////////////////////////////
// 163 获取用户信息接口，这里用作登录认证
//
// 注意： 接口 http://reg.163.com/services/userinfo/getselfinfo
// 在 URS 的官网文档（v3）中没有找到，
// 但在outfox wiki 的 URS v3 接口规范中出现了，并且还提供服务
// 推测可能是文档移植时漏掉的，或者有可能是 deprecated
//
// 如果未来该接口不能使用了，可使用 http://reg.163.com/services/ulogin_server 代替
// 但需要提申请，较为麻烦
//
// author: nilzh
// date: 2016-05-12
///////////////////////////////////////////
const getNTESLoginApi = (username, pw, ip) => `http://reg.163.com/services/userinfo/getselfinfo?username=${username}&password=${pw}&userip=${ip}&product=search`;

// 美化 163 登录认证服务器的返回信息
const prettyNTESResponse = resText => {
  let resArr = resText.split('\n');
  let o = {};
  let code = resArr.shift();
  if ( code == '201' || code == '200' ) {
    o.status = 'ok';
  } else {
    let msg = NTESLoginErrorMap.has(code)
      ? NTESLoginErrorMap.get(code)
      : (a => {
          a.forEach(l => {
            if ( !msg && l ) msg = l;
          });
          !msg && '登录认证服务器未知错误，请稍后再试！';
        })(resArr);
    o.error = new Error(msg);
    o.error.response = resText;
  }
  return o;
};

// 调用 163 接口做登录认证
const checkNTESLogin = async (accessId, username, pw, ip) => {
  let url = getNTESLoginApi(username, pw, ip);
  let obj;
  try {
    let retText = await request.getOctetStream(url, { accessId });
    obj = prettyNTESResponse(retText);
  } catch (err) {
    obj = {
      status: 'fail',
      error: err
    };
  }
  return obj;
};

export default checkNTESLogin;