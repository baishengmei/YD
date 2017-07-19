import Promise from 'bluebird';

(typeof global !== 'undefined' ? global : window).Promise = Promise;

function zeroPad(d) {
  return d > 9 ? d : `0${d}`;
}

// eslint-disable-next-line no-extend-native
Date.prototype.yyyymmdd = function yyyymmdd(c = '') {
  const d = this;
  const year = d.getFullYear();
  const month = zeroPad(d.getMonth() + 1);
  const date = zeroPad(d.getDate());
  return `${year}${c}${month}${c}${date}`;
};

// eslint-disable-next-line no-extend-native
Date.prototype.fullTime = function fullTime(c = '') {
  const d = this;
  const year = d.getFullYear();
  const month = zeroPad(d.getMonth() + 1);
  const date = zeroPad(d.getDate());
  const hour = zeroPad(d.getHours());
  const minute = zeroPad(d.getMinutes());
  const second = zeroPad(d.getSeconds());
  let ms = d.getMilliseconds();
  if (ms < 10) {
    ms = `00${ms}`;
  } else if (ms < 100) {
    ms = `0${ms}`;
  }
  const timezoneOffset = d.getTimezoneOffset() / 60;
  const timezone = `${timezoneOffset > 0 ? '-' : '+'}${zeroPad(Math.abs(timezoneOffset))}00`;

  return `${year}${c}${month}${c}${date} ${hour}:${minute}:${second}.${ms} ${timezone}`;
};
