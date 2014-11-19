####nodejs异步异常处理模块domain

对于nodejs程序开发，比较麻烦的是异步异常处理。我们常规的思维是，异常一步步的往上抛出，最后在客户端打印错误。不过因为nodejs的绝大部分都是异步异常，try...catch根本就捕捉不到，所以在该点的处理上会比较麻烦。

1. 模拟同步异常处理的文件sync.js文件，运行node sync.js。可能出现以下的结果，我们可以看到，通过try...catch，捕捉到了同步程序的异常。 
```javascript
current num is : 1.513167095836252
current num is : 9.152395972050726
[Error: Error: num is 9.152395972050726]
current num is : 3.559851343743503
current num is : 3.383595540653914
current num is : 7.9232730832882226
[Error: Error: num is 7.9232730832882226]
current num is : 9.24380135256797
[Error: Error: num is 9.24380135256797]
current num is : 7.834465801715851
[Error: Error: num is 7.834465801715851]
```

2. 模拟异步异常处理文件async.js文件，运行node async.js。可能出现以下结果，可以看到，异常没有被捕获到。
```javascript
current num is : 2.6454050093889236
current num is : 2.4625634332187474
current num is : 5.239798608236015

/Users/benlinhuo/rachel-myself/summary/node-domain/async.js:14
            throw new Error('Error: num is ' + num);    
                  ^
Error: Error: num is 5.239798608236015
    at null._onTimeout (/Users/benlinhuo/rachel-myself/summary/node-domain/async.js:14:10)
    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
```

3. 针对上2阐述的问题，我们用process.on()打印错误信息，文件：process-async.js，运行node process-async.js。结果如下,可以看到，异常又被捕获到了。我们是利用process.on('uncaughtException')的内置函数。不过虽然我们可以记录这个错误日志，也不会异常退出，但是我们是没有办法对发现错误的请求友好返回，只能让它超时返回。
```javascript
current num is : 3.077380445320159
current num is : 2.576722444500774
current num is : 7.765589756891131
[Error: Error: num is 7.765589756891131]
current num is : 0.16228685388341546
current num is : 4.6692244918085635
current num is : 7.188201937824488
[Error: Error: num is 7.188201937824488]
current num is : 5.339443311095238
[Error: Error: num is 5.339443311095238]
```

4. 下面我们使用domain模块，做异步异常的处理。文件：domain.js。运行：node domain.js。结果如下，从结果看出，异常被捕获到了。
```javascript
sync num:7.3049411084502935
{ [Error: sync Error: num is 7.3049411084502935]
  domain: 
   { domain: null,
     _events: { error: [Function] },
     _maxListeners: 10,
     members: [] },
  domainThrown: true }
async num:5.354942374397069
{ [Error: async Error: num is 5.354942374397069]
  domain: 
   { domain: null,
     _events: { error: [Function] },
     _maxListeners: 10,
     members: [] },
  domainThrown: true }
```

5. 这是一个异步异常的特例，文件：special.js。运行： node special.js。可以看到异常未被捕获。原因是：timer和e两个关键对象在初始化的时候都没有在domain范围内，因此在next函数监听事件被触发时，执行抛出异常的回调根本没有处于domain的包裹中，就不会被domain捕获到异常。
```javascript

/Users/benlinhuo/rachel-myself/summary/node-domain/special.js:12
        throw new Error('Receive data error!');     
              ^
Error: Receive data error!
    at EventEmitter.<anonymous> (/Users/benlinhuo/rachel-myself/summary/node-domain/special.js:12:12)
    at EventEmitter.g (events.js:180:16)
    at EventEmitter.emit (events.js:92:17)
    at null._onTimeout (/Users/benlinhuo/rachel-myself/summary/node-domain/special.js:7:7)
    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
```

6. 该文件对上述5出现的问题做一个处理。文件：deal-special.js 。运行，从结果看出，异常被捕获了。我们其实做的处理是：将e和timer加入到domain的范围内即可，利用d.add()。
```javascript
{ [Error: Receive data error!]
  domain: 
   { domain: null,
     _events: { error: [Function] },
     _maxListeners: 10,
     members: [ [Object], [Object] ] },
  domainThrown: true }
```

相关资料：https://cnodejs.org/topic/516b64596d38277306407936
