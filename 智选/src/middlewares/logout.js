export default (req, res, next) => {
  if (req.session) {
    req.session.cookie.expires = false;
    req.session.user = null;
  }
  let accept = req.headers['accept'].toLowerCase();

  if ( 'application/json' === accept ) {
    res.status(200).send();
  } else {
    res.redirect('/login');
  }
};
