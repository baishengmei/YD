var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mockserver'; // 数据库为 mockserver
var contraJson = require('./contraJson.js');
var genRes = require('./genRes.js');

																													
/* eslint no-param-reassign: 0 */
export default async(req, res) => {

	var rule = {};//数据库读取的规则名所对应的规则对象
	//reqm,requ,reqb,reqh,resc,reqp,reqq分别对应实际请求的method, pathname，body，header，contentType, parameters, query
	let reqm, requ, reqb, reqh, reqc, reqp, reqq;
	//requr为发送请求的url，如果为get请求会包含query和hash
	let requrl;
	requrl = req.originalUrl;
	requ = req.path;
	reqm = req.method.toUpperCase();
	reqc = req.get('Content-Type') || req.get('Content-type');
	reqh = req.headers;

	reqq = req.query || "";
	reqb = req.body || "";
	let dbNames = [];
	let dbRules = [];

	let errMsg = [];

	let selectUrl2rules = function(db, callback) { 
	 //连接到表 
		let collection = db.collection('rules_site');
		// 查询数据 requrl.substring(5)的目的是因为访问url中存在test字段，需要先去掉后再与数据库url对比，如/test/xinzhixuan/url_one
		collection.find({'keypath':requrl.substring(5)},function(error, cursor){
			cursor.each(function(error,doc){
				if(doc){
					if (doc.addTime) {
						console.log("addTime: "+doc.addTime);
					}
					dbNames.push(doc);
					callback(doc);
				}else if(dbNames.length <= 0){
					res.status(200).send({status: "The rule isn't existed!"});
				}//当doc存在时，总是执行两次，第二次为null，故而无论有无doc，均提示该URL不存在！
			});   
		});   
	}

	MongoClient.connect(DB_CONN_STR, function(err, db) {
		selectUrl2rules(db, function(result) {
			contrC(result.value).then(contrM).then(contrQ).then(contrB).then(contrH).then(getRes).then(function(message) {
				console.log(message);
				res.writeHead(message.status_code, {'Content-Type': message.content_type.trim()});

				console.log(message.body);
				res.end(JSON.stringify(message.body));

			}, function(error) {
				console.log(error);
				res.status(200).send({status: errMsg[0]});
			})
			db.close();
		});
	});
	function contrC(rule) {
		return new Promise(function(res, rej) {
			if (rule.reqc == reqc || rule.reqc == undefined || rule.reqc == "") {
				res(rule);
				console.log('Content-Type is ok!')
			} else {
				// rej(new Error("The content-type is wrong！"));
				errMsg.push("The content-type in your real request isn't meet the rules in MockServer!"); 
				rej(new Error(errMsg));      
			}
		})
	}
	function contrM(ret) {
		return new Promise(function(res, rej) {
			if (ret.reqm.toUpperCase() == reqm || ret.reqm == undefined || ret.reqm == "") {
				res(ret);
				console.log('METHOD is ok!')
			} else {
				errMsg.push("The method in your real request isn't match the rules in MockServer!");
				// rej(new Error("The method is wrong！"));
				rej(new Error(errMsg));
			}
		})
	}

	function contrQ(ret) {
		return new Promise(function (res, rej) {
			if (contraJson(ret.reqq, reqq)) {
				res(ret);
				console.log('query is ok!')
			}else{
				errMsg.push("The query in your real request isn't match the rules in MockServer!");
				// rej(new Error("The body is not match!"));
				rej(new Error(errMsg))
			}
		})
	}

	function contrB(ret) {
		return new Promise(function (res, rej) {
			if (contraJson(ret.reqb, reqb)) {
				res(ret);
				console.log('body is ok')       
			} else {
				errMsg.push("The body in your real request isn't match the rules in MockServer!");
				// rej(new Error("The body is not match!"));
				rej(new Error(errMsg));
			}
		})
	}
	function contrH(ret){
		return new Promise(function (res, rej) {
			if (contraJson(ret.reqh, reqh)) {
				console.log('header is ok!')
				res(ret);        
			} else {
				console.log('header is wrong!')
				errMsg.push("The headers in your real request isn't match the rules in MockServer!");
				rej(new Error(errMsg));
			}
		})
	}
	//数组的拷贝
	function copyArr(arr) {
		let res = []
		for (let i = 0; i < arr.length; i++) {
		 res.push(arr[i])
		}
		return res;
	}

	function getRes(ret) {
		return new Promise(function (res, rej) {
			let lastResult = {};
			var constrRes = ret.constrRes;//这是一个数组；
			var flag = false;
			for(var i=0,len; len=constrRes.length, i<len; i++){
				var ruleCondition = constrRes[i].condition;
				var condition = ruleCondition.replace(/\$G/g, 'ret\.G');

				//注意：约束表达式、约束条件、响应条件中是通过$b/$G1这种方式表示
				if(ruleCondition !== "" && eval(condition) == undefined){
					flag = false;
				}else if(ruleCondition == "true"){//当响应条件置空时，保存数据到数据库时，可能会被重置为true
					let response;
					let ruleResponse = [];
					let resStatusCode;
					let resContentType;
					resStatusCode = constrRes[i].ressc;
					resContentType = constrRes[i].resc;
					Object.assign(lastResult, {"status_code": resStatusCode}, {"content_type": resContentType});

					if(constrRes[i].response.length == 0 || constrRes[i].response == undefined){
						ruleResponse = [];
						response = {};
					}else {
						ruleResponse = copyArr(constrRes[i].response);
						response = genRes(ruleResponse);
					}
					Object.assign(lastResult,{"body": response});
					res(lastResult);
					flag = true;
					break;

				}else if(ruleCondition == "" || eval(eval(condition).replace(/\$b/g, "reqb").replace(/\$h/, "reqh").replace(/\$q/, "reqq"))){

					let response;
					let ruleResponse = [];
					let resStatusCode;
					let resContentType;
					resStatusCode = constrRes[i].ressc;
					resContentType = constrRes[i].resc;
					Object.assign(lastResult, {"status_code": resStatusCode}, {"content_type": resContentType});

					if(constrRes[i].response.length == 0 || constrRes[i].response == undefined){
						ruleResponse = [];
						response = {};
					}else {
						ruleResponse = copyArr(constrRes[i].response);
						response = genRes(ruleResponse);
					}
					Object.assign(lastResult,{"body": response});
					res(lastResult);
					flag = true;
					break;
				}
			}
			if(!flag){
				errMsg.push("There is no response corresponding with the constraints!");
				rej(new Error(errMsg))
			}
		})
	}
};
