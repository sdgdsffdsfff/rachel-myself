####staticCache中间件：

描述：静态文件缓存中间件，最大可以缓存128个对象，每个对象最大256K，总加起来32mb

该缓存算法采用的是LRU（最近最少使用）算法，让最活跃的对象保存在缓存中，从而增加命中。

console.warn('connect.staticCache() is deprecated and will be removed in 3.0');
console.warn('use varnish or similar reverse proxy caches.');
即：connect.staticCache()该中间件已经在3.0版本中删除了。我们建议使用varnish或者相似的代理缓存。

代码：我们在判定可以使用缓存（去除了n多不能使用缓存的情况）时，从cache中拿出对应的obj（cache.get(key)）.它包含有status，headers，body等内容。
当通过条件 (!hasCookies && hit && !mustRevalidate(req,hit))判断是否可以直接返回cache中内容（ respondFromCache）

重点代码如下：
```javascript
return function staticCache(req, res, next){
    var key = cacheKey(req)//url中的pathname。return utils.parseUrl(req).path;
      , ranges = req.headers.range
      , hasCookies = req.headers.cookie
      , hit = cache.get(key);//hit：命中的对象

    // cache static
    // TODO: change from staticCache() -> cache()
    // and make this work for any request
    req.on('static', function(stream){
      var headers = res._headers
        , cc = utils.parseCacheControl(headers['cache-control'] || '')
        , contentLength = headers['content-length']
        , hit;

      // dont cache set-cookie responses
      if (headers['set-cookie']) return hasCookies = true;
      // dont cache when cookies are present
      if (hasCookies) return;
      // ignore larger files
      if (!contentLength || contentLength > maxlen) return;
      // don't cache partial files（只返回文件的一部分）
      if (headers['content-range']) return;
      // dont cache items we shouldn't be
      // TODO: real support for must-revalidate / no-cache
      if ( cc['no-cache']
        || cc['no-store']
        || cc['private']
        || cc['must-revalidate']) return;

      // if already in cache then validate
      if (hit = cache.get(key)){
        //比较请求头中的etag和hit命中缓存的对象etag，如果相同，表示请求的内容是没有变化的，只需要更新时间即可
        if (headers.etag == hit[0].etag) {
          hit[0].date = new Date;
          return;
        } else {
          cache.remove(key);
        }
      }

      // validation notifiactions don't contain a steam
      if (null == stream) return;

      // add the cache object
      var arr = [];

      // store the chunks
      stream.on('data', function(chunk){
        arr.push(chunk);
      });

      // flag it as complete
      stream.on('end', function(){
        var cacheEntry = cache.add(key);
        delete headers['x-cache']; // Clean up (TODO: others)
        cacheEntry.push(200);
        cacheEntry.push(headers);
        cacheEntry.push.apply(cacheEntry, arr);
        //此处可以看到，存储在cache中的对象必须有的三个部分，status（200），headers，内容体（body）。所以匹配到的hit也有这三部分
      });
    });
    //只针对GET和HEAD请求才会有缓存
    if (req.method == 'GET' || req.method == 'HEAD') {
      if (ranges) {
        next();
      } else if (!hasCookies && hit && !mustRevalidate(req, hit)) {
       //从缓存中拿数据且返回X－Cache头部
        res.setHeader('X-Cache', 'HIT');
        respondFromCache(req, res, hit);
      } else {
        res.setHeader('X-Cache', 'MISS');
        next();
      }
    } else {
      next();
    }
  }
};
```

以下函数用于判定是否可以不用再验证即可返回缓存内容
```javascript
function mustRevalidate(req, cacheEntry) {
  var cacheHeaders = cacheEntry[1]
    , reqCC = utils.parseCacheControl(req.headers['cache-control'] || '')
    , cacheCC = utils.parseCacheControl(cacheHeaders['cache-control'] || '')
    , cacheAge = (new Date - new Date(cacheHeaders.date)) / 1000 || 0;

  if ( cacheCC['no-cache']
    || cacheCC['must-revalidate']
    || cacheCC['proxy-revalidate']) return true;

  if (reqCC['no-cache']) return true;

  if (null != reqCC['max-age']) return reqCC['max-age'] < cacheAge;

  if (null != cacheCC['max-age']) return cacheCC['max-age'] < cacheAge;

  return false;
}
```

从cache中返回对应的内容，如果是HEAD请求，则直接cache取出status/headers，返回对应内容即可。
如果是GET，当我们使用(utils.conditionalGET(req) && fresh(req.headers, headers))条件确定可以直接返回304.
```javascript
function respondFromCache(req, res, cacheEntry) {
  var status = cacheEntry[0]
    , headers = utils.merge({}, cacheEntry[1])
    , content = cacheEntry.slice(2);

  headers.age = (new Date - new Date(headers.date)) / 1000 || 0;

  switch (req.method) {
    case 'HEAD':
      res.writeHead(status, headers);
      res.end();
      break;
    case 'GET':
      if (utils.conditionalGET(req) && fresh(req.headers, headers)) {
        headers['content-length'] = 0;
        res.writeHead(304, headers);
        res.end();
      } else {
        res.writeHead(status, headers);

        function write() {
          while (content.length) {
            if (false === res.write(content.shift())) {
              res.once('drain', write);
              return;
            }
          }
          res.end();
        }

        write();
      }
      break;
    default:
      // This should never happen.
      res.writeHead(500, '');
      res.end();
  }
}
```