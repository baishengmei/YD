import crypto from 'crypto';

// hash.digest 调用后，会清空 hash，所以不能二次使用
// https://nodejs.org/docs/latest/api/crypto.html#crypto_hash_digest_encoding
const md5 = (...str) => crypto.createHash('md5').update(str.join('')).digest('hex');

// stringify circular object
const stringify = (obj) => {
  const seen = [];
  return JSON.stringify(
    obj,
    (key, val) => {
      if (val != null && typeof val === 'object') {
        if (seen.includes(val)) return;
        seen.push(val);
      }
      return val;
    }
  );
};

const getIP = req => (req.ip
  || req._remoteAddress // eslint-disable-line no-underscore-dangle
  || (req.connection && req.connection.remoteAddress)
  || undefined);

// 唯一id生成器，每天从1开始
const getIdGenerator = (fmt = 'yyyymmdd') => {
  let id = 0;
  let today = new Date()[fmt]();

  return () => {
    const d = new Date()[fmt]();
    if (d !== today) {
      today = d;
      id = 0;
    }
    return id += 1; // eslint-disable-line no-return-assign
  };
};

const getLocalIP = () => {
  // eslint-disable-next-line global-require
  const execSync = require('child_process').execSync;
  const result = execSync('/sbin/ifconfig').toString();
  const retArr = result.replace(/\t/g, '').split(/\n/);
  const ans = [];
  const ipRe = /^inet (\d+\.\d+\.\d+\.\d+)/;

  retArr.forEach((str) => {
    const match = ipRe.exec(str);
    if (match && match.length >= 2) {
      ans.push(match[1]);
    }
  });
  return ans;
};

export {
  md5,
  stringify,
  getIP,
  getIdGenerator,
  getLocalIP
};
