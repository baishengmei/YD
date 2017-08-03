var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mockserver'; // 数据库为 mockserver

/* eslint no-param-reassign: 0 */
export default async(req, res) => {

  const body = req.body;

  console.log(body, 'fdddddddddddddddddddd')

  MongoClient.connect(DB_CONN_STR, function(error, db){
    console.log("链接成功")
    db.collection('projname_site').insert({"projname": body.projname.toString()}, function(err, result) {
      if(err) {
        console.log('Error:' +err);
        return;
      }else {
        console.log(result, "打印result的值");
      }
      dbclose;
      res.status(200).send("成功");
    })
  });
};
