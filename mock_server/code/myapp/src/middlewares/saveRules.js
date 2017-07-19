var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mockserver'; // 数据库为 mockserver

/* eslint no-param-reassign: 0 */
export default async(req, res) => {

	// let url2ruleName = {};
	let url2rules = {};
	let reqB = {};
  let reqH = {};
  let reqQ = {};
  let response;//用于保存rules中response的数据
  const method = req.method.toUpperCase();
  const body = req.body;

  let dbProj2Names = [];
  let dbUrl2Rules = [];

  let respIndb = [];//将rules中的response数据保存到数据库中对应的变量值

  //传送过来的body中$b/$p/$h等均保存在一个数组中，该函数将其转化为对象的格式
	function paramsCh(bphq) {
		var xobj = {};
		if(Object.prototype.toString.call(bphq) == '[object Array]'){
			for( let i=0; i<bphq.length; i++ ){
  			xobj = Object.assign(xobj, bphq[i]);
  		}
  		return xobj;
		}else{
      return;
    }
	}

  //检验$b/$h/$h是否存在，并将值保存到变量中
  function isUndefined(val){
    if(val == undefined){
      return "";
    }else{
      return paramsCh(val);
    }
  }

  //删除数组中的空项
  Array.prototype.notempty = function(){
      return this.filter(t => t!=undefined && t!==null && t!=="");
  }

	reqB = isUndefined(body.request.$b);
  reqH = isUndefined(body.request.$h);
  reqQ = isUndefined(body.request.$q);
	//将接收到的body数据进行格式处理，保存成待保存的数据格式,实际保存的url链接为"项目组名/url"
	url2rules["/" + body.projectName + "/" +body.request.$u] = {
    "rulename": body.ruleName,
		"reqc": body.request.$c,
		"reqm": body.request.$m,
		"reqb": reqB || {},
    "reqh": reqH || {},
    "reqq": reqQ || {},
	};

  //用于保存约束条件
  if(body.request.$G == undefined){
    url2rules["/" + body.projectName + "/" +body.request.$u]["G1"] = "";
  }else{
    for(let i in body.request.$G){
      url2rules["/" + body.projectName + "/" +body.request.$u][i.substring(1)] = body.request.$G[i];
    }
  }

  //用于将配置页面的响应部分传给node后端
  response = body.response.notempty();
  for(let i=0; i<response.length; i++){
    let resB = [];
    url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'] = [];
    url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i] = {};
    url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['condition'] = response[i]['$i'];
    url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['ressc'] = response[i]['$sc'];
    url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['resc'] = response[i]['$c'];
    url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['response'] = [];
    //获取到response中$resB字符串，便于在对象中访问或设置该key的值
    for(let k in response[i]){
      if(k.match(/^\$resB\d*$/) !== null){
        resB.push(k.match(/^\$resB\d*$/)[0]);
      }
    }
    if(response[i][resB[0]] !== undefined){
      url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['response'] = copyArr(response[i][resB[0]]);
    }else{
      url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['response'] = [];
    }
    respIndb.push(url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]);
  }

  url2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'] = copyArr(respIndb);

  //数组深拷贝
  function copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
     res.push(arr[i])
    }
    return res
  }

  //将rules和names入到数据库
  let insertNames = function(db, callback) {
    let collection = db.collection('names_site');
    collection.insert({'keyProj': body.projectName, 'keyName': body.ruleName}, function(err, result) {
      if(err) {
        console.log('Error:' + err);
        return;
      }
      callback(result);
    })
  }
  let insertRules = function(db, callback) {  
    //连接到表 site
    let collection = db.collection('rules_site');
    //keypath的值
    let keypathVal = "/" + body.projectName + "/" +body.request.$u;
    //插入数据
    collection.insert({'keypath': keypathVal, 'value':url2rules[keypathVal]}, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
  }

  MongoClient.connect(DB_CONN_STR, function(err, db) 
  {
    let keypathVal = "/" + body.projectName + "/" +body.request.$u;

    db.collection('names_site').find({'keyProj': body.projectName, 'keyName': body.ruleName}, function(err, cursor){

      cursor.each(function(error, doc){
        if(dbProj2Names.length == 0){

          if(doc) {
            dbProj2Names.push(doc);
              db.close();
              res.status(200).send({status:`The rulename has already existed!`});

          }else if(dbProj2Names.length <=0){

              db.collection('rules_site').find({'keypath': keypathVal}, function(err, cursor){
                cursor.each(function(error,docx){
                  if(dbUrl2Rules.length == 0) {
                    if(docx){
                      // db.collection('rules_site').remove({'keypath': keypathVal});
                      dbUrl2Rules.push(docx);
                      db.close();
                      res.status(200).send({status:`The url has already existed!`});                  
                    }else if(dbUrl2Rules.length <= 0){
                      insertNames(db, function(result) {
                        // console.log("插入到mongodb的names_site的新记录：", result);
                        insertRules(db, function(result) {
                          // console.log("插入到mongodb中的新记录：", result);
                          db.close();
                          res.status(200).send({status: "succeed!"});
                        });
                      })
                    }                  
                  }                  
                });
              })
              
          }
        }
        
      })
    })
  });
  

};
