#####依赖原生zlib模块压缩
```javascript
var zlib = require('zlib');
```
#####压缩的方法
```javascript
gzip: zlib.createGzip //以 options 所给选项返回一个新的 Gzip 对象。
deflate: zlib.createDeflate //以 options 所给选项返回一个新的 Deflate 对象。
```
#####处理vary字段
 当请求没有vary字段时，我们应该即时给加上（或者有Vary字段但没有Accept-Encoding字段，则也需要加上，因为Accept-Encoding是需要指定压缩形式的，如Accept-Encoding:gzip,deflate,sdch等），因为对于同url的请求，可能需要返回压缩版本或者非压缩版本，加上了vary字段就表明缓存服务器一定要缓存当前版本，等到下次请求就不会错乱的返回错误版本（具体参见笔记“http协议中Vary的一些研究”）
```javascript
if (!vary) {
  res.setHeader('Vary', 'Accept-Encoding');
} else if (!~vary.indexOf('Accept-Encoding')) {
  res.setHeader('Vary', vary + ', Accept-Encoding');
}
```
#####compress压缩的重点代码解析
1.主要是通过监测res的“header事件（具体何时发生，还有待学习，在里面做压缩代码的操作
）

2.在确定好压缩方式（gzip或者deflate，讲解默认gzip）以后，用上述的gzip(options)执行，返回stream。之后可以通过监测sream的data->end
->drain事件来完成整个压缩过程。
```javascript
res.on('header', function(){
      // default to gzip，当Accept-Encoding: *，默认使用gzip方式压缩
      if ('*' == accept.trim()) method = 'gzip';

      // compression method（用指定的压缩方式，用gzip或者deflate方式）
      if (!method) {
        for (var i = 0, len = names.length; i < len; ++i) {
          if (~accept.indexOf(names[i])) {
            method = names[i];
            break;
          }
        }
      }n;

      // compression stream，
      //传过来的options是用于压缩的options
      stream = exports.methods[method](options);

      // header fields，指定返回的压缩方式，用字段Content-Encoding，且去除了Content-Length字段
      res.setHeader('Content-Encoding', method);
      res.removeHeader('Content-Length');

      // compression
      stream.on('data', function(chunk){
        write.call(res, chunk);
      });

      stream.on('end', function(){
        end.call(res);
      });

      stream.on('drain', function() {
        res.emit('drain');
      });
    });
```