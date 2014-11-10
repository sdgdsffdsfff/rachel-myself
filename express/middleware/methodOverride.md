####methodOverride中间件
该中间件是针对Restful理论的提出而有的，因为我们现在的实际环境都还没有足够多的支持REST。

比如通过ajax，大多数浏览器可以发出原生的PUT/DELETE方法，不使用ajax，就只能是get和post。

在我们的实际开发中，没有谁可以保证浏览器能发出真的PUT，也没有谁敢保证web服务器可以理解真正的PUT,即使web服务器立即，也不能保证服务器端开发语言能够理解
（比如php有$_GET,$_POST,但是没有$_PUT）

所以我们如果想要使用PUT/DELETE,某些时候是通过发送POST进行模拟的。常见有两种方式：
1. 通过form表单
```javascript
<form method='post'>
    <input type="hidden" name="_method" value='put' />
</form>
```

2. 通过http请求的header（requrest message），一般是x-http-method-override:put

以下是该中间件的代码，它的主要目的就是为了解析不能被web服务器识别的put或者delete操作(模拟得到)
```javascript
module.exports = function methodOverride(key){
  key = key || "_method";
  return function methodOverride(req, res, next) {
    req.originalMethod = req.originalMethod || req.method;

    // req.bod
    //例如：表单提交，如上的表单就可以通过如下形式获取
    if (req.body && key in req.body) {
      req.method = req.body[key].toUpperCase();
      delete req.body[key];
    // check X-HTTP-Method-Override
    } else if (req.headers['x-http-method-override']) {
      req.method = req.headers['x-http-method-override'].toUpperCase();
    }
    
    next();
  };
};
```