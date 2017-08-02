var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mockserver'; // 数据库为 mockserver

/* eslint no-param-reassign: 0 */
export default async(req, res) => {

  const body = req.query;
  let rules = [];//用于存放读取出来的规则
  //查询数据参数列表
  let whereStr;//当页面加载获取所有规则时；
  let delProjWhereStr;//删除数据库对应信息；
  let delRuleWhereStr;
  let regProj = new RegExp("^\/"+body.projname.trim()+"\\S+$");
  delProjWhereStr = {"keypath": regProj, "value.rulename": body.rulename};
  delRuleWhereStr = {"keyProj": body.projname, "keyName": body.rulename};
  whereStr = {"keypath":/\w+/};//读取数据库所有数据；

  //查询数据库内容无Id
  const whereNoId = {_id: 0};
  
  //读取数据库中所有规则
  let selectData = function(whereStr, db, callback) {  
    let collection = db.collection('rules_site');   
    collection.find(whereStr, whereNoId).toArray(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }     
      callback(result);
    });
  }
   
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    db.collection('rules_site').remove(delProjWhereStr, function(){
      db.collection('names_site').remove(delRuleWhereStr, function(){
        selectData(whereStr, db, function(result){
          console.log(result, "删除后读取数据库的值");
          db.close();
          res.status(200).send(result);
        });
      })
    });
  });

};
