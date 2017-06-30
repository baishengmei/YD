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
	  			xobj = Object.assign(xobj, bphq[i]);
	  		}
	  		return xobj;
  		}else{
        return;
      }
  	}
  	reqB = paramsCh(body.request.$b);
    reqH = paramsCh(body.request.$h);
    reqQ = paramsCh(body.request.$q);
  	//将接收到的body数据进行格式处理，保存成待保存的数据格式,实际保存的url链接为"项目组名/url"
  	url2ruleName["/" + body.projectName + "/" +body.request.$u] = body.ruleName;
  	ruleName2rules[body.ruleName] = {
  		"$c": body.request.$c,
  		"$m": body.request.$m,
  		"$b": reqB,
      "$h": reqH,
      "$q": reqQ,
  	};


  	res.status(200).send({status: "succeed!"});
  	console.log(ruleName2rules,"reqB的值")
  	console.log(body, "body")
};


