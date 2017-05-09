var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var url2ruleName = require('../public/javascripts/url2ruleName.js');
var ruleName2rules = require('../public/javascripts/ruleName2rules.js');
var contraJson = require('../public/javascripts/contraJson.js');
var genRes = require('../public/javascripts/genRes.js');


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

	reqq = req.query || "";
	reqb = req.body || "";

	if (url2ruleName[requ]) {
		var rule; //url对应的mock规则
		rule = ruleName2rules[url2ruleName[requ]];
		//$m,$u,$b,$h,$hash,$c,$p分别指mock规则中的method，url，body，header，hash，contentT，parameters
		function contrC(rule) {
			return new Promise(function(res, rej) {
				if (rule.$c == reqc) {
					res(rule);
				} else {
					rej(new Error("The content-type is wrong！"));
				}
			})
		}
		function contrM(ret) {
			return new Promise(function(res, rej) {
				if (ret.$m.toUpperCase() == reqm) {
					res(ret);
				} else {
					rej(new Error("The method is wrong！"));
				}
			})
		}

		function contrQ(ret) {
			return new Promise(function (res, rej) {
				if (contraJson(ret.$q, reqq)) {
					res(ret);
				}else{
					rej(new Error("The body is not match!"));
				}
			})
		}

		function contrB(ret) {
			return new Promise(function (res, rej) {
				if (contraJson(ret.$b, reqb)) {
					res(ret);				
				} else {
					rej(new Error("The body is not match!"));
				}
			})
		}
		function contrH(ret){
			return new Promise(function (res, rej) {
				if (contraJson(ret.$h, reqh)) {
					res(ret);
				} else {
					rej(new Error("The header is not match!"));
				}
			})
		}
		function getRes(ret) {
			return new Promise(function (res, rej) {
				var constrRes = ret.constrRes;
				// console.log(constrRes)
				var flag = false;
				for(var i=0,len; len=constrRes.length, i<len; i++){
					var ruleCondition = constrRes[i].condition;
					var condition = ruleCondition.replace(/\$G/g, 'ret\.\$G');
					if(eval(eval(condition).replace(/\$b/g, "reqb").replace(/\$h/, "reqh").replace(/\$q/, "reqq"))){
						var response, ruleResponse;
						ruleResponse = constrRes[i].response;
						response = genRes(ruleResponse);
						flag = true;
						break;
					}
				}
				if(!flag){
					rej(new Error("There is no response corresponding with the constraints!"))
				}
			})
		}
		contrC(rule).then(contrM).then(contrQ).then(contrB).then(contrH).then(getRes);

	} else {
		console.log("not exit!");
	}

	res.render('index', {
		title: 'Express'
	});
});


module.exports = router;