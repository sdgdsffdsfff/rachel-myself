/*描述：服务器返回任意页面功能
即，通过设置一个静态资源目录，让浏览器可以访问任意该目录内的任意文件，该目录可以写死，任意文件，可以通过浏览器端url获取
url解析，可以通过url模块
*/
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer();

server.on('request', handler);

function handler(request, response) {
	function readFn(err, data) {
		//data表示读取到的数据
		if (err) {
			//err表示错误，如果读取不到数据或内部出错，err就会存在
			//错误处理，会让服务器更健壮
			response.statusCode = 404;//设置状态码，表示没找到资源
		} else {
			response.write(data);
		}
		response.end();
	}
	var pathname = __dirname + '/public/' + url2Path(request.url);
	fs.readFile(path.normalize(pathname), readFn);
}

//将url转换成资源路径
function url2Path(urlStr) {
	var urlObj = url.parse(urlStr);//将url信息封装成JSON对象
	console.log('path', urlObj.path);
	console.log('pathname', urlObj.pathname);
	//所以我们获取url的path部分，是通过pathname，整个path是包括search部分的
	var pathname = urlObj.path == '/' ? 'index.html' : urlObj.pathname;
	return	pathname;//得到路径信息
}

server.listen(3000);
