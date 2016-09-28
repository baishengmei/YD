/**
 * nothing forbid
 */

export default (req, res, next) => {
  next();
  return;
	if ( (req.originalUrl || req.url).indexOf('clickReportBy') !== -1 ) {
		res.redirect('/clickReport');
	} else {
		next();
	}
};
