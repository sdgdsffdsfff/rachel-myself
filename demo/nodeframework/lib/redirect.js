/*
  中间件
  重定向，跳转的url有三种类型：
  1. 完整网址
  2. 本地的根目录（绝对地址）
  3. 本地的相对路径
*/

module.exports = function(req, res, next) {
	res.redirect = function(url) {
		res.writeHead(302, {
			Location: location(req, url)
		});
		res.end();
	}
	next();
}

//返回要跳转的URL绝对地址
function location(req, url) {
	//完整网址
	if (/^http:\/\//.test(url)) {
		return url;
	} else if (/^\//.test(url)) {
		//本地的根目录
		return 'http://' + req.headers.host + url;
	} else {
		return 'http://' + req.headers.host + req.url + '/' + url;
	}
}