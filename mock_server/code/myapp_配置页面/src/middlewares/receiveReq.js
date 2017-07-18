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
          // console.log("该URL不存在！")
        }//当doc存在时，总是执行两次，第二次为null，故而无论有无doc，均提示该URL不存在！
      });   
    });   
  }

  MongoClient.connect(DB_CONN_STR, function(err, db) {
    selectUrl2rules(db, function(result) {
      contrC(result.value).then(contrM).then(contrQ).then(contrB).then(contrH).catch(function(err){
        throw new Error(err);
      })//.then(getRes);
      db.close();
      // res.status(200).send({status: errMsg});
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
        rej(errMsg);      
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
        rej(errMsg);
      }
    })
  }

  function contrQ(ret) {
    console.log(ret, '23333333333333333333333333333333')
    return new Promise(function (res, rej) {
      if (contraJson(ret.reqq, reqq)) {
        res(ret);
        console.log('query is ok!')
      }else{
        errMsg.push("The query in your real request isn't match the rules in MockServer!");
        // rej(new Error("The body is not match!"));
        rej(errMsg)
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
        rej(errMsg);
      }
    })
  }
  function contrH(ret){
    return new Promise(function (res, rej) {
      if (contraJson(ret.reqh, reqh)) {
        res(ret);
        console.log('header is ok!')
      } else {
        errMsg.push("The headers in your real request isn't match the rules in MockServer!");
        // rej(new Error("The header is not match!"));
        rej(errMsg);
      }
    })
  }
  function getRes(ret) {
    return new Promise(function (res, rej) {
      var constrRes = ret.constrRes;
      var flag = false;
      for(var i=0,len; len=constrRes.length, i<len; i++){
        var ruleCondition = constrRes[i].condition;
        var condition = ruleCondition.replace(/\$G/g, 'ret\.\$G');
        if(eval(eval(condition).replace(/\$b/g, "reqb").replace(/\$h/, "reqh").replace(/\$q/, "reqq"))){
          var response, ruleResponse;
          ruleResponse = constrRes[i].response;
          response = genRes(ruleResponse);
          console.log(response);
          flag = true;
          break;
        }
      }
      if(!flag){
        rej(new Error("There is no response corresponding with the constraints!"))
      }
    })
  }

	res.status(200).send({status: "succeed!123456778"});
};
