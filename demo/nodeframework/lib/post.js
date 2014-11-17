/*
  中间件
  post请求，将数据挂载到req.body上。
*/
var qs = require('querystring');

module.exports = function(req, res, next) {	
	var body_data = '';
	//重置
	req.files = {};
	req.body = {};
	req.on('data', function(chunk) {
		body_data += chunk;
	});
	req.on('end', function() {
		var contentType = req.headers['content-type'];
		var isMulti = /(boundary=)/g.test(contentType);
		res.end('pppppp');
		//文件上传
		if (isMulti) {
			var boundary = RegExp["$'"];

			var boundaryStandard = "--" + boundary + '\r\n';
			var boundaryEnd = boundaryStandard + '--';

			//删除头尾边界字符串
			body_data = body_data.substring(boundaryStandard.length, body_data.length - boundaryEnd.length);

			var fields = body_data.split(boundaryStandard);

			var RN = '\r\n\r\n';//头信息和体信息之间的分割字符串
			fields.forEach(function(field) {
				var index = field.indexOf(RN);

				var header = field.substring(0, index);
				var body = field.substring(index + RN.length);
				body = body.substring(0, body.length - RN.length / 2);//去除最后的"\r\n"

				//获取fieldName
				/name=\"(.*?)\"/g.test(header);
				var fieldName = RegExp.$1;

				var isFile = /filename/gi.test(header);
				if (isFile) {
					req.files[fieldName] = new Buffer(body);
				} else {
					req.body[fieldName] = body;
				}
			});

		} else {
			try {
				req.body = qs.parse(body_data);
			} catch(e) {}	
		}
		next();

	});

}