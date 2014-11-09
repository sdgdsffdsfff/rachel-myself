####urlencoded中间件

主要是用来解析MIME类型为"application/x-www-form-urlencoded"的数据表单。我们是使用先接收内容再解析的方式.同json.js（中间件很类似）

解析完以后，我们就可以针对这种数据类型，直接使用req.body.foo（可以获取其值为bar）

比较常见的数据提交是通过网页表单提交数据到服务器端，如：
```html
<form action='/upload' method='post'>
   <label for='username'>Username: </label>
   <input type='text' name='username' id='username'>
   <input type='submit' name='submit' value='submit'>
</form>
```

默认表单提交，请求头中的Content-Type字段值为application/x-www-form-urlencoded。
不过它的报文体内容跟查询字符串相同，foo=bar&baz=val。要解析它还是很容易的。

框架代码和json.js很类似，会做limit限制。重点解析函数是qs.parse()。它是qs模块中的一个函数。
```javascript
exports = module.exports = function(options){

  var limit = options.limit
    ? _limit(options.limit)
    : noop;

  return function urlencoded(req, res, next) {

    // check Content-Type
    if ('application/x-www-form-urlencoded' != utils.mime(req)) return next();

    // parse
    limit(req, res, function(err){
      if (err) return next(err);
      var buf = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk){ buf += chunk });
      req.on('end', function(){
        try {
          req.body = buf.length
          //**************
            ? qs.parse(buf, options)
         //***************
            : {};
          next();
        } catch (err){
          err.body = buf;
          next(err);
        }
      });
    });
  }
};
```

qs模块中的parse部分,我们只需要关心其中的parseString()即可
```javascript
exports.parse = function(str){
  if (null == str || '' == str) return {};
  return 'object' == typeof str
    ? parseObject(str)
    : parseString(str);
};

//将foo=bar&baz=val，解析为{foo: bar, baz: val}.然后再将这个赋值给req.body即可。
//其中的每个小函数，如reduce等等，都只是考虑了多种情况，而导致看起来很复杂，其实的主要作用就是如上所说，将字符串转为对应的对象
function parseString(str){
  var ret = reduce(String(str).split('&'), function(ret, pair){
    var eql = indexOf(pair, '=')
      , brace = lastBraceInKey(pair)
      , key = pair.substr(0, brace || eql)
      , val = pair.substr(brace || eql, pair.length)
      , val = val.substr(indexOf(val, '=') + 1, val.length);

    // ?foo
    if ('' == key) key = pair, val = '';
    if ('' == key) return ret;

    return merge(ret, decode(key), decode(val));
  }, { base: createObject() }).base;

  return restoreProto(compact(ret));
}
```