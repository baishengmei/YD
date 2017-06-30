import { indexPage } from '../config';

/* eslint no-param-reassign: 0 */
export default async(req, res) => {
	let url2ruleName = {};
	let ruleName2rules = {};
	var reqB = {};
  	const method = req.method.toUpperCase();
  	const body = req.body;
//传送过来的body中$b/$p/$h等均保存在一个数组中，该函数将其转化为对象的格式
  	function paramsCh(bphq) {
  		var xobj = {};
  		if(Object.prototype.toString.call(bphq) == '[object Array]'){
  			for( let i=0; i<bphq.length; i++ ){
	  			xobj = Object.assgin({}, bphq[i]);
	  		}
	  		return xobj;
  		}
  		
  	}
  	// reqB = paramsCh(body.request.$b)
  	//将接收到的body数据进行格式处理，保存成待保存的数据格式,实际保存的url链接为"项目组名/url"
  	url2ruleName["/" + body.projectName + "/" +body.request.$u] = body.ruleName;
  	ruleName2rules[body.ruleName] = {
  		"$c": body.request.$c,
  		"$m": body.request.$m,
  		// "$b": body.request.$b,
  	}
  	res.status(200).send({status: "succeed!"});
  	console.log(body.request.$b,"reqB的值")
  	console.log(body, "body")
};


