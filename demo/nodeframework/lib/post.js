/*
  中间件
  post请求，将数据挂载到req.body上。
*/
var qs = require('querystring');

module.exports = function(req, res, next) {
	var body_data = '';
	req.on('data', function(chunk) {
		body_data += chunk;
	});
	req.on('end', function() {
		try {
			console.log(body_data);
			req.body = qs.parse(body_data);
		} catch(e) {}
		next();
	});
}