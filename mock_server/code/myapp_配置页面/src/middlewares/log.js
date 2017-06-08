import morgan from '../core/morgan';
import logStream from '../core/logStream';

const logFormat = {
  access: ':accessId :remote-addr [:accessTime] ":method :url HTTP/:http-version" ":referrer" ":user-agent"',
  // node response log
  response: ':accessId [:accessTime] node :innerRequestId :method :realUrl :status :res[content-length] :response-time[1]ms',
};

const access = morgan(logFormat.access, {
  immediate: true,
  stream: logStream.access,
});

const response = morgan(logFormat.response, {
  stream: logStream.response
});

export {
  access,
  response
};
