var http = require('http');
var qs = require('querystring');
var postData = qs.stringify({
      content: "shuiguo",
      date: "apple"
    });
console.log(postData);
// 用于请求的选项
var options = {
  host: 'localhost',
  method: "post",
  port: '3000',
  path: '/addItem',
  headers: {
    'content-type': "application/x-www-form-urlencoded",
    'content-length': Buffer.byteLength(postData),
    "abc": "123"
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