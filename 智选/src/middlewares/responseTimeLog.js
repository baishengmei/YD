import morgan from 'morgan';
import fileStreamRotator from 'file-stream-rotator';
import fs from 'fs';
import { formatDate, getIdGenerator } from '../core/serverUtils';

var responseLogDir = `${__dirname}/../logs`;

fs.existsSync(responseLogDir) || fs.mkdirSync(responseLogDir);

var responseLogStream = fileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: `${responseLogDir}/response-%DATE%.log`,
  frequency: 'daily',
  verbose: false
});

// node response log
//因为url中可能包含序列化后的object，所以log中的分隔符不能使用"，改为 <[ 和 ]>
var logFmt = `[:mytime] node :accessId :reqId <[:method :myurl]> :status :response-time[1]ms`;

// YYYY/MM/DD HH:mm:ss
morgan.token('mytime', () => formatDate(new Date(), 'full'));
morgan.token('myurl', req => decodeURIComponent(req.originalUrl || req.url));
morgan.token('accessId', req => req._accessId);

const idGenerator = getIdGenerator();

// request id,
// 日期改变，reqId 从 1 开始
morgan.token('reqId', idGenerator);

// java log
const logRequest = accessId => req => {
  let reqT, id, sponsorId, url;

  req.on('request', () => {
    reqT = new Date();
    id = idGenerator();
    let request = req.request();
    let headers = request['_headers'];
    sponsorId = headers['sponsorid'];
    url = `${headers['host']}${request['path']}`;
  });
  req.on('response', (res) => {
    let resT = new Date();
    let curl = `curl -X ${req.method} --header 'Accept: application/json' --header 'sponsorId: ${sponsorId}' '${url}'`;

    let logtext = `[${formatDate(resT, 'full')}] java ${accessId} ${id} <[${req.method} ${url}]>  ${res.statusCode} ${resT - reqT}ms\n`;
    logtext += `${' '.repeat(22)}${curl}\n`;

    responseLogStream.write(logtext);
  });
};

const log = type => type === 'node' ? morgan(logFmt, {stream: responseLogStream}) : logRequest;

export default log;