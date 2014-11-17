/*
session中间件
原理：当程序需要为某个客户端请求创建一个session时，服务器会先检查这个客户端请求中是否已经有一个sessionId，如果有，则说明已经为该客户端创建过session，
则只需要把sessionId检索出来使用即可。
如果不包含sessionId，则会为此客户端创建一个session并生成一个与此session相关联的sessionId。并把该sessionId放在本次响应中返回给客户端保存
*/


var sid = Date.now();
var cache = {};

module.exports = function(req, res, next) {
	var sessionId = sid;
	Object.defineProperty(req, 'sessionId', {
		'get': function() {
			return cache[sessionId];
		},
		'set': function(val) {
			cache[sessionId] = val;
		}
	});

	if (!(req.headers.cookie && (req.sessionId = parseCookie(req.headers.cookie).sessionId))) {
		req.sessionId = (sid += 1);
		res.writeHead('Set-Cookie:', 'sessionId=' + req.sessionId);
	}
	next();
}

//解析从客户端返回的cookie
function parseCookie(cookie) {
	var cookies = cookie.split(';'),
		obj = {};
	cookies.forEach(function(v) {
		var fields = v.split('=');
		obj[fields[0].trim()] = fields[1];
	});

	return obj;
}