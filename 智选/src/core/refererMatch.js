/* ensure request has referrer */
import { nodeHost } from '../config';

// production 环境限制 referer
// 开发模式不限制
const checkReferer = !__DEV__;

const refererMatchPattern = (req, pattern) => {
  let referer = req.headers['referer'] || req.headers['referrer'];
  let re = new RegExp(`\\/${pattern}\\/`);

  return referer && re.test(referer);
};

const ensureReferer = req => checkReferer ? refererMatchPattern(req, nodeHost) : true;

export {
  ensureReferer as default,
  refererMatchPattern
};