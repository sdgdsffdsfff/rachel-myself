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