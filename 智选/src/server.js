import 'babel-polyfill';
import path from 'path';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import APIAuth from './middlewares/APIAuth';
import accessId from './middlewares/accessId';
import accessLog from './middlewares/accessLog';
import errorHandler from './middlewares/errorHandler';
import forbid from './middlewares/forbid';
import responseTimeLog from './middlewares/responseTimeLog';
import loginHandler from './middlewares/loginHandler';
import logout from './middlewares/logout';
import serverAuth from './middlewares/serverAuth';
import serverRender from './middlewares/serverRender';
import routes from './routes';
import indexPageRouter from './api/indexPage';
import dailyBudget from './api/dailyBudget';
import { nodePort, nodeHost } from './config';

const server = global.server = express();
server.set('port', nodePort);

// one hour
const cookieAge = 1 * 60 * 60 * 1000;
// one year
const cacheAge = 1 * 365 * 24 * 60 * 60 * 1000;

server.use(cookieParser());
server.use(session({
  secret:`labuladuo.${Math.random()}`,
  name: 'YOUDAO_ZHIXUAN_AUTHID',
  resave: false,
  rolling: true,//每次请求都更新cookie expires
  saveUninitialized: false,
  cookie: { maxAge: cookieAge }
}));
server.use(bodyParser.urlencoded({
  extended: true
}));

// heart beat api for testing live
server.get('/heartBeat', (req, res) => {
  res.status(200).send('I am still alive');
});

//
// Register log middleware
// -----------------------------------------------------------------------------
server.use(accessId);
server.use(accessLog);
server.use(responseTimeLog('node'));

//
// compression middleware
//
// compression default gzip with html, css, js or json
//
// The main implementation detail is to make sure that
// the app.use call for compress is before any other middlewares
// (there are a few exceptions like logging).
// -----------------------------------------------------------------------------
server.use(compression({
  filter: (req, res) => (req.originalUrl || req.url).indexOf('api') === -1
}));

//
// Register static middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public'), { maxAge: cacheAge }));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/indexPage', APIAuth, indexPageRouter);
server.post('/api/saveDailyBudget', APIAuth, dailyBudget);
// server.use('/api/account', APIAuth, require('./api/account'));
// server.use('/api/downloadClickData', APIAuth, require('./api/download'));

//
// Register login page and login auth midddleware
// -----------------------------------------------------------------------------
server.use('/login', loginHandler);
server.get('/logout', logout);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', serverAuth, forbid, serverRender(routes));


//
// Register custom error handler middleware last
// -----------------------------------------------------------------------------
server.use(errorHandler);

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(nodePort, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://${nodeHost}/ on ${nodePort}, now is ${new Date().toLocaleString()}`);
});
