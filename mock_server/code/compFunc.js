var url2ruleName = require("./url2ruleName.js");
var ruleName2rules = require("./ruleName2rules");

var http = require('http');
var url = require('url');
var Mock = require("mockjs");

//遍历并对比json
function contraJson(rulJson, resJson){
	if(typeof(rulJson) == "object" && Object.prototype.toString.call(rulJson).toLowerCase() == "[object object]" && !rulJson.length){
		for(var obj in rulJson){

			var type = ruleJson[obj].type;
			var value = ruleJson[obj].value;

			// 判断rulJson中每一项的type，并根据type判断resJson中对应的obj是否符合ruleJson中的规则
			if(type == "regex"){
				if(!value.test(resJson.obj)){
					console.log(new Error("The obj isn't the type of regex!"));
				}
			}else if(type == "string"){
				if(toString.apply(value) === '[object Array]'){
					if(/^\w{value[0], value[1]}$/.test(resJson.obj) == false){
					console.log(new Error("The" +resJson.obj+ "don't conform the rule!"));
					}
				}else if ((typeof value=='string')&&(value.constructor==String)){
					if(value !== resJson.obj){
						console.log(new Error("The" + resJson.obj + "is wrong!"));
					}
				}
			}else if(type == "enum"){
				if((typeof value=='string')&&(value.constructor==String)){
					for(var i in value.split(',')){

						var flat=1;
						if(value.split(",")[i] == resJson.obj){
							flat = 0;
						}
						if(flat == 1){
							console.log(new Error("The"+ resJson.obj + "don't exist!"))
						}
					}
				}
			}else if(type == "int"){
				if(toString.apply(value) === '[object Array]'){
					if(/^\d{1, 100}$/.test(resJson.obj) == false){
					console.log(new Error("The" +resJson.obj+ "isn't the type of int!"));
					}
				}else if ((typeof value=='number') && (value.constructor==Number) && (value%1==0)){
					if(value !== resJson.obj){
						console.log(new Error("The" + resJson.obj + "is wrong!"));
					}
				}
			}else if(type == "float"){

				var value1 = rulJson[obj].value1;//小数部分的取值
				if((typeof value=='number') && (value.constructor==Number)){
					if(value !== resJson.obj){
						console.log(new Error("The" + resJson[obj] + "is wrong!"));
					}
				}else if ((toString.apply(value) === '[object Array]') && (toString.apply(value1) === '[object Array]')){
					if((/^\d{1, 100}$/.test(parseInt(resJson.obj)) == false) || (resJson.obj.split('.')[1].length)<value1[0] || (resJson.obj.split('.')[1].length)>value1[1]){
						console.log(new Error("The" +resJson.obj+ "doesn't conform the rule!"));
					}
				}
			}else if(type == "boolean"){//如果不选择，则boolean保存为空。
				if(value == ""){
					if(resJson.obj !== "true" && resJson.obj !== "false"){
						console.log(new Error('The'+resJson.obj+"isn't boolean!"))
					}
				}else if(value !== resJson.obj){
					console.log(new Error('The'+resJson.obj+"should be"+value+"!"));
				}
			}else if(type == "email"){
				if(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(resJson.obj) == "false"){
					console.log(new Error('The'+resJson.obj+"should be"+value+"!"));
				}
			}//还差ip、数组、对象、url、date及address。
		}
	}
}

// 创建服务器
http.createServer(function(request, response) {

	// 解析url,即pathname
	var pathname = url.parse(request.url).pathname;
	// 解析hash及query、method
	var hash = url.parse(request.url).hash;
	var query = url.parse(request.url).query;
	var method = request.method.toUpperCase()
	//post方法时，实际接收到的数据块postData
	var receiveData;
	var contentType = "application/json";
	 
	 request.on("data", function(chunk){
	 	receiveData += chunk;
	 });

	// 查询是否存在对应规则的url
	if (!url2ruleName.pathname) {

		// HTTP 状态码: 404 : NOT FOUND
		// Content Type: application/json
		response.writeHead(404, {
			'content-Type': request.contentType;
		});
		console.log(new Error("The rule isn't existed!"));
		res.end();
	} else {


		// HTTP 状态码: 200 : OK
		// Content Type: application/json
		// response.writeHead(200, {
		// 	'content-Type': 'application/json'
		// });

		//该url对应的规则,及规则定义的content-type
		var rule， content_type; 
		rule = ruleName2rules[url2ruleName.pathname];

		content_typf = rule.contentType;

		//request参数定义部分
		var paraDef = rule.paraDef;
		//响应约束
		var constrRes = rule.constrRes;

		for(var obj in paraDef){
			switch(obj){
				case "$m": if(paraDef[obj] !== method){
					//报错
				};
				break;
				case "$p": if(paraDef[obj]) !== 
			}

		}		

		console.log(rule);
	}

}).listen(8081);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8081/');
