import fs from 'fs';
import path from 'path';
import fileStreamRotator from 'file-stream-rotator';

const logDir = path.resolve(__dirname, '../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const streamTypes = ['access', 'response', 'error'];
const streamHolder = Object.create(null);
const logStream = Object.create(null);

const getStream = (type) => {
  if (!streamTypes.includes(type)) {
    throw new Error(`Invalid log stream type: ${type}`);
  }

  if (!(type in streamHolder)) {
    streamHolder[type] = fileStreamRotator.getStream({
      date_format: 'YYYYMMDD',
      filename: `${logDir}/${type}-%DATE%.log`,
      frequency: 'daily',
      verbose: false
    });
  }

  return streamHolder[type];
};

const setStream = () => {
  throw new Error('Reassign log stream is denied.');
};

streamTypes.forEach((type) => {
  Object.defineProperty(logStream, type, {
    get: () => getStream(type),
    set: setStream,
    enumerable: true,
    configurable: false,
  });
});

export default logStream;
