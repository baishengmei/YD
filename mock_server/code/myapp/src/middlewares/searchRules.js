var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mockserver'; // 数据库为 mockserver

/* eslint no-param-reassign: 0 */
export default async(req, res) => {

  const body = req.query;
  let rules = [];//用于存放读取出来的规则
  //查询数据参数列表
  let whereStr;//当页面加载获取所有规则时；
  // let baseUrl = req.baseUrl;//"/mockserver/getdatafrommongod/all"
  // let reqTag;
  // reqTag = baseUrl.substring(baseUrl.lastIndexOf("\/")+1, baseUrl.length);//获取到all

  if(body.projname.trim() == "" && body.rulename.trim() == ""){
    whereStr = {"keypath":/\w+/};
  }else if(body.projname.trim() !== "" && body.rulename.trim() == "") {
    let reg = new RegExp("^\/"+body.projname.trim()+"\\S+$");
    whereStr = {"keypath": reg};
  }else if(body.projname.trim() == '' && body.rulename.trim() !== "") {
    whereStr = {"value.rulename": body.rulename};
  }else if(body.projname.trim() !== "" && body.rulename.trim() !== ""){
    let reg = new RegExp("^\/"+body.projname.trim()+"\\S+$");
    whereStr = {"keypath": reg, "value.rulename": body.rulename};
  }

  // console.log("whereStr的值：", whereStr);
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
    selectData(whereStr, db, function(result) {
      db.close();
      // console.log(result, '111111');
      res.status(200).send(result);
    });
  });

};
