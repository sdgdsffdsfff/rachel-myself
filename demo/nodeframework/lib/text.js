/*
  文本渲染，只要为响应头设置Content-Type=text/plain即可
*/

module.exports = function(req, res, next) {
	res.text = function(txt) {
		res.writeHeader('Content-Type', 'text/plain');
		res.end(txt);
	}
	next();
}