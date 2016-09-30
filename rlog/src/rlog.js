// rlog
// https://gitlab.corp.youdao.com/webfront-public-service/rlog

var _rlog = _rlog || [];

(function (win, doc, loc, ec, dec){

// 防止重复加载
if(win.__rl_event) return;

var ua = navigator.userAgent.toLowerCase();
var isMobile = /(mobile|iphone|ipod|blackberry)/.test(ua);
var supportSendBeacon = false;

var
    // -------------------------------------------------------------------------
    // - rlog 请求的默认参数，可通过以下两个 function 取得
    // _get_common_default_params, _get_pageview_default_params

    // rlog 版本号
    __rl_nver = "@VERSION@",
    // 字符集
    __rl_nchr = "",
    // java enable
    __rl_njve = 0,
    // referrer，重要统计参数，不准，firefox 和 ie 在302 时不记录referrer
    __rl_nref = "",
    // 屏幕分辨率，firefox 时，缩放页面会影响该值
    __rl_nres = "",
    // 页面修改时间，只对静态页面有意义
    __rl_nlmf = 0,
    // 网易通行证，通常情况下作为第二userkey 进行统计
    __rl_nssn = "NULL",
    // cookie，通常情况下作为第一userkey 进行统计
    __rl_ncoo = "NULL",
    // url fragment，url 锚点，hash 部分
    __rl_nfrg = "",
    // 当前页面完整的 URL，20150914 和陈莹讨论后，决定增加这个参数，原因是 file 协议下发送
    // 的 rlog 请求中没有 Referer 参数，而服务端是通过 Referer 参数来分析 _basePath 等的
    __rl_nurl = "",

    // 写 cookie 时用的域名
    __rl_cdmn     = __rl_get_domain(),
    _non__rl_cdmn = __rl_get_domain(true),
    // rlog 服务地址
    // 支持 file 协议下也能正常的发出 rlog，比如词典社区或看天下的本地版
    __rl_src_addr = getProtocol() + "//rlogs.youdao.com",

    // 当前 API 所处的上下文。 current context。为了支持多产品
    cctx = createAContext(),
    // 为支持多账号，不同账号的上下文需要隔离，默认账号的上下文变量为 '_default'
    context_map = {'_default': cctx},
    // _rlog 下的所有对外接口
    exports = {};

// 用于开发阶段的调试
// win.ctx = context_map;

// 当 rlog.js 文件加载完成后，重写 _rlog 变量，使其真身归位
// 并保存加载前的动作，待 _rlog 和 exports 初始化完成后，再执行这些动作
var queue = win._rlog,
    _rlog = win._rlog = {};

// 对外代理调用 exports 下的所有接口
_rlog.push = function(arr){
    var ns = arr[0].split('.'),
        fn = ns.pop();
    ns = ns.join('_');
    ns || (ns = '_default');
    cctx = context_map[ns] || (context_map[ns] = createAContext());

    exports[fn].apply(this , arr.slice(1));
};

exports._setAccount = function(a){
    a && (cctx.pid = a);
};

exports._setAutoPageview = function(b){
    cctx.autopv = b;
};

// 增加发送参数
exports._addPost = function(k , v){
    exports._removePost(k);
    cctx.post.push([k , v]);
};

// 是否跟踪vendor
exports._setTrackVendor = function(a){
    a && (cctx.trackVendor = a);
};

// pageview 请求发送完成后
exports._onPageViewFinished = function(callback){
    cctx.pvcb.push(callback);
};

/**
 * 自定义发送
 * 当 value 为二维数组时，支持 key-value 方式
 * @param  {[String]} catalog [分类]
 * @param  {[String]} value   [值] String or Array
 */
exports._trackCustom = function(catalog , value , callback){
    if (!cctx.pid) return;

    cctx.cat = catalog;

    var out;
    // 支持 key-value 方式
    if (isArray(value)) {
        out = twoDimArrToQueryString(value)
    }
    // 支持旧版 event
    else {
        out = "_nhrf=" + ec(value);
    }

    _rl_request_img(out , callback)
};

exports._trackEvent = function (value, callback) {
    exports._trackCustom("event" , value , callback);
};

// 发送 pageview，并尽量确保当前页面仅可发送一次 PV
// 极为特殊的情况下，你一定要发送多次 PV 时，请传参数 'ido' (你懂的...)
// 举个特殊情况的例子，SPA 中，页面通过 ajax 已经完全发生变化了，此时再发一次 PV，也是 ok 的
// 但是 _onPageViewFinished 也需要重新注册，毕竟场景不同，再执行之前的意义不大
//
// 此外，参数 act 也可以是一个数组，如 [ [key, value], ...]，发送 pv 时将带上这些值
// 因为不想这些 k-v 对在后续的日志中每次都带上，所以支持了这种方式
exports._trackPageview = function(act){
    if (cctx.ispvt && act !== 'ido') {
        return;
    }
    // 执行回调时，上下文有可能发生改变，这里设一个局部变量，用于保留现场
    var _ctx = cctx;
    __rl_pageview_func(function () {
        var fn;
        while (fn = _ctx.pvcb.shift()) {
            try { fn() } catch (e) {}
        }

        _ctx.ispvt = 2;
    }, (isArray(act) && act.length) ? '&' + twoDimArrToQueryString(act) : '');
};

exports._removePost = function(k){
    if(!k){
        cctx.post = [];
        return;
    }
    var arr = cctx.post;
    for(var i = 0 , len = arr.length ; i < len ; i++){
        if(arr[i] && arr[i][0] == k){
            arr.splice(i , 1);
            return i;
        }
    }
};

// -----------------------------------------------------------------------------
// 兼容旧版的一些初始化处理
// 注意：这部分初始化，务必在 _rlog 和 exports 下接口初始化完成后执行

// 兼容旧版 __rl_event
win.__rl_event = function (value , callback) {
    _rlog.push(['_trackCustom', 'event', value, callback]);
};

// 兼容旧版 __rl_npid 的设置
cctx.pid = win.__rl_npid || '';

// 兼容旧版 __rl_post 的设置
cctx.post = win.__rl_post || [];

// 兼容旧版 __rl_pageview 的设置
cctx.autopv = (typeof __rl_pageview == 'undefined') ? true : !!win.__rl_pageview;

// -----------------------------------------------------------------------------
// 提取当前页面 url 的 search 和 hash 参数
// 调用 exports._addPost 方法，添加到 __rl_post 中
// 使得每次发送 log 请求时，都带上这些参数

// 取当前页面的所有 url 参数，保持到 params 中
var params = (function () {
    var search = loc.search.replace(/^\?/, '').split('&'),
        params = {}, i = 0, t;
    for (i = 0; i < search.length; i++) {
        t = search[i];
        if (t) {
            t = t.split('=');
            params[t[0]] = t[1] === undefined ? null : dec(t[1])
        }
    }
    return params;
})();
params.vendor && exports._addPost('vendor', params.vendor);
params.keyfrom && exports._addPost('keyfrom', params.keyfrom);

// -- add by dingzq 2014-03-20
// 支持 url 后的 hash 的记录，第一次使用于看天下移动版（詹总要求）
// hash 格式例如：#a=1&b=2
(function () {
    var hash = loc.hash;
    if (!hash) return;
    hash = hash.replace(/^#/, '').split('&');
    var t, i, len;
    var result = [];
    for (i = 0, len = hash.length; i < len; i++) {
        t = hash[i];
        if (!t) continue;
        t = t.split('=');
        exports._addPost(t[0] , dec(t[1] || 'NULL'));
    }
})();

// -----------------------------------------------------------------------------
// 用户配置的处理
// 这里的代码在 url 参数设置之后执行，为了保证开发者指定的参数能覆盖 url 中的参数

(function () {
    try{
        if(!queue) return;

        /**
         * 调整setAccount执行顺序，
         * 否则当queue里面包含trackCustom等，且在setAccount之前,将会被过滤
         */
        for (var i = 1 , len = queue.length; i < len; i++) {
            if(/_setAccount$/.test(queue[i][0])){
                var obj = queue[i];
                queue.splice(i , 1);
                queue.splice(0 , 0 , obj);
            }
        };

        for (var i = 0 , len = queue.length; i < len; i++) {
            console.log("Execute: " , queue[i]);
            _rlog.push(queue[i]);
        };
        queue = null;
    } catch (e) {}
})();

// rlog.js 加载完成后，默认开启 pv 发送
// if (typeof __rl_pageview == "undefined" || __rl_pageview) {
//     // exports._trackPageview();
//     _rlog.push(['_trackPageview'])
// }
ObjForEach(context_map, function (key, ctx) {
    if (ctx.autopv) {
        _rlog.push([key + '._trackPageview']);
    }
});

// -----------------------------------------------------------------------------
// DOM 事件行为的初始化

// html 标签上有 data-rlog 属性的，将自动记录
// <a href="#" data-rlog="video.play">播放</a>
// - 与以下效果相同
// _rlog.push(["_trackEvent" , "video.play"]);
// 这里用 mousedown 更合适，减小跳转时的丢失率，移动上会转化为 touchstart
// 要不然除 A 标签外，不会触发
addEvent('mousedown' , monitorClick);

// -- add by dingzq 2014-03-20
// 首次触摸屏幕（看天下文章 webview 区域）时触发，仅触发一次
// 由于移动词典客户端看天下的文章 pv 统计有问题（主要因为是 Android 版有预加载，iOS 版没有预
// 加载，导致统计有误等其它原因），所以有此附件方案
(function () {
    var firstTouch = function (evt) {
        // exports._trackEvent('first-touch');
        _rlog.push(['_trackEvent', 'first-touch'])
        removeEvent('touchstart' , firstTouch);
    };
    addEvent('touchstart' , firstTouch);
})();

// 页面上所有超链接的记录
if (!!win.__rl_click) {
    addEvent('click' , __rl_click_func);
}

// -----------------------------------------------------------------------------
// rlog 发送逻辑相关的一些方法，主逻辑依然保持旧版方案，仅代码风格做了部分调整

// 发送 pv
function __rl_pageview_func(callback, op) {

    if (!cctx.pid || cctx.ispvt == 1) {
        return
    }

    cctx.ispvt = 1;

    cctx.cat = "pageview";

    _rl_request_img(_get_pageview_default_params() + op, callback);

    if(cctx.trackVendor && params.vendor){
        _requestVendor(params.vendor);
    }
}

/**
 * 发送rlog请求
 * @param  {[String]}   d      [请求参数]
 * @param  {Function} callback [回调函数]
 */
function _rl_request_img(queryString , callback) {
    console.trace("["+cctx.cat+"]" ,"send " , queryString );

    var a = [
        "_npid=" + cctx.pid,
        "_ncat=" + cctx.cat,
        _get_common_default_params(),
        queryString
    ];
    if (cctx.post.length) {
        a.push(twoDimArrToQueryString(cctx.post));
    }

    var url = __rl_src_addr + "/rlog.php?" + a.join('&');
    _sendRequest(url, callback);
}

function _requestVendor(vendor , callback) {
    console.trace("[vendor-trace]" , vendor );

    var a = [
        "_npid=" + cctx.pid,
        "vendor=" + vendor
    ];

    var url = __rl_src_addr + "/vendor/?" + a.join('&');
    _sendRequest(url, callback);
}


function _sendRequest(url , callback) {
    if(supportSendBeacon){
        navigator.sendBeacon(url);
        callback && callback();
    }else{
        var img = new Image();
        img.onload = img.onerror = function() {
            callback && callback();
        };
        img.src = url;
        img = null;
    }
}


// 记录点击事件
function __rl_click_func(c) {

    var a = c || win.event;
    var b = a.target || a.srcElement;
    if (!b.href) {
        return
    }

    // exports._trackCustom("click" , b.href);
    _rlog.push(['_trackCustom', 'click', b.href]);
}

// 监控鼠标点击，自动发送事件
function monitorClick(e){
    e = e || win.event;
    var target = (e.target ? e.target : e.srcElement),
        body = doc.body;

    for(;target != body ; target = target.parentNode || body){

        if(target.nodeType === 1
            && target.disabled !== true)
        {
            var value = target.getAttribute("data-rlog");
            if(value){
                // exports._trackEvent(value);
                _rlog.push(['_trackEvent', value]);
            }
        }

    }
}

// -----------------------------------------------------------------------------
// 辅助类方法

function createAContext () {
    // 这里的变量之所以采用简写，因为 key 值不能被压缩，尽量简写即可
    // 为了支持同一页面多产品日志发送的需求，每个产品需要保存自己的变量，使得相互隔离
    return {
        // 原名 product ID，在 analyzer 系统中具有唯一性
        // productID，非统计参数，用于运维人员定位日志位置
        'pid' : '',
        // category，非统计参数，值包括 [pageview, event]，自定义是，请勿起这两名
        'cat' : '',
        // 原变量名为 __rl_post，每次日志发送都会带上
        'post' : [],
        // 原名 isPVTracked，用于防止 PV 重复发送
        // is pageview tracked
        'ispvt' : 0,
        // 原名 _pageviewSendComplete，pv 成功发送后的回调函数列表
        // PageView CallBack
        'pvcb': [],
        // 是否自动发送 pv，在 rlog 加载完成前有效，完成后需要程序主动触发
        // _rlog.push(["_trackPageview"]);
        //
        // 在不确定当前的配置是否会自动发送 pv 的情况下，推荐先设置该值为 false，然后再主动
        // 触发，如下所示
        // ...
        // _rlog.push(["xx._setAutoPageview", false]);
        // ...
        // _rlog.push(["xx._trackPageview"]);
        'autopv': true
    };
}


function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

function ObjForEach (obj, fn) {
    var k;
    for (k in obj) {
        if ( obj.hasOwnProperty(k) ) {
            fn(k, obj[k])
        }
    }
}

function getProtocol() {
    return loc.protocol == 'https:' ? 'https:' : 'http:';
}

function addEvent(type , fun){
    if (isMobile && type == 'mousedown') {
      doc.addEventListener('touchstart', fun, false);
      return;
    }
    doc.addEventListener
        ? doc.addEventListener(type, fun, false)
        : doc.attachEvent("on" + type, fun);
}

function removeEvent(type , fun){
    if (isMobile && type == 'mousedown') {
      doc.removeEventListener('touchstart', fun, false);
      return;
    }
    doc.removeEventListener
        ? doc.removeEventListener(type, fun, false)
        : doc.detachEvent("on" + type, fun);
}

// 设置cookie
function _rl_set_cookie(a, c) {
    var b = new Date();
    b.setTime(b.getTime() + 1000 * 60 * 60 * 24 * 365 * 2);
    document.cookie = a + "=" + c + ";expires=" + b.toGMTString()
        + ";path=/;domain=" + __rl_cdmn
}

// 获取cookie
function _rl_get_cookie(e) {
    var c = document.cookie,
    g = e + "=",
    d = c.length,
    a = 0;
    while (a < d) {
        var f = a + g.length;
        if (c.substring(a, f) == g) {
            var b = c.indexOf(";", f);
            if (b == -1) {
                b = d
            }
            return unescape(c.substring(f, b))
        }
        a = c.indexOf(" ", a) + 1;
        if (a == 0) {
            break
        }
    }
    return - 1
}

// 二维数组转 url 查询字符串
function twoDimArrToQueryString (arr) {
    isArray(arr) || (arr = []);
    var out = [], i, len, p;
    for (i = 0, len = arr.length; i < len; ++i) {
        p = arr[i];
        if(!isArray(p)) continue;
        out.push(p[0] + '=' + ec(p[1]));
    }
    return out.join('&');
}

// 组织 cookie、网易通行证、rlog 版本号、时间戳
// 每个 rlog 请求都需要这些参数
function _get_common_default_params () {
    // - cookie
    var f = (new Date()).getTime();
    doc.cookie = "___rl__test__cookies=" + f;
    __rl_ncoo = _rl_get_cookie("OUTFOX_SEARCH_USER_ID_NCOO");
    if (__rl_ncoo == -1) {
        if (_rl_get_cookie("___rl__test__cookies") == f) {
            __rl_ncoo = 2147483647 * Math.random();
            _rl_set_cookie("OUTFOX_SEARCH_USER_ID_NCOO", __rl_ncoo)
        }
    }
    // - 网易通行证
    __rl_nssn = _rl_get_cookie("P_INFO");
    if (__rl_nssn == -1) {
        __rl_nssn = "NULL"
    } else {
        __rl_nssn = __rl_nssn.substr(0, __rl_nssn.indexOf("|"))
    }

    return [
        "_ncoo=" + __rl_ncoo,
        "_nssn=" + __rl_nssn,
        "_nver=" + __rl_nver,
        "_ntms=" + f
    ].join('&');
}

// 当前页面和浏览器相关信息参数的设置
// 发送 pageview 时需要带上这些参数，其它 'event' 等则不需要
function _get_pageview_default_params() {
    // - 屏幕分辨率
    __rl_nres = "-";
    if (self.screen) {
        __rl_nres = screen.width + "x" + screen.height
    } else {
        if (self.java) {
            var c = java.awt.Toolkit.getDefaultToolkit(),
            e = c.getScreenSize();
            __rl_nres = e.width + "x" + e.height
        }
    }

    // - 页面修改时间
    var f = new Date(doc.lastModified);
    __rl_nlmf = f.getTime() / 1000;
    var a = win.navigator;
    // - java
    __rl_njve = a && a.javaEnabled() ? 1: 0;
    // - 当前页面编码
    __rl_nchr = doc.characterSet || doc.charset || "-";
    __rl_nchr = __rl_nchr.toLowerCase()
    // - Referrer
    __rl_nref = ec(doc.referrer);
    // - 完整的 url
    __rl_nurl = ec(loc.href);
    // - hash
    __rl_nfrg = loc.hash ? ec(loc.hash.substring(1)) : '';

    var a = [
        "_nref=" + __rl_nref,
        "_nurl=" + __rl_nurl,
        "_nres=" + __rl_nres,
        "_nlmf=" + __rl_nlmf,
        "_njve=" + __rl_njve,
        "_nchr=" + __rl_nchr,
        "_nfrg=" + __rl_nfrg
    ];
    return a.join('&')
}

function __rl_get_domain(non) {
    var max = non ? 4 : 3;
    // 词典 PC 客户端里采用 res 引入，这种协议下限制了取 domain
    // so ... 这里需要 fixed
    var f = (loc.protocol === 'res:') ? '' : doc.domain,
    d = f.split("."),
    c = d.length,
    e = /^\d+$/g;
    if (e.test(d[c - 1])) {
        return f;
    }
    if (d.length < max) {
        return "." + f;
    }
    var g = ["com", "net", "org", "gov", "co"],
    b,
    a = false;
    for (b = 0; b < g.length; b++) {
        if (d[c - 2] == g[b]) {
            a = true;
        }
    }

    var xo = a ? max : max - 1;
    var out = [];
    while (xo) {
        out.push(d[c - xo]);
        xo--;
    }
    return '.' + out.join('.');
}

})(window , document , location , encodeURIComponent, decodeURIComponent);