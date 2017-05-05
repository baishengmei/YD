var ruleName2rules = require("./ruleName2rules");

// var ruleJson1 = ruleName2rules.xzxr1.paraDef.$p;
// var ruleJson2 = ruleName2rules.xzxr2.paraDef.$p;
// console.log(ruleJson1);
// var requestJson1 = {
// 	"name" : "whiodf",
// 	"stuNum": "2014140011",
// 	"age": 32,
// 	"grade": "middle",
// 	"pass": "true",
// 	"start": "2014-09-01",
// 	"ending": "2017-03-20",
// 	"name2": 323,
// 	"score": 12.4,
// 	"email": "12@132.com",
// 	"ip": "123.233.23.8",
// 	"url": "http://xhi.ar/kwcnzm",
// 	"people":{
// 		"nameV": "122",
// 		"ageV": 33
// 	},
// 	"scorex": [12, 22, 3, 1],
// 	"mydate": "13:23:06"
// };


// contraJson(ruleJson1, requestJson1);
module.exports = contraJson;
//整数可以指定值，也可以设置整数的取值范围
function contraInt(value, obj){
	if(toString.apply(value) === '[object Array]'){
		try{
			if(obj<value[0] || obj>value[1]){
				throw("The " +obj+ " isn't the type of int!");
			}
		}catch(err){
			console.log(new Error(err));
		}
	}else if ((typeof value=='number') && (value.constructor==Number) && (value%1==0)){
	
		if(value !== obj){
			console.log(new Error("The " + obj + " is wrong!"));
		}
	}
}
//value1为小数部分的取值范围;value为整数部分的取值范围或者为float指定值。
//float类型分为两类，（1）指定值；（2）指定整数部分的范围和小数部分的范围，若只指定整数或者小数部分的值，则可以将范围数组设置为[3,3],表示整数部分等于3，同理小数部分则表示保留三位小数。
function contraFloat(value1, value, obj){
	if((typeof value=='number') && (value.constructor==Number)){
		if(value !== obj){
			console.log(new Error("The " + obj + " is wrong!"));
		}
	}else if ((toString.apply(value) === '[object Array]') && (toString.apply(value1) === '[object Array]')){
		if(obj<value[0] || obj>value[1] || (obj.toString().split('.')[1].length)<value1[0] || (obj.toString().split('.')[1].length)>value1[1]){
			console.log(new Error("The " +obj+ " doesn't conform the rule!"));
		}
	}
}
//可指定bool值，若置空（即：不选择）
function contraBoolean(value, obj){
	if(value == ""){
		if(obj !== true && obj !== false){
			console.log(new Error('The '+obj+" isn't boolean!"))
		}
	}else if(value !== obj){
		console.log(new Error('The '+obj+" should be"+value+"!"));
	}
}
//可以指定数组值，则对比若不完全一致则不相等。也可以指定每一项的类型(每一项的类型相同)为int、float、array、object
function contraArray(value, obj){
	if(Object.prototype.toString.call(value)=='[object Array]'){

		for(var i in obj){
			if(obj[i] !== value[i]){
				console.log(new Error("The "+obj+" doesn't equal the rule!"));
			}
		}
	
		// if(value.sort().toString() !== obj.sort().toString()){
		// 	console.log(new Error("The "+obj+" doesn't equal the rule!"));
		// }//数组排序后相同则视为相等
	}else if(typeof(value) == "object" && Object.prototype.toString.call(value).toLowerCase() == "[object object]" && !value.length){
		var innerType = value.type;
		var innerValue = value.value;

		for(var i in obj){
			if(innerType == "int"){
				contraInt(innerValue, obj[i])
			}else if(innerType == "float"){
				contraFloat(value.value1, innerValue, obj[i]);
			}else if(innerType == "array"){
				contraFloat(value.value1, innerValue, obj[i]);
			}else if(innerType == "object"){
				contraJson(innerValue, obj[i]);
			}
		}
	}
}
function contraRegex(value, obj){
	if(!value.test(obj)){
		console.log(new Error("The "+obj+ " doesn't conform the type of regex!"))
	}
}
function contraString(value, obj){
	if(toString.apply(value) === '[object Array]'){
		if(eval('/^\\w\{'+ value[0]+','+value[1]+'\}$/').test(obj) == false){
		console.log(new Error("The " +obj+ " don't conform the rule!"));
		}
	}else if ((typeof value=='string')&&(value.constructor==String)){
		if(value !== obj){
			console.log(new Error("The" + obj + "is wrong!"));
		}
	}
}
//只针对枚举一项的情况，如果是多项，可以设置成数组的情况。
function contraEnum(value, obj){
	if((typeof value=='string')&&(value.constructor==String)){
		var flag = 0;
		var objArr = obj.split(',').unique();
		for(var j in objArr){
			for(var i in value.split(',')){//replace(/(^\s*)|(\s*$)/g, "")目的是去掉枚举项前后空格
				if(value.split(',')[i].replace(/(^\s*)|(\s*$)/g, "") == objArr[j]){
					flag+=1;//枚举中的重复项只比较一次
				};
				break;
			}
		}
		
		if(flag !== obj.split(',').length){
			console.log(new Error("The "+ obj + " don't exist!"))
		}
	}
}
function contraEmail(obj){
	if(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(obj) == false){
		console.log(new Error('The '+obj+" isn't qualified email"));
	}
}
function contraIp(obj){
	obj.split('.').forEach(function(item){
		if(item<0 || item>255){
			console.log(new Error('The '+obj+" isn't legal ip!"));
		}
	})
}
function contraUrl(obj){
	if(/^\w+:\/\/\w+\.\w+\/\w+/.test(obj) == false){
		console.log(new Error('The '+obj+"isn't legal url"));
	}
}
function contraDate(value, obj, contentType){
	// console.log(contentType);
	switch (contentType)
	{
		case "date":
		if(value !== ""){
			if(value !== obj){
				console.log(new Error('The'+obj+"should be"+value+"!"))
			}
		}else if(/\d{4}-\d{2}-\d{2}/.test(obj) == false){
			console.log(new Error('The'+obj+"is not the right date"));
		}
		break;
		case "time":
		if(/\d{2}:\d{2}:\d{2}/.test(obj) == false){
			console.log(new Error('The'+obj+"is not the right time"));
		}
		break;
		case "date_time":
		if(/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(obj) == false){
			console.log(new Error('The'+obj+"is not the right date_time"));
		}
		break;
	}

}
function contraAddress(value, obj, contentType){
	if(contentType == "regin" || contentType == "country" || contentType == "city" || contentType == "province"){
		if(/^[\u4e00-\u9fa5]+$/.test(obj) == false){
			console.log(new Error('The'+obj+"should be"+value+"!"));
		}
	}else if(contentType == "zip"){
		if(/^\d{6}$/.test(obj) == false){
			console.log(new Error('The '+obj+" should be"+value+"!"));
		}
	}
}
function contraJson(rulJson, resJson){
	if(typeof(rulJson) == "object" && Object.prototype.toString.call(rulJson).toLowerCase() == "[object object]" && !rulJson.length){

		for(var obj in rulJson){

			// var isRight = true;

			var type = rulJson[obj].type;
			var value = rulJson[obj].value;

			// 判断rulJson中每一项的type，并根据type判断resJson中对应的obj是否符合ruleJson中的规则
			switch(type)
			{
				case "regex":
				contraRegex(value, resJson[obj]);
				break;

				case "string":
				contraString(value, resJson[obj]);
				break;

				case "enum":
				contraEnum(value, resJson[obj]);
				break;

				case "int":
				contraInt(value, resJson[obj]);
				break;
				//小数部分的取值
				case "float":
				//value1是指小数部分的取值
				contraFloat(rulJson[obj].value1, value, resJson[obj]);
				break;
				//如果不选择，则boolean保存为空。
				case "boolean":
				contraBoolean(value, resJson[obj]);
				break;

				case "email":
				contraEmail(resJson[obj]);
				break;

				case "object": contraJson(value, resJson[obj]);
				break;

				case "ip": contraIp(resJson[obj]);
				break;

				case "url": contraUrl(resJson[obj]);
				break;
				////一级选择date类型，二级选择time/date/date-time类型，三级指定值或留空
				case "date": contraDate(value, resJson[obj], rulJson[obj].contentType);
				break;

				case "address": contraAddress(value, obj, rulJson[obj].contentType);
				break;

				case "array": contraArray(value, resJson[obj]);
				break;				

			}
		}
		
	}
}

//数组去重函数
Array.prototype.unique = function(){
 var res = [];
 var json = {};
 for(var i = 0; i < this.length; i++){
  if(!json[this[i]]){
   res.push(this[i]);
   json[this[i]] = 1;
  }
 }
 return res;
}



