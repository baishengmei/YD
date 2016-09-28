/* ensure api request login and has referrer */
import ensureReferer from '../core/refererMatch';

export default (req, res, next) => {
  if (!req.session || !req.session.user) {
    if ( req.session && __DEV__ ) {
      req.session.user = require('../config').testUser;
      next();
      return;
    }
    res.status(403).send({
      errcode: 403,
      errmsg: 'needLogin'
    });
  } else if ( !ensureReferer(req) ) {
    res.status(403).send({
      errcode: 403,
      errmsg: 'The Request Is Not Allowed Outside the Website.'
    });
  } else {
    next();
  }
};
