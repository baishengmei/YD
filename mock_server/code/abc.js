var Mock = require('mockjs');
var express = require('express');
var app = express();

var greet = express.Router();

greet.get('/jp', function (req, res) {
  console.log(req.baseUrl); // /greet
  res.send('Konichiwa!');
});

app.use('/greet', greet); // load the router on '/greet'

app.listen(3000, function () {
	console.log("Ready!");
})


