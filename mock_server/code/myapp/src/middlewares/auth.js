/* ensure api request login and has referrer */
import ensureReferer from '../core/refererMatch';

/**
 * ensure server request login
 */
const server = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else if (req.session && __DEV__) {
    req.session.user = require('../config').testUser; // eslint-disable-line
    next();
  } else {
    res.redirect('/login');
  }
};

const api = (req, res, next) => {
  if (!req.session || !req.session.user) {
    if (req.session && __DEV__) {
      req.session.user = require('../config').testUser; // eslint-disable-line
      return next();
    }
    res.status(403).send({
      errcode: 403,
      errmsg: 'needLogin'
    });
  } else if (!ensureReferer(req)) {
    // prevent csrf
    res.status(403).send({
      errcode: 403,
      errmsg: 'The Request Is Not Allowed Outside the Website.'
    });
  } else {
    next();
  }
};

export default {
  server,
  api
};
