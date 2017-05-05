var express = require('express');
var router = express.Router();

var admin = express();
var app = express();

admin.on('mount', function (parent) {
	console.log('admin mounted!');
	// console.log(parent);
});
admin.get('/', function (req, res) {
	res.send("admin homepage!");
});
app.use('/', admin);
app.all('/aa', function (req, res, err) {
	res.send("app.all");
});


module.exports = app;


/* GET home page. */
// router.get('/*', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send('succeed!');
// });

// module.exports = router;
