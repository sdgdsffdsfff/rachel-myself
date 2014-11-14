#####框架构思
我们这边使用的是中间件的形式，来为框架添加功能，这些中间件是在执行主业务逻辑之前执行的，且这些中间件自身之间也是有顺序的。web服务器的request事件的触发，表示有客户来访问我们的服务器资源。而且我们的服务器主逻辑，就是为了响应request事件的。伪代码的表示如下：
```javascript
function handler() {
    //中间件按照顺序逐个执行
    middleWare1();
    middleWare2();
    ...
    主业务逻辑处理
}
server.on('request', handler);
```


#####怎样保证中间件的先后顺序执行
如果想要中间件的顺序执行，关靠数组的执行顺序是达不到的，因为js会牵扯到异步执行和延迟执行（setTimeout）的情况。这些情况下，我们可以通过以下方式保证它的顺序执行。
即我们给中间件一个next函数，当执行next函数的时候，其实表示中间件自身是已经被执行完成了的（保证自己要做的一切都搞定了才放手），才把权力交棒给下一个中间件。这么说来，只要中间件自身内部不调用next函数，那下一个中间件就不会被执行。权力牢牢掌握在自己手里。

####代码执行原理
假设该文件名为app.js
```javascript
var App = require('../../').App,
    app = new App(),
    middle01 = require('./middle01'),
    middle02 = require('./middle02');

app.use(middle01);
app.use(middle02);
app.listen(process.env.PORT);//如此监听的话就可以在使用node执行nodejs程序时，指定端口号
```

原理说明：

1. 当我们执行node app.js时候，它会先new App()，即启动一个应用程序，这个时候应用程序使用server.on('request', handler)。接下来执行use，即将所有用到的中间件都放入到middleWareList数组中。之后app.listen()对应端口。
2. 此时，当客户端发送一个请求过来，服务端监听到request请求，便会执行handler函数。该函数会默认执行第一个中间件（可是一般而言，每个中间件都会用next()将执行权限往下传递），执行完，其内部的next便会继续执行第二个，...。最终将所有的中间件（即middleWareList数组中所有元素）都执行完毕。

