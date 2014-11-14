/*
这是个静态资源服务器，可以根据url中指定的pathname来读取对应文件的内容并返回
*/
var http = require('http');
var fs = require('fs');
var url = require('url');

module.exports = function static(parPath) {

	return function(req, res, next) {
		var staticPath = parPath + url2Path(req.url);
		fs.readFile(staticPath, callback);
		function callback(err, data) {
			if (err) {
				//在添加了get和post方法之后，这边找不到静态资源，则会交给下面的get和post请求。
				//如果找到了，就不需要往下执行了，即不需要next
				//res.statusCode = 404;
				next();
			} else {
				res.write(data);
			}
			res.end();//类似于返回一个新页面
		}
	}

	function url2Path(reqUrl) {
		var pathname = url.parse(reqUrl).pathname;
		//不能用兼容错误，因为我们的意图是：如果找不到对应的文件，是需要去执行get或者post请求的。
		//如果做了兼容处理，就永远不会去执行get或post了
		// return pathname == '/' ? 'index.html' : pathname;
		return pathname;
		
	}
}


