import Fetch, { Response, Request, Headers } from 'node-fetch';
import logStream from '../logStream';
import morgan from '../morgan';

const javaResponse = ({
  accessId,
  innerRequestId,
  url,
  method,
  statusCode,
  responseTime,
  contentLength,
  headers
}) => {
  const reqUrl = `${url}${url.includes('?') ? '&' : '?'}sponsorId=${headers.sponsorIdHeader}`;
  // eslint-disable-next-line quotes
  const logtext = `${accessId} [${morgan.accessTime()}] java ${innerRequestId} ${method.toUpperCase()} ${reqUrl} ${statusCode} ${contentLength} ${responseTime}ms\n`;
  logStream.response.write(logtext);
};

const fetch = (accessId, url, opts) => new Promise((resolve, reject) => {
  const req = Fetch(url, opts);
  const start = Date.now();
  const data = {
    accessId,
    innerRequestId: morgan.innerRequestId(),
    url,
    ...opts,
  };

  req.then((res) => {
    // eslint-disable-next-line no-underscore-dangle
    const resHeaders = res.headers._headers;
    data.statusCode = res.status;
    data.contentLength = resHeaders['content-length'] && resHeaders['content-length'].length > 0 ? resHeaders['content-length'][0] : '"-"';
    data.responseTime = Date.now() - start;
    javaResponse(data);

    resolve(res);
  }).catch((err) => {
    data.statusCode = err.code || '"-"';
    data.contentLength = '"-"';
    data.responseTime = Date.now() - start;
    javaResponse(data);

    reject(err);
  });
});

export {
  fetch as default,
  Response,
  Request,
  Headers
};
