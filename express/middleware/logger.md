####logger中间件：用于输出用户请求的日志。所以在开发环境，日志设置成dev就好了。

针对不同环境，我们有四种format形式：

- `default` ':remote-addr - - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'

- `short` ':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'

- `tiny`  ':method :url :status :res[content-length] - :response-time ms'

- `dev` concise output colored by response status for development use

我们会针对这四种形式，分别在日志中输出以上四种形式的日志

重要函数compile（fmt）：
```javascript
function compile(fmt) {
  fmt = fmt.replace(/"/g, '\\"');
  //用于匹配如下的：remote-addr/[:date]/:res[content-length]等字段
  //正则匹配,以:url为例，_为整体:url，name为url，arg
  var js = '  return "' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function(_, name, arg){
    return '"\n    + (tokens["' + name + '"](req, res, "' + arg + '") || "-") + "';
  }) + '";'
  return new Function('tokens, req, res', js);
  //以:url为例，会用return (tokens["url"](req, res, arg)|| “－”)。
  //即会用以下的return req.originalUrl || req.url返回，且替换":url"值
  //经过所有匹配内容的替换以后，就替换了所有需要输出的内容，不过这只是输出了一个请求的一条数据
};
```
```javascript
exports.format('default', ':remote-addr - - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
```
```javascript
exports.token('url', function(req){
  return req.originalUrl || req.url;
});
exports.token = function(name, fn) {
  exports[name] = fn;
  return this;
};
```

logger函数：
```javascript
if (buffer) {
    var realStream = stream
      , interval = 'number' == typeof buffer
        ? buffer
        : defaultBufferDuration;

    // flush interval
    setInterval(function(){
      if (buf.length) {
        realStream.write(buf.join(''));
        buf.length = 0;
      }
    }, interval); 

    // swap the stream
    stream = {
      write: function(str){
        buf.push(str);
      }
    };
  }
  
return function logger(req, res, next) {
    req._startTime = new Date;

    // immediate(options中一部分)
    if (immediate) {
      var line = fmt(exports, req, res);// 一条数据
      if (null == line) return;
      stream.write(line + '\n');
    // proxy end to output logging
    } else {
      var end = res.end;
      res.end = function(chunk, encoding){
        res.end = end;
        res.end(chunk, encoding);
        var line = fmt(exports, req, res);
        if (null == line) return;
        stream.write(line + '\n');
      };
    }
    //  var stream = options.stream || process.stdout,stream可能是标准输出设备，如果不使用options指定的话
    //以上表示，如果options中指定了立即输出到stream中，则立即写入，否则就如上setInterval，每隔固定事件写一次
```

logger例子：
```javascript
var express = require('express');
var app = express();
app.use(express.logger());
app.use(function(req,res){
    res.end('hello world\n');
}).listen(3000)
```

express.logger()输出：
```javascript
127.0.0.1 - - [Mon, 23 Sep 2013 05:14:18 GMT] "GET / HTTP/1.1" 200 - "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKi
t/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36"
127.0.0.1 - - [Mon, 23 Sep 2013 05:14:18 GMT] "GET /favicon.ico HTTP/1.1" 200 - "-" "Mozilla/5.0 (Windows NT 6.1; WOW64)
 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36"
```

express.logger('short')输出：
```javascript
127.0.0.1 - GET / HTTP/1.1 200 - - 9 ms
127.0.0.1 - GET /favicon.ico HTTP/1.1 200 - - 1 ms
```

express.logger('dev')输出：
```javascript
GET / 200 5ms
GET /favicon.ico 200 1ms
```

express.logger(function(tokens, req, res){
    return 'some format string';
});
输出：
```javascript
some format string
some format string
```

对于我们的开发环境，日志设置为dev就好了