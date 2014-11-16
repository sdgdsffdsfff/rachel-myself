/*
  中间件
  主要用于解析通过url传递过来的query，并且挂载到req上，以供使用。
  使用方法：app.use(query)
*/

var url = require('url'),
	qs = require('querystring');

module.exports = function(req, res, next) {
	var urlPathname = url.parse(req.url).query;
	console.log(urlPathname);
	req.query = {};
	if (urlPathname) {
		//此时urlPathname是个对象字符串，所以需要解析
		//'foo=12&bar=45'会解析为{foo:12, bar:45}
		req.query = qs.parse(urlPathname);
	}
	next();
} 