####query中间件

意义：当我们使用url为：http://a.com/?foo=bar&baz=val#hash. 若使用了该中间件，我们就可以直接用req.query.foo来获取值bar。

源码：
```javscript
module.exports = function query(options){
  return function query(req, res, next){
    if (!req.query) {
      req.query = ~req.url.indexOf('?')
        //**********
        ? qs.parse(parse(req).query, options)
        //*************
        : {};
    }

    next();
  };
};
```
以上代码很简单，先是判定req.url中是否有问号？，如果有，则使用已有的utils中的函数类parse解析req.url。
最终获取到的parse(req).query可类似于foo=bar&baz=val。
再利用qs模块的parse()解析这个字符串成为对象。具体该模块的parse()函数解析过程见urlencoded.md（二者这部分类似）

例子：
```javascript
   var express = require('express');
   var app = express();
   app.use(express.query());
   app.use(express.logger('dev'));
   app.use(function(req, res){
       console.log(req.query);
       res.end(JSON.stringify(req.query));
   });
   app.listen(3003);
```

当我们使用
curl -d  '{name: "add"}' http://localhost:3003?pass=did
输出：{"pass":"did"}%  
req.query只会自动解析URL的查询参数，不解析POST数据


