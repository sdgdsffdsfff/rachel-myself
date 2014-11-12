####Basic中间件
描述：basic认证中间件，是用来实现简单的用户密码登陆，当用户和密码验证通过后，可以通过一个callback方法继续执行。

同步验证：
```javascript
express().use(express.basicAuth(function(user, pass){
    return 'tj' == user && 'wahoo' == pass;
}));
```

异步验证：
```javascript
express().use(express.basicAuth(function(req, res, callback){
  User.authenticate({user: user, pass: pass});
}));
```

basicAuth的例子：
```javascript
var express = require('express');
var app = express();
//同步验证
app.use(express.basicAuth(function(user, pass){
    var isLogin = 'fens' == user && 'fens' == pass;
    console.log('Login:' + isLogin);
    return isLogin;
}));
app.use(function(req, res) {
   res.end('welcome~');
}).listen(3000);
```

输出结果：
1. 会弹出验证弹出框

![alt text](./imgs/basicAuth1.png "Title")

2. 在正确输入用户名和密码以后，可以正常访问页面

![alt text](./imgs/basicAuth2.png "Title")

###Basic认证
Basic认证是当客户端与服务端进行请求时，允许通过用户名和密码实现的一种身份认证方式。
如果一个页面需要Basic认证，它会检查请求报文头中的Authorization字段内容，该字段的值由认证方式和加密值构成。如下：

```javascript
$ curl -v "http://user:pass@www.baidu.com/"
> GET /HTTP/1.1
> Authorization:Basic dXN1cjpwYXNz
> User-Agent:...
> Host:...
> Accept:*/*
```
在Basic认证中，它会将用户和密码部分组合：username＋“：”＋password。然后进行Base64编码。
```javascript
var encode = function(username, password) {
    return new Buffer(usernmae+':'+password).toString('base64');
}
```

####Basic重要源码
1. 处理直接传入用户名和密码，例如：
app.use(express.basicAuth('username', 'password'));

```javascript
if ('string' == typeof callback) {
    username = callback;
    password = realm;
    if ('string' != typeof password) throw new Error('password argument required');
    realm = arguments[2];
    callback = function(user, pass){
      return user == username && pass == password;
    }
}
```

2. 针对请求头“Authorization:Basic dXN1cjpwYX“解析，scheme＝Basic，之后的内容是”用户名：密码“，进行Base64编码以后的值。通过以下代码的解析，可以拿到对应的用户名和密码。


```javascript
return function(req, res, next){
    //获取请求头中的authorization字段
    var authorization = req.headers.authorization;

    var parts = authorization.split(' ');

    var scheme = parts[0]//Basic
      , credentials = new Buffer(parts[1], 'base64').toString()
      , index = credentials.indexOf(':');
    
    var user = credentials.slice(0, index)//用户名
      , pass = credentials.slice(index + 1);//密码

    // async，异步，即验证完用户名和密码成功以后，还可以执行相应操作
    if (callback.length >= 3) {
      var pause = utils.pause(req);
      callback(user, pass, function(err, user){
        if (err || !user)  return unauthorized(res, realm);
        req.user = req.remoteUser = user;
        next();
        pause.resume();
      });
    // sync同步
    } else {
      if (callback(user, pass)) {
        req.user = req.remoteUser = user;
        next();
      } else {
        unauthorized(res, realm);
      }
    }
```
