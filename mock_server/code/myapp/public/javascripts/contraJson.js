module.exports = contraJson;

//整数可以指定值，也可以设置整数的取值范围
// var errMsg;
function contraJson(rulJson, resJson){
	var ruleJsonLength;
	ruleJsonLength = getJsonLength(rulJson);
	if(ruleJsonLength == 0){
		return true;
	}else{
		var temp;
		temp = 0;
		resJson = decQuotation({"a":1, "b":2}, resJson);
		if(typeof(resJson)=="object" && Object.prototype.toString.call(resJson).toLowerCase()=="[object object]" && !resJson.length){

			for(var obj in rulJson){
				if(!rulJson[obj].type){
					if((typeof rulJson[obj]=='number') && (rulJson[obj].constructor==Number)){
						contraInt(rulJson[obj], resJson[obj]);
					}else if((typeof rulJson[obj]=='number')&&(rulJson[obj].constructor==Number&&(rulJson[obj]%1!==0))){
						contraFloat(rulJson[obj], resJson[obj]);
					}else if((typeof rulJson[obj]=='string')&&(rulJson[obj].constructor==String)){
						contraString(rulJson[obj], resJson[obj]);
					}else if(Object.prototype.toString.call(rulJson[obj])=='[object Array]'){
						contraArray(rulJson[obj], resJson[obj]);
					}else if(Object.prototype.toString.call(rulJson[obj]).toLowerCase()=='[object object]'){
						contraJson(rulJson[obj], resJson[obj]);
					}
					temp+=1;
				}else{
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

						case "address": contraAddress(value, resJson[obj], rulJson[obj].contentType);
						break;

						case "array": contraArray(value, resJson[obj]);
						break;		

						case undefined:
						if(resJson[obj] !== rulJson[obj]){
							throw new Error("The "+resJson[obj]+" is not match!");
						}
						break;

					}
					temp+=1;
				}	
			}
			if(temp == ruleJsonLength){
				return true; 
			}	
		}else{
			throw new Error("The req-param " +resJson+ " isn't legal Json type!")
		}
	}
	
}
//输入value为规则中的value值，是一个范围数组或者指定值。。obj为前端发送过来的实际请求值
function contraInt(value, obj){
	obj = decQuotation(12, obj);
	if(toString.apply(value) === '[object Array]'){
		try{
			if(obj<value[0] || obj>value[1]){
				throw new Error("The req-param " +obj+ " isn't legal integer type!");
			}
		}catch(err){
			console.log(new Error(err));
		}
	}else if ((typeof value=='number') && (value.constructor==Number) && (value%1==0)){
	
		if((value) !== obj){
			throw new Error("The req-param " +obj+ " isn't legal integer type!");
		}
	}
}
//value1为小数部分的取值范围;value为整数部分的取值范围或者为float指定值。
//float类型分为两类，（1）指定值；（2）指定整数部分的范围和小数部分的范围，若只指定整数或者小数部分的值，则可以将范围数组设置为[3,3],表示整数部分等于3，同理小数部分则表示保留三位小数。
function contraFloat(value1, value, obj){
	obj = decQuotation(12.4, obj);
	if((typeof value=='number') && (value.constructor==Number)){
		if(value !== obj){
			throw new Error("The req-param " +obj+ " isn't legal float type!");
		}
	}else if ((toString.apply(value) === '[object Array]') && (toString.apply(value1) === '[object Array]')){
		if(obj<value[0] || obj>value[1] || (obj.toString().split('.')[0].length)<value1[0] || (obj.toString().split('.')[0].length)>value1[1]){
			throw new Error("The req-param " +obj+ " isn't legal float type!");
		}
	}
}
//可指定bool值，若置空（即：不选择）
function contraBoolean(value, obj){
	obj = decQuotation(true, obj);
	if(value == ""){
		if(obj !== true && obj !== false){
			throw new Error("The req-param " +obj+ " isn't legal Boolean type!")
		}
	}else if(value !== obj){
		throw new Error("The req-param " +obj+ " isn't legal Boolean type!");
	}
}
//可以指定数组值，则对比若不完全一致则不相等。也可以指定每一项的类型(每一项的类型相同)为int、float、array、object
function contraArray(value, obj){
	obj = decQuotation([1,2,4], obj);
	if(Object.prototype.toString.call(value)=='[object Array]'){
		for(var i=0, len=obj.length; i<len; i++){
			if((typeof value[i]=='number') && (value[i].constructor==Number)){
				if(obj[i].replace(/(^\s*)|(\s*$)/g, "") !== value[i].toString().replace(/(^\s*)|(\s*$)/g, "")){
					throw new Error("The req-param " +obj+ " isn't legal Array type!");
				}
			}else if(typeof(value[i]) == "object" && Object.prototype.toString.call(value[i]).toLowerCase() == "[object object]" && !value[i].length){
				contraJson(value[i], obj[i]);
			}else if(Object.prototype.toString.call(value[i])=='[object Array]'){
				contraArray(value[i], obj[i]);
			}else if((typeof value[i]=='string')&&(value[i].constructor==String)){
				if(obj[i].replace(/(^\s*)|(\s*$)/g, "") !== value[i].replace(/(^\s*)|(\s*$)/g, "")){
					throw new Error("The req-param "+obj+" isn't legal Array type!");
				}
			}
			
		}
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
		throw new Error("The req-param " +obj+ " isn't legal Regex type!")
	}
}
function contraString(value, obj){
	if(toString.apply(value) === '[object Array]'){
		if(eval('/^\\w\{'+ value[0]+','+value[1]+'\}$/').test(obj) == false){
		throw new Error("The req-param " +obj+ " isn't legal String type!");
		}
	}else if ((typeof value=='string')&&(value.constructor==String)){
		if(value !== obj){
			throw new Error("The req-param " +obj+ " isn't legal String type!");
		}
	}
}
//只针对枚举一项的情况，如果是多项，可以设置成数组的情况。
function contraEnum(value, obj){
	if((typeof value=='string')&&(value.constructor==String)){
		var flag = 0;
		var objArr = obj.split(',').unique();
		for(var j=0, len=objArr.length; j<len; j++){
			for(var i=0, leng=value.split(',').length; i<leng; i++){   //replace(/(^\s*)|(\s*$)/g, "")目的是去掉枚举项前后空格
				if(value.split(',')[i].replace(/(^\s*)|(\s*$)/g, "") == objArr[j].replace(/(^\s*)|(\s*$)/g, "")){
					flag+=1;//枚举中的重复项只比较一次
					break;
				};	
			}
		}
		
		if(flag !== obj.split(',').length){
			throw new Error("The req-param " +obj+ " isn't legal Enum type!")
		}
	}
}
function contraEmail(obj){
	if(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(obj) == false){
		throw new Error("The req-param " +obj+ " isn't legal Email type!");
	}
}
function contraIp(obj){
	if(obj.split('.').length == 4){
		obj.split('.').forEach(function(item){
			if(!(/^\d+$/.test(item)) || parseInt(item)<0 || parseInt(item)>255){
				throw new Error("The req-param " +obj+ " isn't legal Ip type!");
			}
		})
	}else{
		throw new Error("The req-param " +obj+ " isn't legal Ip type!");
	}
	
}
function contraUrl(obj){
	if(/^(\w+):(\/\/)\w+(\.)\w+/.test(obj) == false){
		throw new Error("The req-param " +obj+ " isn't legal Url type!");
	}
}
function contraDate(value, obj, contentType){
	switch (contentType)
	{
		case "date":
		if(/\d{4}-\d{2}-\d{2}/.test(obj) == false){
			throw new Error("The req-param " +obj+ " isn't legal data type!");
		}
		break;
		case "time":
		if(/\d{2}:\d{2}:\d{2}/.test(obj) == false){
			throw new Error("The req-param " +obj+ " isn't legal time type!");
		}
		break;
		case "date_time":
		if(/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(obj) == false){
			throw new Error("The req-param " +obj+ " isn't legal data_time type!");
		}
		break;
	}

}
function contraAddress(value, obj, contentType){
	if(contentType == "region" || contentType == "country" || contentType == "city" || contentType == "province"){
		if(/^[\u4e00-\u9fa5]+$/.test(obj) == false){
			throw new Error("The req-param " +obj+ " isn't legal Address type!");
		}
	}else if(contentType == "zip"){
		if(/^\d{6}$/.test(obj) == false){
			throw new Error("The req-param " +obj+ " isn't legal Address type!");
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

//获取json长度
function getJsonLength(json) {
	var jsonLength = 0;
	for (var i in json) {
		jsonLength++;
	}
	return jsonLength;
}
//将某些指定类型去掉双引号
function decQuotation(vari, varistr) {
	//整数,包括int和float型等，如123.4=>"123.4"
	if((typeof vari=='number') && (vari.constructor==Number) && (vari%1==0)){
		if((typeof varistr=='number') && (varistr.constructor==Number) && (varistr%1==0)){
			return varistr;
		}else{
			return parseInt(varistr);
		}
		
	}
	//小数
	else if((typeof vari=='number') && (vari.constructor==Number) && (vari%1!==0)){
		if((typeof varistr=='number') && (varistr.constructor==Number) && (varistr%1!==0)){
			return varistr;
		}else{
			return parseFloat(varistr);
		}
	}
	//数组，如[1,2,4]=>"[1,2,4]"
	else if(toString.apply(vari) === '[object Array]'){
		if(toString.apply(varistr) === '[object Array]'){
			return varistr;
		}else{
			return varistr.split(",");
		}
	}
	//json对象，如{"a":1, "b":2}=>"{"a":1, "b":2}"
	else if(typeof(vari) == "object" && Object.prototype.toString.call(vari).toLowerCase() == "[object object]" && !vari.length){
		if(typeof(varistr) == "object" && Object.prototype.toString.call(varistr).toLowerCase() == "[object object]" && !varistr.length){
			return varistr;
		}else{
			return JSON.parse(varistr);
		}
	}
	//字符串
	else if((typeof vari=='string')&&(vari.constructor==String)){
		return varistr;
	}
	//布尔值
	else if(typeof vari == "boolean"){
		return /^true$/.test(varistr) || !(/^false$/.test(varistr));
	}
}