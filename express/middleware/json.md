 json这个中间件比较简单，当req.body为json(即MIME类型为'application/js)时，可以使用JSON.parse()去解析req.body
 
 不过对req.body做了内容大小的限制，limit
 
 重点代码解析（很多的判断删除了）：
 ```javascript
 return function json(req, res, next) {
    if (req._body) return next();
    // check Content-Type
    if ('application/json' != utils.mime(req)) return next();
    
    // parse
    limit(req, res, function(err){;
      var buf = '';
      req.setEncoding('utf8');
      //接收数据
      req.on('data', function(chunk){ buf += chunk });
      req.on('end', function(){
        var first = buf.trim()[0];

        if (0 == buf.length) {
          return next(utils.error(400, 'invalid json, empty body'));
        }
        
        if (strict && '{' != first && '[' != first) return next(utils.error(400, 'invalid json'));
        try {
        //重点代码JSON.parse
          req.body = JSON.parse(buf, options.reviver);
        } catch (err){
          err.body = buf;
          err.status = 400;
          return next(err);
        }
        next();
      });
    });
 ```
 