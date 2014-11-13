var http = require('http');
//通过http.createServer([requestListener])方法可创建一个http.server的服务器对象实例
var server = http.createServer();

//接下来是需要监听server的request事件，也就是当有客户端访问服务器时，内部会创建一个request对象。
//当require请求对象创建后便会触发该事件
server.on('request', handler);

/* handler是个事件处理函数，它会接收到两个对象，
request对象：是http.IncomingMessage类型，它只是个只读流
response对象，是http.ServerResponse类型，是个可写流
*/
function handler(request, response) {
	response.write('hello world');//向浏览器端写入数据
	response.end();//结束响应
}

server.listen(3000);
