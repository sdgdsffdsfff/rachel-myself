####timeout中间件

描述：请求超时中间件，默认的超时时间是5000ms。我们可以通过req.clearTimeout()函数清除这个时间。超时的错误，可以通过next()函数传递出来。当然我们也可以设置超时的响应错误状态码：.timeout=503

例子：
```javascript
var connect = require('connect');
var app = connect()
    .use(connect.logger('dev'))
    .use(connect.timeout(1000))
    .use(function (req, res) {
        setTimeout(function(){
            res.end('hello world\n');
        },5000)
    })
    .listen(3000);
```

控制台输出：
```javascript
Error: Response timeout
    at IncomingMessage. (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\middleware\timeout.j
s:39:17)
    at IncomingMessage.EventEmitter.emit (events.js:95:17)
    at null._onTimeout (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\middleware\timeout.js:34:11)
    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
GET / 503 1030ms - 389b

Error: Response timeout
    at IncomingMessage. (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\middleware\timeout.j
s:39:17)
    at IncomingMessage.EventEmitter.emit (events.js:95:17)
    at null._onTimeout (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\middleware\timeout.js:34:11)
    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
GET /favicon.ico 503 1006ms - 389b
```