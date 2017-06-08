import path from 'path';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
// import compression from 'compression';
import auth from './middlewares/auth';
import accessId from './middlewares/accessId';
import { access, response } from './middlewares/log';
import errorHandler from './middlewares/errorHandler';
// import loginHandler from './middlewares/loginHandler';
import logoutHandler from './middlewares/logoutHandler';
import serverRender from './middlewares/serverRender';
import routes from './routes';
import apiHandler from './api';
import { nodePort } from './config';

const app = express();

/**
 * heart beat api for maintainer to test node alive
 */
app.get('/heartBeat', (req, res) => {
  res.status(200).send('I am fine');
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// one hour
const cookieAge = 1 * 60 * 60 * 1000;
// one year
const cacheAge = 1 * 365 * 24 * 60 * 60 * 1000;

/**
 * If you have your node.js behind a proxy and are using secure: true,
 * you need to set "trust proxy" in express:
 * app.set('trust proxy', 1) // trust first proxy
 *
 * reference:
 * https://github.com/expressjs/session
 */
app.use(session({
  secret: `labuladuo.${Math.random()}`,
  name: 'YOUDAO_ZHIXUAN_AUTHID',
  resave: false, // 即使 session 没有被修改，也保存 session 值，默认为 true
  rolling: true, // 每次请求都更新cookie expires
  saveUninitialized: false,
  // default: { path: '/', httpOnly: true, secure: false, maxAge: null }
  // secure: true => cookie 在 HTTP 中是无效，在 HTTPS 中才有效
  cookie: { maxAge: cookieAge }
  // genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。
  // store: session 的存储方式，默认存放在内存中
}));

/**
 * Register log middleware
 */
app.use(accessId);
app.use(access);
app.use(response);

/**
 * compression middleware
 * compression default gzip with html, css, js or json
 *
 * The main implementation detail is to make sure that
 * the app.use call for compress is before any other middlewares
 * (there are a few exceptions like logging).
 *
 */
// app.use(compression({
//   filter: req => (req.originalUrl || req.url).indexOf('api') === -1
// }));

/**
 * Register static middleware
 */
app.use(express.static(path.join(__dirname, 'public'), { maxAge: cacheAge }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//
// Authentication
// -----------------------------------------------------------------------------
// app.use(expressJwt({
//   secret: auth.jwt.secret,
//   credentialsRequired: false,
//   getToken: req => req.cookies.id_token,
// }));

if (__DEV__) {
  app.enable('trust proxy');
}

/**
 * Register API middleware
 */
app.use('/api', auth.api, apiHandler);

/**
 * Register login page and login auth midddleware
 */
// app.use('/login', loginHandler);
app.get('/logout', logoutHandler);

/**
 * Register server-side rendering middleware
 */
app.get('*', auth.server, serverRender(routes));


/**
 * Register custom error handler middleware last
 */
app.use(errorHandler);

/**
 * Launch the server
 */
app.listen(nodePort, () => {
  let address = 'localhost';
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const getLocalIP = require('./core/serverUtils').getLocalIP;
    const ip = getLocalIP().filter(x => x !== '127.0.0.1');
    if (ip[0]) { address = ip[0]; }
  }
  // eslint-disable-next-line no-console
  console.log(`The server is running at http://${address}:${nodePort}/, now is ${new Date().toLocaleString()}`);
});
