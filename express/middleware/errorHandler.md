####errorHandler中间件

描述：错误处理中间件，对于开发过程中的错误，提供栈跟踪和错误响应，接受3种类型text，html，json。
Text：text/plain是默认类型，返回一个简单的栈跟踪和错误信息
JSON：application/json，返回{"error": error}对象
HTML：返回一个HTML错误页面

参数：
showStack：返回错误信息和错误栈，默认值为false
showMessage：只返回错误信息，默认值false
dumpExceptions：输出异常日志，默认值false
logErrors：输出错误日志到文件，默认值false

例子：
```javascript
   var express = require('express');
   var app = express();
   app.use(express.logger('dev'));
   app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
   app.use(function(req, res){
       req.headers.accept = 'html';
       res.write(JSON.stringify(req.header.accept));
       throw new Error('My errorHandler!!!');
       res.end('a  ho  ~~~');
  });
  app.listen(3003);
```
错误结果，控制台输出：
```javascript
Error: my errorHandler!!!
    at Object.handle (D:\workspace\javascript\nodejs-connect\errorHadnler.js:8:15)
    at next (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\proto.js:190:15)
    at next (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\proto.js:192:9)
    at Object.logger (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\middleware\logger.js:156:5)
    at next (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\proto.js:190:15)
    at Function.app.handle (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\proto.js:198:3)
    at Server.app (D:\workspace\javascript\nodejs-connect\node_modules\connect\lib\connect.js:65:37)
    at Server.EventEmitter.emit (events.js:98:17)
    at HTTPParser.parser.onIncoming (http.js:2027:12)
    at HTTPParser.parserOnHeadersComplete [as onHeadersComplete] (http.js:119:23)
```

使用：
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

异常处理中间价比普通中间件会多一个参数err，所以我们在处理时，可以通过对中间件按照参数的个数进行判别。
```javascript
var middleware = function(err, req, res, next){
    
}
```
普通中间件
```javascript
var middleware = function(req, res, next){
    
}
```

该中间件主要处理了三种MIME类型的页面

1. 如果是html类型的页面，则返回一个含有各种错误信息的error.html页面
```javascript
if (~accept.indexOf('html')) {
      fs.readFile(__dirname + '/../public/style.css', 'utf8', function(e, style){
        fs.readFile(__dirname + '/../public/error.html', 'utf8', function(e, html){
          var stack = (err.stack || '')
            .split('\n').slice(1)
            .map(function(v){ return '<li>' + v + '</li>'; }).join('');
            html = html
              .replace('{style}', style)
              .replace('{stack}', stack)
              .replace('{title}', exports.title)
              .replace('{statusCode}', res.statusCode)
              .replace(/\{error\}/g, utils.escape(err.toString()));
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(html);
        });
      });
}
```

2. 如果MIME类型是application/json，则返回json形式的错误信息，如下：
```javascript
if (~accept.indexOf('json')) {
  var error = { message: err.message, stack: err.stack };
  for (var prop in err) error[prop] = err[prop];
  var json = JSON.stringify({ error: error });
  res.setHeader('Content-Type', 'application/json');
  res.end(json);
}
```

3. 对于非上述的两种情况，默认返回text/plain
```javascript
res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
res.end(err.stack);
```
