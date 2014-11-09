####directory中间件
用处：当给定一个文件目录，通过它是可以将该目录下的文件以不同形式（html/json/text）展现出来。
针对给出的不同请求头Accept(如：Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8)
来判别返回哪种形式的文件。

它接收如下参数：  
1. hidden 显示隐藏文件，默认为false.  
2. icons 显示图标，默认为false.  
3. filter 在文件上应用这个过滤函数。默认为false.

重要源码如下：
```javascript
exports = module.exports = function directory(root, options){
  var hidden = options.hidden
    , icons = options.icons
    , filter = options.filter
    , root = normalize(root);

  return function directory(req, res, next) {
   //通过请求头中的accept字段获取以何种形式返回文件夹下文件
    var accept = req.headers.accept || 'text/plain'
      , url = parse(req.url)
      , dir = decodeURIComponent(url.pathname)
      , path = normalize(join(root, dir))
      , originalUrl = parse(req.originalUrl)
      , originalDir = decodeURIComponent(originalUrl.pathname)
      , showUp = path != root && path != root + '/';

    // check if we have a directory
    fs.stat(path, function(err, stat){
      if (err) return 'ENOENT' == err.code
        ? next()
        : next(err);
     //先保证这是一个目录文件
      if (!stat.isDirectory()) return next();

      // fetch files
      fs.readdir(path, function(err, files){
        if (err) return next(err);
        //removeHidden是把隐藏文件给忽略
        if (!hidden) files = removeHidden(files);
        //在该目录下，指定忽略某些文件
        if (filter) files = files.filter(filter);
        files.sort();

        // content-negotiation，内容协商
       //该部分的解析见下
        for (var key in exports) {
          if (~accept.indexOf(key) || ~accept.indexOf('*/*')) {
            exports[key](req, res, files, next, originalDir, showUp, icons);
            return;
          }
        }

        // not acceptable
        next(utils.error(406));
      });
    });
  };
};

```

#####解析以下代码
```javascript
for (var key in exports) {
  if (~accept.indexOf(key) || ~accept.indexOf('*/*')) {
    exports[key](req, res, files, next, originalDir, showUp, icons);
    return;
  }
}
```
在该文件中，我们有exports.html,exports.json,exports.plain针对这三种形式进行处理的专门函数。
所以上述的for循环即是根据请求的accept指定形式如html，调用exports.html函数对该目录下的文件进行处理。

exports.html处理方式：
将public目录下的directory.html用该目录下的文件名等文件信息渲染，并将该文件的内容res给请求，res.end(str).

exports.json处理方式：
```javascript
exports.json = function(req, res, files){
  //files是多个文件名组成的数组，如[a.txt, b.txt, cdir]
  files = JSON.stringify(files);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', files.length);
  res.end(files);
};
```

exports.json处理方式：
```javascript
exports.plain = function(req, res, files){
  //files是多个文件名组成的数组，如[a.txt, b.txt, cdir]
  files = files.join('\n') + '\n';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', files.length);
  res.end(files);
};
```
