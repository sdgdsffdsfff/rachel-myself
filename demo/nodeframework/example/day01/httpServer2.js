var http = require('http');
var fs = require('fs');
var server = http.createServer();

server.on('request', handler);
// server.on('request', handlerSync);
/*
fs.readFile：异步的，异步是指底层的读取数据操作和主程序是两个进程，也就是不会阻塞，而同步正好相反
fs.readFileSync：同步的
二者都可以用来读取文件内容
不过在nodejs实际开发中，一般都采用异步方式，因为nodejs优势就在于非阻塞I/O异步，这样性能会更高
*/

//同步
function handlerSync(request, response) {
	var data = fs.readFileSync(__dirname + '/public/index.html');//读取文档数据并返回，本程序才会往下执行
	response.write(data);
	response.end();//结束响应
}

//异步
function handler(request, response) {
	//回调函数，当底层得到文档后，会调用该函数
	function readCallback(err, data) {
		response.end(data);
	}
	//异步方式不会阻塞主程序进程
	fs.readFile(__dirname + '/public/index.html', readCallback);
}

server.listen(3000);
