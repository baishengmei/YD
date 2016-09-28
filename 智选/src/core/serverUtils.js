import crypto from 'crypto';

// hash.digest 调用后，会清空 hash，所以不能二次使用
// https://nodejs.org/docs/latest/api/crypto.html#crypto_hash_digest_encoding
const md5 = (...str) => crypto.createHash('md5').update(str.join('')).digest('hex');

// left padding with zero
// less than 100
const lpz2 = n => n < 10 ? ( '0' + n ) : n;

// YYYYMMDD 为 年月日
// 非 YYYYMMDD 为 YYYY/MM/DD HH:mm:ss
const formatDate = (d, format = 'YYYYMMDD') => {
  return 'YYYYMMDD' === format ?
    `${d.getFullYear()}${lpz2(d.getMonth()+1)}${lpz2(d.getDate())}` :
    `${d.getFullYear()}/${lpz2(d.getMonth()+1)}/${lpz2(d.getDate())} ${lpz2(d.getHours())}:${lpz2(d.getMinutes())}:${lpz2(d.getSeconds())}`;
};

// stringify circular object
const stringify = obj => {
  var seen = [];
  return JSON.stringify(
    obj,
    ( key, val ) => {
      if (val != null && typeof val == "object") {
        if ( seen.includes( val ) ) return;
        seen.push( val );
      }
      return val;
    }
  );
};

const getip = req => req.ip
  || req._remoteAddress
  || (req.connection && req.connection.remoteAddress)
  || undefined;

// 唯一id生成器，每天从1开始
const getIdGenerator = () => {
  var id = 0;
  var today = formatDate(new Date());
  return date => {
    var d = formatDate(new Date());
    if ( d !== today ) {
      today = d;
      id = 0;
    }
    return ++id;
  };
};

export { md5, formatDate, stringify, getip, getIdGenerator };
