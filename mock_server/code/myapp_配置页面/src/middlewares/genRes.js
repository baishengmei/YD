var Mock = require('mockjs');

var arr = {
	"name": {
		"type": "string",
		"value": [5, 20]
	},
	"name2": {
		"type": "regex",
		"value": /^\d{2,4}$/
	},
}
// console.log("结果:"+genJson(arr));
module.exports = genJson;

function genJson(resArr) {
	let res = {};	
	if (Object.prototype.toString.call(resArr) == '[object Array]') {
		var retRes={};
		for(let i=0, len=resArr.length; i<len; i++){
			Object.assign(res, resArr[i])
		}
		for (var obj in res) {
			if(typeof(res[obj])=="object" && Object.prototype.toString.call(res[obj]).toLowerCase()=="[object object]" && !res[obj].length){
				if(!res[obj].type){
					retRes[obj] = res[obj]
				}else if(res[obj].type){
					var type = res[obj].type;
					var value = res[obj].value;
					var itemNum = res[obj].itemNum;

					switch (type) {
						case "regex":
							retRes[obj] = genRegex(value);
							break;

						case "str":
							retRes[obj] = genString(value);
							break;

						case "enum":
							retRes[obj] = genEnum(value);
							break;

						case "int":
							retRes[obj] = genInt(value);
							break;

						case "float":
							retRes[obj] = genFloat(res[obj].value1, value);
							break;

						case "bool":
							retRes[obj] = genBoolean(value);
							break;

						case "email":
							retRes[obj] = genEmail(value);
							break;

						case "object":
							retRes[obj] = genJson(value, retRes.obj);
							break;

						case "ip":
							retRes[obj] = genIp(value);
							break;

						case "url":
							retRes[obj] = genUrl(value);
							break;

						case "thedate":
							retRes[obj] = genDate(res[obj].contentType, value);
							break;

						case "address":
							retRes[obj] = genAddress(res[obj].contentType, value);
							break;

						case "array":
							retRes[obj] = genArray(value, itemNum);
							break;
					}
				}
			}else if((typeof res[obj]=='string')&&(res[obj].constructor==String) && res[obj].replace(/(^\s*)|(\s*$)/g, "")==""){
				retRes[obj] = "";
			}else{
				retRes[obj] = res[obj]
			}
		}
		return retRes;
	}
}

function genRegex(value) {
	var data = Mock.mock({
		'regexp': value
	});
	return data.regexp;
} //例如：console.log(genRegex(/^201414\d{4}/))
function genString(value) {
	if (toString.apply(value) === '[object Array]') {
		var data = Mock.mock('@string(' + value[0] + ',' + value[1] + ')');
		return data;
	} else if ((typeof value == 'string') && (value.constructor == String)) {
		return value;
	}
} //value为指定值或者字符串长度范围
function genEnum(value) {
	if ((typeof value == 'string') && (value.constructor == String)) {
		return value;
	}
}

function genInt(value) {
	if (toString.apply(value) === '[object Array]') {
		var data = Mock.mock('@integer(' + value[0] + ',' + value[1] + ')');
		return data;
	} else if ((typeof value == 'number') && (value.constructor == Number) && (value % 1 == 0)) {
		return value;
	}
}
//value1为小数部分的取值范围;value为整数部分的取值范围或者为float指定值。
function genFloat(value1, value) {
	if ((typeof value == 'number') && (value.constructor == Number)) {
		return value;
	} else if ((toString.apply(value) === '[object Array]') && (toString.apply(value1) === '[object Array]')) {
		var data = Mock.mock('@float(' + value[0] + ',' + value[1] + ',' + value1[0] + ',' + value1[1] + ')');
		return data;
	}
}

function genBoolean(value) {
	if (value == "") {
		return Mock.mock('@boolean');
	} else if (value == "true") {
		return true;
	}else if(value == "false") {
		return false;
	}
}

function genEmail(value) {
	return Mock.mock('@email()');
}

function genIp(value) {
	return Mock.mock('@ip()');
}

function genUrl(value) {
	return Mock.mock('@url()');
}

function genDate(contentType, value) {
	switch (contentType) {
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

function genAddress(contentType, value) {
	switch (contentType) {
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

function genArray(value, itemNum) {
	if (Object.prototype.toString.call(value) == '[object Array]') {
		return value;
	} else if (typeof(value) == "object" && Object.prototype.toString.call(value).toLowerCase() == "[object object]" && !value.length) {
		var innerType = value.type;
		var innerValue = value.value;
		var arr=[];//用于存放数组值
		if(toString.apply(itemNum) == '[object Array]'){
			for(var i=0; i<RandomNumBoth(itemNum[0], itemNum[1]); i++){
				switch (innerType) {
				case "int":
					arr=arr.concat(genInt(innerValue));
					break;

				case "float":
					arr=arr.concat(genFloat(value.value1, innerValue));
					break;

				case "array":
					arr=arr.concat(genArray(innerValue));
					break;

				case "object":
					arr=arr.concat(genJson(innerValue));
					break;

				case "string":
					arr=arr.concat(genString(innerValue))
				}
			}
			return arr;
		}
	}
}
//生成某个范围内的随机整数
function RandomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
}