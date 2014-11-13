/*
这是个静态资源服务器，可以根据url中指定的pathname来读取对应文件的内容并返回
*/
var http = require('http');
var fs = require('fs');
var url = require('url');

module.exports = function static(parPath) {
    //这个插件无需next
	return function(req, res, next) {
		var staticPath = parPath + url2Path(req.url);
		fs.readFile(staticPath, callback);
		function callback(err, data) {
			if (err) {
				res.statusCode = 404;
			} else {
				res.write(data);
			}
			res.end();
		}
	}

	function url2Path(reqUrl) {
		var pathname = url.parse(reqUrl).pathname;
		return pathname == '/' ? 'index.html' : pathname;
	}
}


