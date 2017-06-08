import morgan from 'morgan';
import { getIdGenerator } from '../core/serverUtils';

const idGenerator = getIdGenerator();

morgan.token('accessId', req => req._accessId); // eslint-disable-line no-underscore-dangle
morgan.token('accessTime', () => new Date().fullTime('/'));
morgan.token('realUrl', req => decodeURIComponent(req.originalUrl || req.url));
morgan.token('innerRequestId', idGenerator);

export default morgan;
