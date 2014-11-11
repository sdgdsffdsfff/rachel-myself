####responseTime中间件

描述：用于计算响应时间的中间件。对于计算出来的响应时间，会在response的header中增加X-response-Time返回。

例子：
```javascript
var connect = require('connect');
var app = connect()
    .use(connect.logger('dev'))
    .use(connect.responseTime())
    .use(function (req, res) {
        res.end('hello world\n');
    })
    .listen(3000);
```

返回的结果如下：
```javascript
Response Headers
  Connection: keep-alive
  Date: Mon, 23 Sep 2013 12:50:24 GMT
  Transfer-Encoding: chunked
  ####重点######
  X-Response-Time: 1ms
```

计算responseTime的代码：
```javascript
module.exports = function responseTime(){
  return function(req, res, next){
    var start = new Date;//开始时间

    res.on('header', function(){
      var duration = new Date - start;//当前时间－开始时间
      res.setHeader('X-Response-Time', duration + 'ms');
    });

    next();
  };
};
```