var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mockserver'; // 数据库为 mockserver
                                                          
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
          console.log("该URL不存在！")
        }//当doc存在时，总是执行两次，第二次为null，故而无论有无doc，均提示该URL不存在！
      });   
    });   
  }

  MongoClient.connect(DB_CONN_STR, function(err, db) {
    selectUrl2rules(db, function(result) {
      console.log(result, 'zzzzzzzzzzzzzzzz');
      delete result.rulename;
      db.close();
    });
  });

  function contrC(rule) {
    return new Promise(function(res, rej) {
      if (rule.$c == reqc || rule.$c == undefined || rule.$c == "") {
        res(rule);
      } else {
        rej(new Error("The content-type is wrong！"));
      }
    })
  }
  function contrx(rule){
    console.log("okok1222222222222222222222222")
  }
	res.status(200).send({status: "succeed!123456778"});
};
