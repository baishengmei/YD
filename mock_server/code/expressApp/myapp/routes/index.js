var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var url2ruleName = require('../public/javascripts/url2ruleName.js');
var ruleName2rules = require('../public/javascripts/ruleName2rules.js');

/* GET home page. */
router.use(function(req, res, next) {

	//reqm,requ,reqb,reqh,resc,reqp,reqq分别对应实际请求的method, pathname，body，header，contentType, parameters, query
	var reqm, requ, reqb, reqh, reqc, reqp, reqq;
	//requr为发送请求的url，如果为get请求会包含query和hash
	var requrl;
	requrl = req.originalUrl;
	requ = req.path;
	reqm = req.method.toUpperCase();
	reqc = req.get('Content-Type') || req.get('Content-type');
	reqh = req.headers;
	reqq = req.query; //query部分
console.log("requrl:"+requrl);
	if(reqm == "GET"){
		reqp = reqq;
	}else{

	}

	if(url2ruleName[requ]){
		var rule; //url对应的mock规则
		rule = ruleName2rules[url2ruleName[requ]];
		//$m,$u,$b,$h,$hash,$c,$p分别指mock规则中的method，url，body，header，hash，contentT，parameters
		function contrC() {
			return new Promise(function(res, rej) {
				if(rule.$c == reqc){
					// console.log(rule.$c+"baishengmei");
					res(rule);
				};
			})
		}
		function contrM(ret) {
			return new Promise(function(res, rej) {
				if(ret.paraDef.$m.toUpperCase() == reqm){
					// console.log(ret.paraDef.$m+"helloworld");
				};
				// res(ret.paraDef);
			})
		}
		function contrP(ret) {
			return new Promise(function(res, rej) {
				if(true) {
					console.log(ret.$p);//前提条件是，将request中相对应的参数保存为json格式，然后调用contrajson.js函数
				}
			})
		}
		contrC().then(contrM).then(contrP);

	}else{
		console.log("not exit!");
	}


	// console.log(url2ruleName);

	res.render('index', {
		title: 'Express'
	});
});

module.exports = router;