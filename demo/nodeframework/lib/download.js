/*
中间件：download文件下载
  原理：通过设置response信息头即可做到。设置三个属性：
  Content-disposition：下载的附件文件名称(客户端下载的默认文件名)
  Content-Type：下载文件的类型
  Content-Length: 下载文件的大小
  @param filename 客户端下载的文件名
  @buf 被下载的文件内容
*/

module.exports = function(req, res, next) {
	res.download = function(filename, buf) {
		//判断buf是否是Buffer对象
		if (Buffer.isBuffer(buf)) {
			//设置头
			res.writeHead(200, {
				//设置下载文件名称
				'Content-disposition': 'attachment; filename=' + filename,
				//保证是二进制类型，这样浏览器可用下载方式
				'Content-Type': 'application/octet-stream',
				//设置buf大小
				'Content-Length': buf.length 
			});
			//响应
			res.end(buf);
		} else {
			res.end();
		}

	}
	next();
}
