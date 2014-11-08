//依赖原生zlib模块压缩
var zlib = require('zlib');

gzip: zlib.createGzip   //以 options 所给选项返回一个新的 Gzip 对象。
deflate: zlib.createDeflate   //以 options 所给选项返回一个新的 Deflate 对象。

// vary(处理vary字段)
/*
当请求没有vary字段时，我们应该即时给加上（或者有Vary字段但没有Accept-Encoding字段，则也需要加上，因为Accept-Encoding是需要指定压缩形式的，如Accept-Encoding:gzip,deflate,sdch等），因为对于同url的请求，可能需要返回压缩版本或者非压缩版本，加上了vary字段就表明缓存服务器一定要缓存当前版本，等到下次请求就不会错乱的返回错误版本（具体参见笔记“http协议中Vary的一些研究”）
*/
if (!vary) {
  res.setHeader('Vary', 'Accept-Encoding');
} else if (!~vary.indexOf('Accept-Encoding')) {
  res.setHeader('Vary', vary + ', Accept-Encoding');
}
