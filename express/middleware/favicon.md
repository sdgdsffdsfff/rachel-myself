该中间件时为了给一个网站（或者说项目），请求一个默认图标（ajk也有，response.js中）。
使用：app.use(express.favicon());//use使用中间件

可以简单如下：
```javascript
if('/favicon.ico' === url) {
    var expires = new Date();
    expires.setTime(expires.getTime() + conf.maxAge * 1000);
    this.res.setHeader("Expires", expires.toUTCString());
    this.res.setHeader("Content-Type", 'image/x-icon');
    this.res.setHeader("ETag", 'FAVICONFIXED');
    this.res.setHeader("Cache-Control", 'public, max-age=' + conf.maxAge);
    this.res.writeHead(this.status.NotModified_304, 'Not Modified');
    this.res.end();
    return true;
}
return false;
```

该中间件原理：将该图标当成一个文件，用fs模块读取，内容作为传送的body。其他头信息，需要注意的是，为了尽量节省资源，设置了ETag和Cache-control，尽量使用缓存（缓存时间也比较久）。

代码如下：
```javascript
module.exports = function favicon(path, options){
  var options = options || {}
    , path = path || __dirname + '/../public/favicon.ico'
    , maxAge = options.maxAge || 86400000
    , icon; // favicon cache

  return function favicon(req, res, next){
    if ('/favicon.ico' == req.url) {
      if (icon) {
        res.writeHead(200, icon.headers);
        res.end(icon.body);
      } else {
        fs.readFile(path, function(err, buf){
          if (err) return next(err);
          icon = {
            headers: {
                'Content-Type': 'image/x-icon'
              , 'Content-Length': buf.length
              , 'ETag': '"' + utils.md5(buf) + '"'
              , 'Cache-Control': 'public, max-age=' + (maxAge / 1000)
            },
            body: buf
          };
          res.writeHead(200, icon.headers);
          res.end(icon.body);
        });
      }
    } else {
      next();
    }
  };
};
```