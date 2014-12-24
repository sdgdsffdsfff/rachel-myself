一。当我们使用web worker来做一些类似jsonp的请求

jsonp通过插入script标签来加载json数据，而script标签加载和执行过程都是阻塞的，所以尝试使用web workder看是否能实现异步加载。代码如下：
```javascript
// /aj/webWorker/core.js
function $E(id) {
    return document.getElementById(id);
}
onload =function() {
    //通过web worker加载
    $E('workerLoad').onclick =function() {
        var url ='http://js.wcdn.cn/aj/mblog/face2';
        var d = (new Date()).valueOf();
        var worker =new Worker(url);
        worker.onmessage =function(obj) {
            console.log('web worker: '+ ((new Date()).valueOf() - d));
        };
    };
    //通过jsonp加载
    $E('jsonpLoad').onclick =function() {
        var url ='http://js.wcdn.cn/aj/mblog/face1';
        var d = (new Date()).valueOf();
        STK.core.io.scriptLoader({
            method:'post',
            url : url,
            onComplete : function() {
                console.log('jsonp: '+ ((new Date()).valueOf() - d));
            }
        });
    };
    //通过ajax加载
    $E('ajaxLoad').onclick =function() {
        var url ='http://js.wcdn.cn/aj/mblog/face';
        var d = (new Date()).valueOf();
        STK.core.io.ajax({
            url : url,
            onComplete : function(json) {
                console.log('ajax: '+ ((new Date()).valueOf() - d));
            }
        });
    };
};
```

HTML页面：/aj/webWorker/worker.html
```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Worker example: load data</title>
<script src="http://js.t.sinajs.cn/STK/js/gaea.1.14.js" type="text/javascript"></script>
<script type="text/javascript" src="http://js.wcdn.cn/aj/webWorker/core.js"></script>
</head>
<body>
    <input type="button" id="workerLoad" value="web worker加载"></input>
    <input type="button" id="jsonpLoad" value="jsonp加载"></input>
    <input type="button" id="ajaxLoad" value="ajax加载"></input>
</body>
</html>
```

通过 http://js.wcdn.cn/aj/webWorker/worker.html 访问页面然后分别通过三种方式加载数据，得到控制台输出：
```javascript
web worker: 174
jsonp: 25
ajax: 38
```

多试几次发现通过jsonp和ajax加载数据的时间相差不大，而web worker的加载时间一直处于高位，所以用web worker来加载数据还是比较慢的，即便是大数据量情况下也没任何优势，--可能是Worker初始化新起线程比较耗时间。除了在加载过程中是无阻塞的之外没有任何优势。

那么web worker是否能支持跨域js加载呢，这次我们通过http://127.0.0.1/aj/webWorker/worker.html 来访问页面，当点击 "web worker加载" 加载按钮时Chrome下无任何反映，FF6下提示错误。由此我们可以知道web worker是不支持跨域加载JS的，这对于将静态文件部署到单独的静态服务器的网站来说是个坏消息。

所以web worker只能用来加载同域下的json数据，而这方面ajax已经可以做到了，而且效率更高更通用。还是让Worker做它自己擅长的事吧。

二。总结：
web worker看起来很美好，但处处是魔鬼。

我们可以做什么：

1. 可以加载一个JS进行大量的复杂计算而不挂起主进程，并通过postMessage，onmessage进行通信

2. 可以在worker中通过importScripts(url)加载另外的脚本文件

3. 可以使用 setTimeout(), clearTimeout(), setInterval(), and clearInterval()

4. 可以使用XMLHttpRequest来发送请求

5. 可以访问navigator的部分属性

有那些局限性：

1. 不能跨域加载JS

2. worker内代码不能访问DOM

3. 各个浏览器对Worker的实现不大一致，例如FF里允许worker中创建新的worker,而Chrome中就不行

4. 不是每个浏览器都支持这个新特性