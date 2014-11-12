####static中间件

描述：静态文件处理中间件，可以通过设置root路径作为静态文件服务器。

它的参数：
maxAge: 浏览器缓存存活时间（ms），默认值是0
hidden: 是否允许传递隐藏类型的文件，默认值为false
redirect: 是否允许当访问名是一个目录，结尾增加"/"，默认值true
index: 设置默认的文件名，默认值index.html

使用方案：    app.use(express.static(path.join(__dirname, './public')));

它的用处：是用于静态资源的载入：如我们自己写的js文件，以及引入的bootstrap和jquery等，还可以是css文件及图片等。

重要源码解析：
```javascript
exports = module.exports = function(root, options){

  return function static(req, res, next) {
    var path = parse(req).pathname;

    function directory() {
      //resume:重新开始接收数据，即重新开始检测数据的data和end事件
      if (!redirect) return resume();
      //做重定向操作
      var pathname = url.parse(req.originalUrl).pathname;
      res.statusCode = 301;
      res.setHeader('Location', pathname + '/');
      res.end('Redirecting to ' + utils.escape(pathname) + '/');
    }

    function error(err) {
      if (404 == err.status) return resume();
      next(err);
    }

//注意以下的maxage(),root(),index(),hidden()是用于设置给定的options
   //其中的两个on，用于检测对应的事件
   //主要查找对应文件并返回文件内容主要集中在了pipe()中，下面对其详细讲解
   send(req, path)
      .maxage(options.maxAge || 0)
      .root(root)
      .index(options.index || 'index.html')
      .hidden(options.hidden)
      .on('error', error)
      .on('directory', directory)
      .pipe(res);
  };
};
```

pipe解析，它在node_modules中的send.js中,重点代码：
```javascript
SendStream.prototype.pipe = function(res){
    //重点在send函数
  fs.stat(path, function(err, stat){
    if (err) return self.onStatError(err);
    if (stat.isDirectory()) return self.redirect(self.path);
    self.send(path, stat);
  });

  return res;
};
```

send.js中send(),其中用到setHeader(),type()和stream()，在下阐述
```javascript
SendStream.prototype.send = function(path, stat){
  // set header fields
  this.setHeader(stat);

  // set content-type
  this.type(path);

  // conditional GET support
  //使用缓存
  if (this.isConditionalGET()
    && this.isCachable()
    && this.isFresh()) {
    return this.notModified();
  }

  //计算content－length
  ......

  // content-length
  res.setHeader('Content-Length', len);

  // HEAD support
  if ('HEAD' == req.method) return res.end();

  this.stream(path, options);
};
```

setHeader():
```javascript
SendStream.prototype.setHeader = function(stat){
  var res = this.res;
  if (!res.getHeader('Accept-Ranges')) res.setHeader('Accept-Ranges', 'bytes');
  if (!res.getHeader('ETag')) res.setHeader('ETag', utils.etag(stat));
  if (!res.getHeader('Date')) res.setHeader('Date', new Date().toUTCString());
  if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=' + (this._maxage / 1000));
  if (!res.getHeader('Last-Modified')) res.setHeader('Last-Modified', stat.mtime.toUTCString());
};
```

type():如果没有设置Content-Type字段（response）,做如下设置
```javascript
SendStream.prototype.type = function(path){
  var res = this.res;
  if (res.getHeader('Content-Type')) return;
  var type = mime.lookup(path);
  var charset = mime.charsets.lookup(type););
  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
};
```

stream():这是在所有的response返回头都设置好以后，response body(通过给定的指定文件path)。
该函数的主要作用是读取path指定路径下的文件内容，且res
```javascript
SendStream.prototype.stream = function(path, options){
  // pipe
  //createReadStream返回一个新的ReadStream对象
  var stream = fs.createReadStream(path, options);
  this.emit('stream', stream);
  //将内容通过stream读取到res中
  stream.pipe(res);

  // socket closed, done with the fd
  req.on('close', stream.destroy.bind(stream));

  // end。当stream读取完毕（end），则触发res.end()，如下：
  stream.on('end', function(){
    //self=SendStream
     self.emit('end');
  });
};
```

例子：
```javascript
   var express = require('express');
   var app = express();
   app.use(express.static(__dirname + '/public', {maxAge: 60*60*1000, hidden: false}));
   app.use(function(req, res) {
       res.setHeader('Content-Type', 'text/html');
       res.write('static:');
       res.write('<img src="test.png" width="100px">');
       res.end('end~3Q');
   });
  app.listen(3002);
```

结果：
通过浏览器http://localhost:3002访问，截图如下：
![alt text](./imgs/static.png "Title")