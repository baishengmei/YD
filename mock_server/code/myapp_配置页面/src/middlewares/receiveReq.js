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

  let selectUrl2name = function(db, callback) { 
   //连接到表 
    let collection = db.collection('names_site');
    // 查询数据
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
    selectUrl2name(db, function(result) {
      db.collection('rules_site').find({'keypath': result.value}, function(error, cursor){
        cursor.each(function(error, doc){
          if (doc){
            dbRules.push(doc);
            rule = doc.value;
            console.log(rule, "docdocdocdocdoc");
          }else if(dbRules.length <= 0){
            console.log("该规则不存在！");//这里要改成res.send方法，返回前端，ret=0，那么则提示该规则不存在
          }
        })
      })
      db.close();
    });
  });
	res.status(200).send({status: "succeed!123456778"});
};
