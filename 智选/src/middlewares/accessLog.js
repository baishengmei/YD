import morgan from 'morgan';
import fileStreamRotator from 'file-stream-rotator';
import fs from 'fs';

var accessLogDir = `${__dirname}/../logs`;

fs.existsSync(accessLogDir) || fs.mkdirSync(accessLogDir);

var accessLogStream = fileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: `${accessLogDir}/access-%DATE%.log`,
  frequency: 'daily',
  verbose: false
});

var logFmt = `:remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`;

export default morgan(logFmt, {stream: accessLogStream});