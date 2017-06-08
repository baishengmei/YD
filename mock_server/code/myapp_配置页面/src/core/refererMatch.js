/* ensure request has referrer */
import { nodeHost } from '../config';

// production 环境限制 referer
// 开发模式不限制
const checkReferer = !__DEV__;

const refererMatchPattern = (req, pattern) => {
  const referer = req.headers.referer || req.headers.referrer;
  const re = new RegExp(`\\/${pattern}\\/`);

  return referer ? re.test(referer) : false;
};

const ensureReferer = req => (checkReferer ? refererMatchPattern(req, nodeHost) : true);

export {
  ensureReferer as default,
  refererMatchPattern
};
