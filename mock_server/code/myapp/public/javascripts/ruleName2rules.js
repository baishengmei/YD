var ruleName2rules = {
	"xzxr1": {

		"$c": "application/x-www-form-urlencoded",
		"$m": "post",
		"$b": {
			//英文姓名
			"name": {
				"type": "string",
				"value": [5, 20]
			},
			"name2": {
				"type": "regex",
				"value": /^\d{2,4}$/
			},
		},
		"$h": {
			"abc": "123",
			"age": {
		      "a": 2,
		      "b": 6
		    }
		},
		"$q": {},
		"$G1": "true && $b.name2 > 10",

		//constrRes：response中的条件与响应
		"constrRes": [{
			"condition": "$G1",
			"response": {
				//成绩，且整数部分取值介于60~100之间，小数部分保留小数位数介于1~2	
				// "score": {
				// 	"type": "float",
				// 	"value": [60, 100],
				// 	"value1": [1, 2]
				// },
				"name": {
				"type": "string",
				"value": [5, 20]
			},
			"name2": {
				"type": "regex",
				"value": /^\d{2,4}$/
			}
			}
		}, 
		{
			// "condition": "$G2",
			// "response": {
			// 	"warning": "Sorry!It doesn't have this student!"
			// }
		}]
	},
	"xzxr2": {

		"$c": "application/json",

		//paraDef:request中的参数定义部分
		// "paraDef":{
		"$m": "get",
		"$q": {
			"$query": "queryString"
		},
		"$hash": {
			"$hashx": "hashString"
		},
		// },

		//constrRes：response中的条件与响应
		"constrRes": [{
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
	"yexr1": {

		"$c": "application/json",

		//paraDef:request中的参数定义部分
		// "paraDef":{
		"$m": "get",
		// },

		//constrRes：response中的条件与响应
		"constrRes": [{
			"condition": "$G1",
			"response": {
				//成绩，且整数部分取值介于60~100之间，小数部分保留小数位数介于1~2	
				"score": {
					"type": "float",
					"inte": [60, 100],
					"deci": [1, 2]
				},
			}
		}]
	}
}

module.exports = ruleName2rules;