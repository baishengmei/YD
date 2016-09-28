/**
 * ensure server request login
 */

export default (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    if (req.session && __DEV__) {
      req.session.user = require('../config').testUser;
      next()
    } else {
      res.redirect('/login');

    }
  }
};
