###内存限制
在解析表单、json、xml部分，我们采取的策略是先保存用户提交的所有数据，然后再解析处理，最后才传递给业务逻辑。
这种策略存在的问题是，它仅仅适合数据量小的提交请求，一旦数据量过大，将发生内存被占光的情况。解决方案如下两种：

1. 限制上传的内容大小，一旦超过限制，停止接收数据，并响应400状态码
2. 通过流式解析，将数据流导向到磁盘中，Node只保留文件路径等小数据
针对方案一，对请求体限制给定大小的字节数（Limit request bodies to the given size in `bytes`.）。
参数可以是“5mb”，“200kb”，“1gb”等等。如app.use(connect.limit('5.5mb'))

####重要源码解析如下：
```javascript
module.exports = functionL limit(bytes){
  //针对给定的不同单位参数，统一为字节数
  if ('string' == typeof bytes) bytes = utils.parseBytes(bytes);

  return function limit(req, res, next){
    var received = 0
      , len = req.headers['content-length']
        ? parseInt(req.headers['content-length'], 10)
        : null;

   // limit by content-length
   //如果内容超过长度限制，返回请求实体过长的状态码413
   if (len && len > bytes) return next(utils.error(413));

    // limit
    if (brokenPause) {//标示nodejs的版本小于0.10
      listen();
    } else {
      req.on('newListener', function handler(event) {
        if (event !== 'data') return;

        req.removeListener('newListener', handler);
        // Start listening at the end of the current loop
        // otherwise the request will be consumed too early.
        // Sideaffect is `limit` will miss the first chunk,
        // but that's not a big deal.
        // Unfortunately, the tests don't have large enough
        // request bodies to test this.
        process.nextTick(listen);
      });
    };

    next();

    function listen() {
      //数据一部分一部分的接收，一旦超过则停止接收
      req.on('data', function(chunk) {
        received += Buffer.isBuffer(chunk)
          ? chunk.length :
          Buffer.byteLength(chunk);

        //此时停止接收数据，触发end()
        if (received > bytes) req.destroy();
      });
    };
  };
};

```

####总结
从上面代码可知，数据是由包含Content-Lengt的请求报文判断是否长度超过限制，超过直接响应413状态码。
对于没有Content-Length的请求报文，稍微简单点，在每个data事件中判定即可。一旦超过限制，服务器停止接收新的数据片段。

如果是json文件或xml文件，极有可能无法完成解析。对于上线的web应用，添加一个上传大小限制十分有利于保护服务器。