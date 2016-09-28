////////////////////////////////////////////
// 错误代码及其代表意义定义参考如下两个网址
// 1. outfox wiki
// https://dev.corp.youdao.com/outfoxwiki/AccountProject/UrsDocs
//
// 2. 最新 URS 官网文档
// https://ursdoc.hz.netease.com/urs-doc/docs/index.php?t=urs-api-v3&md=login&#1.3. 登录认证（服务器端，返回值）
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
const errorMap = new Map;

errorMap.set('401', '登录认证服务器正在升级，无法提供登录认证服务');
errorMap.set('410', '您的 IP 地址未授权，拒绝访问！');
errorMap.set('412', '服务器登录认证次数超过限制，请 10 分钟后再试！');
errorMap.set('414', '您的 IP 登录次数太多，请 10 分钟后再试！');
errorMap.set('415', '当前用户登录失败次数太多，请 10 分钟后再试！');
errorMap.set('416', '您的 IP 今天登录过于频繁，请 10 分钟后再试！');
errorMap.set('417', '您的 IP 今天登录次数过多，请明天再试！');
errorMap.set('418', '您的账户今天登录次数过多，请明天再试！');
errorMap.set('419', '您的账户今天登录过于频繁，请 10 分钟后再试！');
errorMap.set('420', '该用户不存在');
errorMap.set('422', '您的帐号处于锁定状态，目前无法登录！');
errorMap.set('460', '密码不正确');
errorMap.set('500', '登录认证服务器端错误');
errorMap.set('503', '登录认证服务器正在维护，无法提供登录认证服务');

export default errorMap;
