##cluster模块介绍

cluster是一个nodejs内置的模块，用于nodejs多核处理。cluster模块，可以帮助我们简化多进程并行化程序的开发难度，轻松构建一个用于负载均衡的集群。我们可以通过cluster启动多核的node提供web服务。

一。案例分析一：（app.js，基础）
```javascript

var cluster = require('cluster');

var http = require('http');

var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('master start...');

    //Fork workers.
    for(var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening', function(worker, address) {
        console.log('listening: worker ' + worker.process.pid + ', Address: ' +address.address + ':' + address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('hello world \n');
    }).listen(0);
}
```

控制台打印结果：
```javascript
➜  nodejs-cluster  node app.js
master start...
listening: worker 17379, Address: 0.0.0.0:56852
listening: worker 17378, Address: 0.0.0.0:56852
listening: worker 17381, Address: 0.0.0.0:56852
listening: worker 17380, Address: 0.0.0.0:56852
```

由以上打印结果：master是总控节点，worker是运行节点，然后根据CPU的数量来启动worker.因为运行的mac是双核双通道的CPU，所以被检测为4核，启动了4个worker。


二。cluster的工作原理

每个worker进程通过使用child_process.fork()函数，基于IPC（Inter-Process Communication，进程间通信），实现与master进程间通信。

当worker使用server.listen（...）函数时 ，将参数序列传递给master进程。如果master进程已经匹配workers，会将传递句柄给工人。如果master没有匹配好worker，那么会创建一个worker，再传递并句柄传递给worker。

在边界条件，有3个有趣的行为：
注：下面server.listen()，是对底层“http.Server-->net.Server”类的调用。

1. server.listen({fd: 7}):在master和worker通信过程，通过传递文件，master会监听“文件描述为7”，而不是传递“文件描述为7”的引用。

2. server.listen(handle):master和worker通信过程，通过handle函数进行通信，而不用进程联系

3. server.listen(0):在master和worker通信过程，集群中的worker会打开一个随机端口共用，通过socket通信，像上例中的56852
 
当多个进程都在 accept() 同样的资源的时候，操作系统的负载均衡非常高效。Node.js没有路由逻辑，worker之间没有共享状态。所以，程序要设计得简单一些，比如基于内存的session。

因为workers都是独力运行的，根据程序的需要，它们可以被独立删除或者重启，worker并不相互影响。只要还有workers存活，则master将继续接收连接。Node不会自动维护workers的数目。我们可以建立自己的连接池。

三。cluster的API
```javascript
cluster对象
cluster的各种属性和函数

cluster.setttings:配置集群参数对象
cluster.isMaster:判断是不是master节点
cluster.isWorker:判断是不是worker节点
Event: 'fork': 监听创建worker进程事件
Event: 'online': 监听worker创建成功事件
Event: 'listening': 监听worker向master状态事件
Event: 'disconnect': 监听worker断线事件
Event: 'exit': 监听worker退出事件
Event: 'setup': 监听setupMaster事件
cluster.setupMaster([settings]): 设置集群参数
cluster.fork([env]): 创建worker进程
cluster.disconnect([callback]): 关闭worket进程
cluster.worker: 获得当前的worker对象
cluster.workers: 获得集群中所有存活的worker对象
worker对象
worker的各种属性和函数：可以通过cluster.workers, cluster.worket获得。

worker.id: 进程ID号
worker.process: ChildProcess对象
worker.suicide: 在disconnect()后，判断worker是否自杀
worker.send(message, [sendHandle]): master给worker发送消息。注：worker给发master发送消息要用process.send(message)
worker.kill([signal='SIGTERM']): 杀死指定的worker，别名destory()
worker.disconnect(): 断开worker连接，让worker自杀
Event: 'message': 监听master和worker的message事件
Event: 'online': 监听指定的worker创建成功事件
Event: 'listening': 监听master向worker状态事件
Event: 'disconnect': 监听worker断线事件
Event: 'exit': 监听worker退出事件
```

三。案例二（cluster.js）
```javascript
/* master和worker的通信 */

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('{master} ' + "start master...");

    for (var i = 0; i < numCPUs; i++) {
        
        var wk = cluster.fork();
        //worker.send(message, [sendHandle]): master给worker发送消息。注：worker给发master发送消息要用process.send(message)
        wk.send('{master} ' + 'hi worker ' + wk.id);
    }

    //cluster.fork([env]): 创建worker进程
    cluster.on('fork', function(worker) {
        console.log('{master} ' + 'fork: worker ' + worker.id);
    });

    //Event: 'online': 监听worker创建成功事件
    //('fork' 和 'online' 的区别在于前者发生于主进程尝试分支出工作进程时，而后者发生于工作进程被执行时。)
    cluster.on('online', function(worker) {
        console.log('{master} ' + 'online: worker' + worker.id);
    });

    //Event: 'listening': 监听worker向master状态事件
    cluster.on('listening', function(worker, address) {
        console.log('{master} ' + 'listening: worker' + worker.id + ', pid:' + worker.process.pid + ', Address:' + address.address + ':' + address.port);
    });

    //Event: 'disconnect': 监听worker断开事件
    cluster.on('disconnect', function(worker) {
        console.log('{master} ' + 'disconnect: worker' + worker.id);
    });

    //Event: 'exit': 监听worker退出事件
    cluster.on('exit', function(worker, code, signal) {
        console.log('{master} ' + 'exit worker ' + worker.id + ' died');
    }); 

    function eachWorker(callback) {
        for (var id in cluster.workers) {
            callback(cluster.workers[id]);
        }
    }

    setTimeout(function() {
        eachWorker(function(worker) {
            worker.send('{master} ' + 'send message to worker' + worker.id);
        });
    }, 3000);

    Object.keys(cluster.workers).forEach(function(id) {
        //Event: 'message': 监听master和worker的message事件
        cluster.workers[id].on('message', function(msg) {
            console.log('{master} ' + 'message ' + msg);
        });
    });

} else if (cluster.isWorker) {
    console.log('{worker} ' + 'start worker ...' + cluster.worker.id);

    //接收 master给worker发送消息
    process.on('message', function(msg) {
        console.log('{worker} ' + msg);
        //worker给发master发送消息要用
        process.send('{worker} worker' + cluster.worker.id + ' received!');
    });

    http.createServer(function(req, res) {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end('worker' + cluster.worker.id + ', PID:' + process.pid);
    });

}   
```

打印结果：
```javascript
➜  nodejs-cluster  node cluster.js
{master} start master... 最先启动master进程（主进程，可以理解成所有worker的分配者）
{master} fork: worker 1  当执行循环中cluster.fork()的时候，他会执行绑定的事件cluster.on('fork', ...)
{master} fork: worker 2
{master} fork: worker 3
{master} fork: worker 4
{master} online: worker1
{master} online: worker2
{master} online: worker3
{worker} start worker ...1  fork出来的worker开始工作
{worker} {master} hi worker 1  master向worker传递message,worker接收到该消息，打印
{master} online: worker4
{master} message {worker} worker1 received!  这是worker用process向master传递message,master接收，打印
{worker} start worker ...3
{worker} start worker ...2
{worker} {master} hi worker 3
{master} message {worker} worker3 received!
{worker} {master} hi worker 2
{master} message {worker} worker2 received!
{worker} start worker ...4
{worker} {master} hi worker 4
{master} message {worker} worker4 received!
{worker} {master} send message to worker1
{worker} {master} send message to worker2
{worker} {master} send message to worker3
{worker} {master} send message to worker4
{master} message {worker} worker1 received!
{master} message {worker} worker2 received!
{master} message {worker} worker3 received!
{master} message {worker} worker4 received!
```


四。案例三(server.js)，用cluster实现负载均衡
```javascript

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('[master] ' + "start master...");

    for (var i = 0; i < numCPUs; i++) {
         cluster.fork();
    }

    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });

} else if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    http.createServer(function (req, res) {
        console.log('worker'+cluster.worker.id);
        res.end('worker'+cluster.worker.id+',PID:'+process.pid);
    }).listen(3000);
}
```

启动服务器
```javascript
conan@conan-deskop:~/nodejs/nodejs-cluster$ node server.js
[master] start master...
[worker] start worker ...1
[master] listening: worker1,pid:2925, Address:0.0.0.0:3000
[worker] start worker ...3
[master] listening: worker3,pid:2931, Address:0.0.0.0:3000
[worker] start worker ...4
[master] listening: worker4,pid:2932, Address:0.0.0.0:3000
[worker] start worker ...2
[master] listening: worker2,pid:2930, Address:0.0.0.0:3000
worker4
worker2
worker1
worker3
worker4
worker2
worker1
```

用curl工具访问(mac)
```javascript
➜  nodejs-cluster curl 192.168.1.20:3000
worker4,PID:2932
➜  nodejs-cluster curl 192.168.1.20:3000
worker2,PID:2930
➜  nodejs-cluster curl 192.168.1.20:3000
worker1,PID:2925
➜  nodejs-cluster curl 192.168.1.20:3000
worker3,PID:2931
➜  nodejs-cluster curl 192.168.1.20:3000
worker4,PID:2932
➜  nodejs-cluster curl 192.168.1.20:3000
worker2,PID:2930
➜  nodejs-cluster curl 192.168.1.20:3000
worker1,PID:2925
```

五。cluster负载均衡策略的测试（使用siege：开源压力测试工具，假定已经安装了siege）.siege安装使用可以看“在mac下安装siege以及使用”笔记

启动node cluster
```javascript
$ node load-blance.js > server.log
```

运行siege启动命令，每秒50个并发请求
```javascript
~ sudo siege -c 50 http://localhost:3000

HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.01 secs:      16 bytes ==> /
HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.01 secs:      16 bytes ==> /
HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.02 secs:      16 bytes ==> /
HTTP/1.1 200   0.00 secs:      16 bytes ==> /
HTTP/1.1 200   0.02 secs:      16 bytes ==> /
HTTP/1.1 200   0.01 secs:      16 bytes ==> /
HTTP/1.1 200   0.01 secs:      16 bytes ==> /
.....

^C
Lifting the server siege...      done.                                                                Transactions:                    3760 hits
Availability:                 100.00 %
Elapsed time:                  39.66 secs
Data transferred:               0.06 MB
Response time:                  0.01 secs
Transaction rate:              94.81 trans/sec
Throughput:                     0.00 MB/sec
Concurrency:                    1.24
Successful transactions:        3760
Failed transactions:               0
Longest transaction:            0.20
Shortest transaction:           0.00

FILE: /var/siege.log
You can disable this annoying message by editing
the .siegerc file in your home directory; change
the directive 'show-logfile' to false.
```

统计结果，执行3760次请求，消耗39.66秒，每秒处理94.81次请求

查看server.log文件
```javascript
~  ls -l
total 64
-rw-rw-r-- 1 conan conan   756  9月 28 15:48 server.js
-rw-rw-r-- 1 conan conan 50313  9月 28 16:26 server.log

~ tail server.log
worker4
worker1
worker2
worker4
worker1
worker2
worker4
worker3
worker2
worker1
```

最后，我们分析一下server.log，可以得到如下结论：
```javascript
 worker1:1559
 worker2:1579
 worker3:1570
 worker4:1535
```

由以上结论可以看出，请求被分配到了worker的数据量相当。所以，cluster的负载均衡策略，应该就是随机分配的。所以，我们的cluster可以构建出多核应用，充分的利用多CPU的性能。