module.exports = {
	"xmz1":{
		"rule11":{
			"request":{
				"url":"/xmz1/rule11",
				"method":"get",
				"headers":{
					
				},
				"parameters":{
					"para11": /[1-9]\d*$/,			//正则
					"para12": {
						"type": "int",
						"value": [0, 101]
					},									//整形，且取值范围为0~101
					"para13": "required",				//不为空
					"para14": ["aaa", "bbb", "ccc"], 	//枚举型
					"para15": {
						"type": "float",
						"value": [1,6],
						"value2": [0,100]
					},									//小数，且整数部分取值介于0~100之间，小数部分保留小数位数介于1~6
					"para16": {
						"type": "boolean",
						"value": "*"
					},//bool
					"para17": {
						"type": "string",
						"value": [5, 20]
					},//字符串，长度介于5~20；"value":"abc";"value":"*"表示不指定字符串长度。
					"para18":{
						"type": "hanzi",
						"value": [2,7]//汉字，长度介于2~7；也可指定长度7；也可设置"*",表示任意值；
					},
					"para19": {
						"type": "array",
						"value": {
							"type": "int",
							"value": [0,100]
						}
					},
					"para20": {
						"type": "array",
						"value": {
							"type": "string",
							"value": [5, 20]
						}
					},
					"para21": {
						"type": "array",
						"value": {
							"type": "array",
							"value" :{
								"type" : "string",
								"value": [5, 20]
							}
						}
					},//当type为array时，必存在typevalue和value。
					"para22": {
						"type": "object",
						"value":{
							"parax1": {
								"type": "int",
								"value": [0, 100]
							},
							"parax2": {
								"type": "object",
								"value":{
									"paraxx1": {
										"type": "int",
										"value": [0, 100]
									}
								}
							}
						}
					},//当type为object时，会重新json数据的选择。
					"para23":{
						"type": "@",
						"value": ["*@163.com", "*@126.com", "*@corp.netease.com", "bjqd@rd.netease.com"]
					},//检索数组每一项的第一个字符若为*，则用mock.js生成，否则为指定邮箱。
					"para24": {
						"type": "ip",
						"value": "*"
					},//值为*时，用mock.js生成，否则为指定ip
					"para25": {
						"type": "url",
						"value": "*"
					},//值为*时，用mock.js生成，否则为指定url
					"para26": {
						"type": "date",
						"contentType": "date",//取值可以为date，time，date_time
						"value":"*"//或者[123123, 1231467]时间介于该范围。
					},//取值为*时，用mock.js生成，否则为指定data范围或者取值。
					"para27": {
						"type": "address",
						"contentType": "=",//也可以取值region，country、province、zip。
						"value": "*"
					},//若contentType为等于时，value为必填项。若contentType为地区、国家、省、编号时，value不存在。
					"para28": {
						"type": "address",
						"contentType": "region",//也可以取值region，country、province、zip。
					}//若contentType为等于时，value为必填项。若contentType为地区、国家、省、编号时，value不存在。

				},


				"contentType":"application/json",
				"body":{
					"name":{
						"type": "string",
						"value": [5, 10]
					},
					"email": {
						"type": "@",
						"value": "*"
					}
				},
				"constraint":{

				}
			},

			// rule1中response的值
			"response":{
				"statusCode":"200",
				"contentType":"application/json",
				"headers":{},
				"body":{
					"resbody11": {
						"type": "string",
						"value": [5, 20]
					},
					"resbody12": {
						"type": "string",
						"value": [5, 20]
					}
				}
			}
		},

		"rule12":{
			"request":{
				"url":"/xmz1/rule12",
				"method":"",
				"headers":{},
				"parameters":{},
				"contentType":"application/json",
				"body":{},
				"constraint":
			},
			"response":{
				"statusCode":"200",
				"contentType":"application/json",
				"headers":{},
				"body":{
					"body1": {
						"type": "string",
						"value": [5, 20]
					},
					"body2": {
						"type": "string",
						"value": [5, 20]
					}
				}
			}
		}


	},


	"xmz2":{
		"rule21":{
			"request":{
				"url":"/xmz2/rule21",
				"method":"",
				"headers":{},
				"parameters":{},
				"contentType":"application/json",
				"body":{},
				"constraint":{}
			},
			"response":{
				"statusCode":"200",
				"contentType":"application/json",
				"headers":{},
				"body":{
					"body1": {
						"type": "string",
						"value": [5, 20]
					},
					"body2": {
						"type": "int",
						"value": [0,500]
					}
				}
			}
		}


	}
}




