import { indexPage } from '../config';

/* eslint no-param-reassign: 0 */
export default (req, res) => {
  if (req.session) {
    req.session.cookie.expires = false;
    req.session.user = null;
  }
  const accept = (req.headers.accept || '').toLowerCase();

  if ('application/json' === accept) {
    res.status(200).send({ redirect: indexPage });
  } else {
    res.redirect(indexPage);
  }
};
