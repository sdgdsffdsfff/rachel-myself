
var cluster = require('cluster');
var http = require('http');
var numCups = require('os').cpus().length;

console.log('another worker running!');
if (cluster.isMaster) {
    console.log('master start running~~');

    for (var i = 0; i < numCups; i++) {
        cluster.fork();
    }

    cluster.on('listenning', function(worker, address) {
        console.log('master is listenning, workerInfo are:  ' + worker.id + ',pid: ' + worker.process.pid + ', Address: ' + address.address + ':' + address.port);
    });

} else if (cluster.isWorker) {
    //关于fork出来的worker都是用process监听事件，且属性也是通过process获得
    console.log('worker is running, workerId: ' + cluster.worker.id);
    http.createServer(function(req, res) {
        console.log('current running workerId is ' + cluster.worker.id + ', pid is ' + process.pid);
        res.end('current running workerId is ' + cluster.worker.id + ', pid is ' + process.pid);
    }).listen(3000);
}