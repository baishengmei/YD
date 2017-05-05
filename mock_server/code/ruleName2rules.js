var ruleName2rules = {
	"xzxr1": {

		"contentType": "application/json",

		//paraDef:request中的参数定义部分
		"paraDef":{
			"$m":"post",
			"$p":{
				//英文姓名
				"name": {
						"type": "string",
						"value": [5, 20]
					},
				"name2": {
					"type": "regex",
					"value": /^\d{2,4}$/
				},
				//学号201414****
				"stuNum": {
					"type": "regex",
					"value": /^201414\d{4}/ 
				},		
				//age=1~101							
				"age": {
					"type": "int",
					"value": 33
				},				
				//年级		
				"grade": {
					"type": "enum",
					"value": "excelent, middle,normal"
				}, 
				//bool									
				"pass": {
					"type": "boolean",
					"value": ""
				},
				"people":{
					"type": "object",
					"value":{
						"nameV": {
							"type": "string",
							"value": [2, 10]
						},
						"ageV": {
							"type": "int",
							"value": [1, 100]
						}
					}
				},
				//入学时间
				"start": {
					"type": "date",
					"contentType": "date",
					"value": ""
				},
				"email": {
					"type": "email"
				},
				"ip": {
					"type": 'ip'
				},
				"url":{
					"type": "url"
				},
				//毕业时间
				"ending": {
					"type": "date",
					"contentType": "date",
					"value": ""
				},
				"score": {
					"type": "float",
					"value": [1, 20],//整数部分
					"value1": [0, 12]//小数部分，若value为指定值，那么默认将value1设为“”。
				},
				"scorex": {
					"type": "array",
					"value":{
						"type": "int",
						"value": [1, 40]
					}
				},
				"mydate":{
					"type": "date",
					"contentType": "time",
					"value":""
				}
			}
		},

		//$G1:request参数约束
		"$G1": "true&&$p.start<$p.ending",
		"$G2": "$p.start>$p.ending",

		//constrRes：response中的条件与响应
		"constrRes":[{
			"condition":"$G1",
			"response": {
				//成绩，且整数部分取值介于60~100之间，小数部分保留小数位数介于1~2	
				"score": {
					"type": "float",
					"value": [60,100],
					"value1": [1,2]
				},
			}
		}, {
			"condition":"$G2",
			"response": {
				"warning": "Sorry!It doesn't have this student!"
			}
		}]
	},
	"xzxr2":{

		"contentType": "application/json",

		//paraDef:request中的参数定义部分
		"paraDef":{
			"$m":"get",
			"$q":{
				"$query": "queryString"
			},
			"$hash": {
				"$hashx": "hashString"
			}
		},

		//constrRes：response中的条件与响应
		"constrRes":[{
			"condition": "$G1",
			"response": {
				//姓名
				"name": {
					"type": "string",
					"value": [5, 20]
					},
				//学号201514****
				"stuNum": {
					"type": "regex",
					"value": /^201514\d{4}/ 
				}		
			}
		}]
	},
	"yexr1":{

		"contentType": "application/json",

		//paraDef:request中的参数定义部分
		"paraDef":{
			"$m":"get",
			},

		//constrRes：response中的条件与响应
		"constrRes":[{
			"condition": "$G1",
			"response": {
				//成绩，且整数部分取值介于60~100之间，小数部分保留小数位数介于1~2	
				"score": {
					"type": "float",
					"inte": [60,100],
					"deci": [1,2]
				},
			}
		}]
	}
}

module.exports = ruleName2rules;