import fileStreamRotator from 'file-stream-rotator';
import fs from 'fs';
import onFinished from 'on-finished';
import { formatDate, stringify } from '../core/serverUtils';
import PrettyError from 'pretty-error';

// pretty error
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

var errorLogDir = `${__dirname}/../logs`;

fs.existsSync(errorLogDir) || fs.mkdirSync(errorLogDir);

var errorLogStream = fileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: `${errorLogDir}/error-%DATE%.log`,
  frequency: 'daily',
  verbose: false
});

const logError = (method, url, status, errMsg) => {
  let logtext = `[${formatDate(new Date(), 'full')}] node response <[${method} ${decodeURIComponent(url)}]> ${status} <[\n${stringify(errMsg)}\n]>\n`;

  errorLogStream.write(logtext);
};

const errorHandler = (err, req, res, next) => {

  if ( __DEV__ ) {
    console.error(pe.render(err.stack || err));
  }

  let url = req.originalUrl || req.url;

  if ( res.headersSent || !(err instanceof Error) ) {//已经发送response信息的，需要调用系统默认错误处理方式断开连接
    onFinished(res, () => {
      logError(req.method, url, res.statusCode, err.stack || err);
    });
    return next(err);
  }

  let statusCode = err.status || err.statusCode || 500;

  logError(req.method, url, statusCode, err.stack || err);

  let errmsg = statusCode === 500 ? '服务器内部错误' : err.message || '服务器内部错误';

  if ( req.accepts('json') ) {
    res.status(200).send({
      errcode: statusCode,
      errmsg: errmsg
    });
  } else {
    res.status(statusCode).send(errmsg);
  }

};

export default errorHandler;