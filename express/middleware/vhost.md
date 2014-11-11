####vhost中间件

描述：它是用于虚拟二级域名映射中间件，设置hostname和server。server可能是一个中间件的server（如下）或者是一个'http.server'

例子如下：
```javascript
var connect = require('connect');
var app = connect();
app.use(connect.logger('dev'));
app.use(function (req, res) {
    res.end(JSON.stringify(req.headers.host));
});

var fooApp = connect();
fooApp.use(connect.logger('dev'));
fooApp.use(function (req, res) {
    res.end('hello fooApp\n');
});

var barApp = connect();
barApp.use(connect.logger('dev'));
barApp.use(function (req, res) {
    res.end('hello barApp\n');
});

app.use(connect.vhost('foo.com', fooApp));
app.use(connect.vhost('bar.com', barApp));
```