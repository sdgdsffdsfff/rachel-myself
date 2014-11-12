####CSRF中间件
描述：跨域请求csrf保护中间件，通过req.csrfToken()令牌函数绑定到请求的表单字段。这个令牌会对访客会话进行验证。

#####CSRF
CSRF全称是Cross-Site Request Forgery，中文意思是跨站请求伪造。举例如下：

假设某个网站有个留言程序，提交留言的接口如：http://domain_a.com/guestbook。 用户通过post提交content字段就可以留言成功。

而对于服务器端自动从Session数据中判断是谁提交的数据，补足username和updatedAt两个字段后向数据库总写入数据。正常情况下，谁提交的留言就会在 列表中显示谁的信息。

CSRF漏洞被发现，则可以在另一个网站http://domain_b.com/attack  上构造一个表单提交。这样就只要引诱某个domain_a的登录用户访问这个domain_b的网站，就会自动提交一个留言。
由于在提交到domain_a的过程中，浏览器会将domain_a的cookie发送到服务器，尽管这个请求是来自domain_b的，但服务器并不知情，用户也不知情。这便是一个CSRF攻击的例子。

以下是解决CSRF攻击的一种方案（添加随机值）

默认情况下，这个中间件会产生一个名为"_csrf"的标志。这个标志应该添加到那些需要服务器更改的请求里，可以放在一个表单的隐藏域，请求参数等。

默认情况下，我们是会通过检查bodyParser()产生的req.body，query()函数产生的query，和x-csrf-token的header

代码解析如下：
```javascript
//获取请求中的_csrf值。它可能在req.body，或者查询字符串query或者请求头中
function defaultValue(req) {
  return (req.body && req.body._csrf)
    || (req.query && req.query._csrf)
    || (req.headers['x-csrf-token']);
}
```

对于一个请求接口做csrf判断
```javascript
module.exports = function csrf(options) {;
  var value = options.value || defaultValue;

  return function(req, res, next){
    // generate CSRF token
    //utils.uid(24)是为每个请求的用户在Session中赋予一个随机值，即生成一个随机csrf值
    var token = req.session._csrf || (req.session._csrf = utils.uid(24));

    // ignore these method（一般的请求是POST）
    if ('GET' == req.method || 'HEAD' == req.method || 'OPTIONS' == req.method) return next();

    // determine value
    var val = value(req);

    // check，比较从session中取出的csrf值，和请求头中传过来的csrf值，如果相同，则表明是同一个请求用户，否则不予通过，不认为是一个用户
    if (val != token) return next(utils.error(403));
    
    next();
  }
};
```

####总结
这个判断过程很简单，我们实现给每个请求的用户自动生成一个csrf值放在表单的隐藏域中，然后在它提交的时候会默认带上，到服务器端后，会拿出之前存储在session中的该csrf值和请求传递过来的csrf值，相同则标示请求合理通过，否则不通过。

表单可举例如下：
```html
<form id='test' method='post' action='http://domain_a.com/guestbook'>
    <input type='hidden' name='content' value='vim是这个世界上最好的编辑器'>
    <input type='hidden' name='_csrf' value='<%=_csrf%>'>
</form>
```

