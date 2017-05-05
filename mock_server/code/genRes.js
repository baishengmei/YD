var ruleName2rules = require("./ruleName2rules");
var Mock = require('mockjs');

function genJson(res){
	if(typeof(res) == "object" && Object.prototype.toString.call(res).toLowerCase() == "[object object]" && !res.length){
		for(var obj in res){

			var type = res[obj].type;
			var value = res[obj].value;

			switch (type)
			{
				case "regex":
				res.obj = genRegex(value);
				break;

				case "string":
				res.obj = genString(value);
				break;

				case "enum":
				res.obj = genEnum(value);
				break;

				case "int":
				res.obj = genInt(value);
				break;

				case "float":
				res.obj = genFloat(res[obj].value1, value);
				break;

				case "boolean":
				res.obj = genBoolean(value);
				break;

				case "email":
				res.obj = genEmail(value);
				break;

				case "object":
				res.obj = genJson(value);
				break;

				case "ip":
				res.obj = genIp(value);
				break;

				case "url":
				res.obj = genUrl(value);
				break;

				case "date":
				res.obj = genDate(res[obj].contentType, value);
				break;

				case "address":
				res.obj = genAddress(res[obj].contentType, value);
				break;

				case "array":
				res.obj = genArray(value);
				break;
			}
		}
	}
}
function genRegex(value){
	var data = Mock.mock({
		'regexp': value
	});
	return data.regexp;
}//例如：console.log(genRegex(/^201414\d{4}/))
function genString(value){
	if(toString.apply(value) === '[object Array]'){
		var data = Mock.mock('@string('+value[0]+','+value[1]+')');
		return data;
	}else if ((typeof value=='string')&&(value.constructor==String)){
		return value;
	}
}//value为指定值或者字符串长度范围
function genEnum(value){
	if((typeof value=='string')&&(value.constructor==String)){
		return value;
	}
}
function genInt(value){
	if(toString.apply(value) === '[object Array]'){
		var data = Mock.mock('@integer('+value[0]+','+value[1]+')');
		return data;
	}else if ((typeof value=='number') && (value.constructor==Number) && (value%1==0)){
		return value;
	}
}
//value1为小数部分的取值范围;value为整数部分的取值范围或者为float指定值。
function genFloat(value1, value){
	if((typeof value=='number') && (value.constructor==Number)){
		return value;
	}else if ((toString.apply(value) === '[object Array]') && (toString.apply(value1) === '[object Array]')){
		var data = Mock.mock('@float('+value[0]+','+value[1]+','+value1[0]+','+value1[1]+')');
		return data;
	}
}
function genBoolean(value){
	if(value == ""){
		return Mock.mock('@boolean');
	}else if(value == true || value == false){
		return value;
	}
}
function genEmail(value){
	return Mock.mock('@email()');
}

function genIp(value){
	return Mock.mock('@ip()');
}
function genUrl(value){
	return Mock.mock('@url()');
}
function genDate(contentType, value){
	switch(contentType)
	{
		case "date":
		return Mock.mock('@date("yyyy-MM-dd")');
		break;

		case "time":
		return Mock.mock('@time("HH:mm:ss")');
		break;

		case "date_time":
		return Mock.mock('@datetime("yyyy-MM-dd A HH:mm:ss")');
		break;
	}
}
function genAddress(contentType, value){
	switch(contentType)
	{
		case "regin":
		return Mock.mock('@region()');
		break;

		case "country":
		return Mock.mock('@country(true)');
		break;

		case "city":
		return Mock.mock('@city(true)');
		break;

		case "province":
		return Mock.mock('@province()');
		break;

		case "zip":
		return Mock.mock('@region()');
		break;
	}
}
function genArray(value){
	if(Object.prototype.toString.call(value)=='[object Array]'){
 		return value;
	}else if(typeof(value) == "object" && Object.prototype.toString.call(value).toLowerCase() == "[object object]" && !value.length){
		var innerType = value.type;
		var innerValue = value.value;
		switch(innerType)
		{
			case "int":
			genInt(innerValue);
			break;

			case "float":
			genFloat(value.value1, innerValue);
			break;

			case "array":
			genArray(innerValue);
			break;

			case "object":
			genJson(value);
			break;
		}
	}
}