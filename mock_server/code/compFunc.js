var url2ruleName = require("./url2ruleName.js");
var ruleName2rules = require("./ruleName2rules");
var contraJson = require('./contraJson.js');

var http = require('http');
var url = require('url');
var Mock = require("mockjs");


// 创建服务器
http.createServer(function(request, response) {

	// 解析url,即pathname;解析hash及query、method;
	var pathname = url.parse(request.url).pathname;
	var hash = url.parse(request.url).hash;
	var query = url.parse(request.url).query;
	var method = request.method.toUpperCase()

	//假设实际发送过来的参数部分保存到realiParams
	var realiParams;

	//post方法时，实际接收到的数据块postData
	var receiveData;
	var contentType = "application/json";
	 
	 request.on("data", function(chunk){
	 	receiveData += chunk;
	 });

	// 查询是否存在对应规则的url
	if (!url2ruleName.pathname) {

		// HTTP 状态码: 404 : NOT FOUND;Content Type: application/json
		response.writeHead(404, {
			'content-Type': request.contentType;
		});
		console.log(new Error("The rule isn't existed!"));
		res.end();
	} else {
		// HTTP 状态码: 200 : OK; Content Type: application/json
		// response.writeHead(200, {
		// 	'content-Type': 'application/json'
		// });

		//获取该url对应的规则,及规则定义的content-type
		var rule， content_type; 
		rule = ruleName2rules[url2ruleName.pathname];
		content_typf = rule.contentType;

		//request参数定义部分
		var paraDef = rule.paraDef;
		//响应约束
		var constrRes = rule.constrRes;

		if(contraJson(paraDef, realiParams)){//书写存在问题，目的是 当paraDef匹配成功时
			//遍历rule中的$G，有几个保存几个。
			//然后读取constrRes中的condition，并利用eval执行，若为true，则利用mockjs调用response，并返回该值。
		}


		console.log(rule);
	}

}).listen(8081);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8081/');
