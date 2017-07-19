import onFinished from 'on-finished';
import PrettyError from 'pretty-error';
import logStream from '../core/logStream';
import { stringify } from '../core/serverUtils';
import morgan from '../core/morgan';

// pretty error
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

const errorLogStream = logStream.error;

const logError = (accessId, method, url, status, errMsg) => {
  const logtext = `${accessId} [${morgan.accessTime()}] node ${method} ${url} ${status} <[\n${stringify(errMsg)}\n]>\n`;
  errorLogStream.write(logtext);
};

const errorHandler = (err, req, res, next) => {
  if (__DEV__) {
    console.error(pe.render(err.stack || err)); // eslint-disable-line no-console
  }
  const url = req.originalUrl || req.url;

  if (res.headersSent || !(err instanceof Error)) { // 已经发送response信息的，需要调用系统默认错误处理方式断开连接
    onFinished(res, () => {
      logError(morgan.accessId(req), req.method, url, res.statusCode, err.stack || err);
    });
    return next(err);
  }

  let statusCode = err.status || err.statusCode || undefined;

  logError(morgan.accessId(req), req.method, url, statusCode, err.stack || err);

  // eslint-disable-next-line no-mixed-operators
  const errmsg = statusCode && err.message || '服务器内部错误';
  statusCode = statusCode || 500;

  if (req.accepts('json')) {
    res.status(statusCode).send({
      errcode: statusCode,
      errmsg
    });
  } else {
    res.status(statusCode).send(errmsg);
  }

  // const html = ReactDOM.renderToStaticMarkup(
  //   <Html
  //     title="Internal Server Error"
  //     description={err.message}
  //     // eslint-disable-next-line no-underscore-dangle
  //     styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]}
  //   >
  //     {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
  //   </Html>,
  // );
  // res.status(err.status || 500);
  // res.send(`<!doctype html>${html}`);
};

export default errorHandler;
