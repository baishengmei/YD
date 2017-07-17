var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mockserver'; // 数据库为 mockserver

/* eslint no-param-reassign: 0 */
export default async(req, res) => {

	// let url2ruleName = {};
	let ruleName2rules = {};
	let reqB = {};
  let reqH = {};
  let reqQ = {};
  let response;//用于保存response的数据
  const method = req.method.toUpperCase();
  const body = req.body;
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
	ruleName2rules["/" + body.projectName + "/" +body.request.$u] = {
    "rulename": body.ruleName,
		"reqc": body.request.$c,
		"reqm": body.request.$m,
		"reqb": reqB || {},
    "reqh": reqH || {},
    "reqq": reqQ || {},
	};

  //用于保存约束条件
  if(body.request.$G == undefined){
    ruleName2rules["/" + body.projectName + "/" +body.request.$u]["G1"] = "";
  }else{
    for(let i in body.request.$G){
      ruleName2rules["/" + body.projectName + "/" +body.request.$u][i.substring(1)] = body.request.$G[i];
    }
  }

  //用于将配置页面的响应部分传给node后端
  response = body.response.notempty();
  for(let i=0; i<response.length; i++){
    ruleName2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'] = [];
    ruleName2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i] = {};
    ruleName2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['condition'] = response[i]['$i'];
    ruleName2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['ressc'] = response[i]['$sc'];
    ruleName2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['resc'] = response[i]['$c'];
    ruleName2rules["/" + body.projectName + "/" +body.request.$u]['constrRes'][i]['response'] = response[i]['response'];
  }

  //将rules和names出入到数据库
  let insertRules = function(db, callback) {  
    //连接到表 site
    let collection = db.collection('rules_site');
    //插入数据
    collection.insert({'keypath': "/" + body.projectName + "/" +body.request.$u, 'value':ruleName2rules["/" + body.projectName + "/" +body.request.$u]}, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
  }
  MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log("连接成功！");
      db.collection('rules_site').find({'keypath': })
      insertRules(db, function(result) {
          console.log(result);
          db.close();
      });
  });
  
	res.status(200).send({status: "succeed!"});
	console.log(ruleName2rules,"ruleName2rules的值") 
};
