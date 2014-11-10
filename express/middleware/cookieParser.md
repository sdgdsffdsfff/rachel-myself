####cookieParser主要是用来解析cookie的，包括signedCookie
使用该中间件以后，我们就可以直接用req.cookies.xxx来获取对应cookie的name为xxx的值了


当我们使用cookirParser(secret)中间件以后，这个对象默认是{}，否则包含了用户代理传过来的签名后的cookie。签名后的cookies是被放在一个单独的对象里的，即req.signedCookies,使用它是因为故意攻击者是会很简单的替换掉req.cookie的值。不过我们签名的cookie并不代表它是隐藏的或者加密的，它只是做了简单的防止篡改cookie的操作而已。

签名cookie使用如下：
```javascript
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
req.signedCookies.user
// => "tobi"
```

我们是把解析出的cookie挂载到req对象上，让业务代码可以直接访问。cookie有几个选项，其中之一是：
secure：当其为true时，在http中是无效的，在https中才有效，表示创建的cookie只能在https连接中被浏览器传递到服务器端进行会话验证，如果是http连接则不会传递该信息。

代码解析如下：
```javascript
//example :  connect.cookieParser('optional secret string').此时的secret是“optional secret string”
module.exports = function cookieParser(secret){
  return function cookieParser(req, res, next) {
    if (req.cookies) return next();
    var cookies = req.headers.cookie;//获取请求头中的cookie

    req.secret = secret;
    req.cookies = {};
    req.signedCookies = {};

    if (cookies) {
      try {
       //利用已有的方法cookie.parse解析获取到的cookie，它是一个拥有多个键值对的对象，可以通过req.cookies.xxx来获取其值。
       //解析的cookie，Cookie:sessid=835C284A-8366-DD7E-ED10-D50FA9FB534F; isp=true; 
       req.cookies = cookie.parse(cookies);
      //签名cookie需要做特殊处理
       if (secret) {
          req.signedCookies = utils.parseSignedCookies(req.cookies, secret);
          req.signedCookies = utils.parseJSONCookies(req.signedCookies);
        }
        req.cookies = utils.parseJSONCookies(req.cookies);
      } catch (err) {
        err.status = 400;
        return next(err);
      }
    }
    next();
  };
};

```

####总结
当我们在服务端设置了cookie之后，客户端收到这个带Set-Cookie响应后，在之后的请求时会在cookie字段中带上这个值。如下：
```javascript
res.setHeader('Set-Cookie','foo=bar;Path=/;Expires=Sun,23-Apr-23 09:01:35 GMT;Domain=.domain.com;')
res.writeHead(200);
res.end();
```
以上会在报文头中形成Set-Cookie字段：
Set-Cookie: foo=bar;Path=/;Expires=Sun,23-Apr-23 09:01:35 GMT;Domaimain=.maidomain.com