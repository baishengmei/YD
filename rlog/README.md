# Rlog

rlog 是 analyzer 的 web 端（包括 webview）统计代码，用于向 analyzer 后台发送统计 request，类似 google analytics 和百度统计。目前版本支持如下功能：

1. 兼容旧版 rlog 的所有 feature，可放心使用
1. 默认开启页面 PV 记录
1. 超链接点击记录，默认关闭。注意：由于超链接可能使当前页面发生跳转，记录可能丢失
1. 自动记录（event）带 `data-rlog` 属性的标签，如 `<span data-rlog="i am div">`
1. 用户自定义事件
1. 自定义 key-value
1. 默认记录 url 中的 keyfrom、vendor 参数
1. 触屏设备，默认记录第一次触屏事件
1. 默认记录 url 后的 hash 参数。例如 `http://youdao.com/index.html#a=1&b=2`
1. 支持 pageview、 event 和自定义事件的回调。尽量减少记录的丢失
1. 多账号支持。同一个页面可支持不同 product ID 的记录，且相互隔离互不干扰

> rlog.js 的维护可找 dingzq or luzhujun


## CDN
- ydstatic 代码发布的 svn 路径： https://corp.youdao.com/svn/ydstatic/js/rlog
- CDN 最新线上地址，支持 https： http://shared.ydstatic.com/js/rlog/v1.js
- 原 rlog 脚本也已经更新： http://rlogs.youdao.com/rlog.js


## Usage

### 最简用法

为页面添加 rlog 记录，就这么简单。当 `../rlog/v1.js` 加载完毕时，将发送一条 PV 记录到统计系统

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>rlog - demo</title>
</head>
<body>

<script>
var _rlog = _rlog || [];
// 指定 product id
_rlog.push(["_setAccount" , "test_by_dev"]);
</script>

<script defer src="http://shared.ydstatic.com/js/rlog/v1.js"></script>

</body>
</html>
```

### 关闭默认情况下发送 PV 的设置

```javascript
var _rlog = [];
_rlog.push(["_setAccount" , "test_by_dev"]);

// 设置为 false，将不会自动发送 PV
_rlog.push(["_setAutoPageview" , false]);

// PV 发送完成后的回调，可多次使用
_rlog.push(["_onPageViewFinished" , function(){
    console.log("after pageview");
}]);

// 可调用 _trackPageview，手动完成 PV 的发送
// 注意同一页面重复调用该方法多次也仅发送一次 PV 记录
// 如果一定要发送多次，也是可以了，请看源码...
_rlog.push(["_trackPageview"]);
```

### 请求参数的设置和自定义 rlog 请求的发送

```javascript
var _rlog = [];
_rlog.push(["_setAccount" , "test_by_dev"]);
_rlog.push(["_setAutoPageview" , false]);

// 为 rlog 请求添加 keyfrom=123 参数，需要注意的是，_addPost 添加的参数每次请求都会带上
// 这里设置的参数会覆盖 url 中的参数
// 设置同名参数，后设置的生效
_rlog.push(["_addPost" , "keyfrom" , "123"]);

// 同旧版的 __rl_event(123)，发送 category 名为 ‘event’，值为 123 的请求
// 支持回调函数
_rlog.push(["_trackEvent", 123, function () {
    console.log('after _trackEvent')
}]);

// 发送自定义 rlog 请求
// category_name - 分类名称，如系统默认的 ['pageview', 'event', 'click']，切勿取这三个名
// 第三个参数中，将作为 key-value 对发送到 rlog 系统，如这样： .../rlog.php?a=1&b=2...
// 支持回调函数
_rlog.push(["_trackCustom" , "category_name" , [
        ['a',1], ['b',2]
    ] , function(){
    console.log("after _trackCustom");
}]);
```

### 多账号支持
```javascript
// 以下代码将发送三次 PV，对应的产品 ID 分别是：
//  - test_by_dev
//  - test_by_dev_100
//  - test_by_dev_200

// 设置默认账号
_rlog.push(['_setAccount', 'test_by_dev'])

// aaa 仅表示一个独立的命名空间，也可以是任意的字符串，作用是隔离账号之间的干扰
_rlog.push(['aaa._setAccount', 'test_by_dev_100'])
_rlog.push(['aaa._addPost', 'key100', 'value100'])
_rlog.push(['aaa._onPageViewFinished', function () {
  console.log('pageview finished')
}])

// bbb 同上面的 aaa
_rlog.push(['bbb._setAccount', 'test_by_dev_200'])
_rlog.push(["bbb._setAutoPageview" , false]);
_rlog.push(["bbb._trackPageview"]);
```

## API 详细说明

> 以下所有 API 均支持多账号调用

* 设置productId，即analyzer的产品ID

```javascript
_rlog.push(["_setAccount" , value:String]);

//等同旧方法
//__rl_npid=xxx
```

* 设置是否自动发送pageview

```javascript
_rlog.push(["_setAutoPageview" , value:Boolean]);

//等同旧方法
//__rl_pageview=xxx
```

* 手动发送pageview

```javascript
_rlog.push(["_setAutoPageview" , false]);
//...

// 手动发送的三种方式，一般采用第一种即可
// 1 - 先关闭自动发送pageview，否则会重复发送
_rlog.push(["_trackPageview"]);
// 2 - 强制再次发送 pv 记录，但必须在 上次 pv 成功发送后才有效
_rlog.push(["_trackPageview", 'ido']);
// 3 - 发送 pv 时，也可带上 k-v 对
_rlog.push(["_trackPageview", [ ['key','value'], ... ]]);
```

* 发送额外参数，pageview、每次_trackEvent、_trackCustom都会带上

```javascript
_rlog.push(["_addPost" , key:String , value:String]);

//等同旧方法
//__rl_post.push([key , value]);
```

* 删除额外参数

```javascript
_rlog.push(["_removePost" , key:String]);
```

* 清空发送额外参数

```javascript
_rlog.push(["_removePost"]);
```

* 当发送完成pageview后回调，回调执行后将移除

```javascript
_rlog.push(["_onPageViewFinished" , callback:Function]);
```

* 记录事件

```javascript
//value：事件值
//callback：事件发送完成后的回调函数

_rlog.push(["_trackEvent" , value:String]);

_rlog.push(["_trackEvent" , value:String , callback:Function]);


//等同旧方法
//__rl_event(value)
```

* 自定义发送

```javascript
//catalog：analyzer对应的catalog
//value：事件值
//callback：事件发送完成后的回调函数

_rlog.push(["_trackCustom" , catalog:String , value:String]);

// Array = [['key', 'value'], ...]
_rlog.push(["_trackCustom" , catalog:String , value:Array]);

_rlog.push(["_trackCustom" , catalog:String , value:String , callback:Function]);
```

* 自动绑定点击事件

```javascript
// <a href="#" data-rlog="video.play">播放</a>
// 与以下效果相同
_rlog.push(["_trackEvent" , "video.play"]);

```

* 开启跟踪vendor（在此处查看报告： [http://vendor.iyoudao.net/](http://vendor.iyoudao.net/) ）

```javascript
_rlog.push(["_setTrackVendor" , true]);
```


## 其它

- 旧版 [README20150908.md](README20150908.md)
- 史前文档：目前为止，仅在 Outfox Wiki 上找到一篇介绍 [rlog (全称：request-logger)](https://dev.corp.youdao.com/outfoxwiki/ToolBox/RequestLoggerFront) 比较详细的文章，下面摘录其部分个人觉得 web 前端开发中需要用到的内容，供参考。
