####bodyParser中间件

描述：该中间件是json.js，urlencoded.js，multipart.js这三个中间件的简单封装。
我们使用app.use(express.bodyParser())就相当于使用如下三个中间件：
```javascript
//等同于
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart())
```

从安全角度上考虑，如果我们的程序不需要文件上传功能，则最好不要使用multipart.我们只使用我们需要的即可。
以下代码没啥好解释的，一目了然。

```javascript
exports = module.exports = function bodyParser(options){
  var _urlencoded = urlencoded(options)
    , _multipart = multipart(options)
    , _json = json(options);

  return function bodyParser(req, res, next) {
    _json(req, res, function(err){
      if (err) return next(err);
      _urlencoded(req, res, function(err){
        if (err) return next(err);
        _multipart(req, res, next);
      });
    });
  }
};
```

bodyParser的例子：
```javascript
var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(function(req, res) {
    res.end('req.body=>'+ JSON.stringify(req.body));
}).listen(3000);
```

测试：
POST方法：
```javascript
$ curl -d 'user[name]=test' http://localhost:3000/
输出内容为：
    req.body=>{'user':{'name':'test'}}
```

GET方法：
```javascript
$ curl http://localhost:3000/?user=123
输出内容为：
    req.body=>{}

```
