var http = require('http');
var qs = require('querystring');
var postData = qs.stringify({
    "name": "baishm",
    "name2": "124",
    "age": JSON.stringify({
      "a": 2,
      "b": 6
    }),
    "addr1": "中国",
    "date1": "2015-05-05 12:12:01"
  });
console.log(postData);
// 用于请求的选项
var options = {
  host: 'localhost',
  method: "post",
  port: '3000',
  path: '/xinzhixuan/mockrule1?a=2&b=wb&t=5',
  headers: {
    'content-type': "application/x-www-form-urlencoded",
    'content-length': Buffer.byteLength(postData),
    "abc": "123",
    // "age": JSON.stringify({
    //   "a": 2,
    //   "b": 6
    // }),
    // "email1":"123@164.com",
    // 'enum1': "apple, blue",
    "arr1": [0, 32, 5, 2],
    // "arr2":[1, 2, 4, 6]
  },
};

// 处理响应的回调函数
var callback = function(response) {
    // 不断更新数据
    var body = '';
    response.on('data', function(data) {
      body += data;
    });

    response.on('end', function() {
      // 数据接收完成
      console.log("succeed!");
    });
  }
  // 向服务端发送请求
var req = http.request(options, callback);
req.write(postData);
req.end();