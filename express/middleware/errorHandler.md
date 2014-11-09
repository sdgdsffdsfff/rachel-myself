####errorHandler中间件
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
