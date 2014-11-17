/*
  动态数据渲染页面
  我们使用中间件时，用app.use(view(__dirname + '/public'));。将该目录下的所有内容解析存储到了viewCache中
  当使用res.view(filename, locals)时，便可以直接res.write(viewCache[fileName](locals));即可

它只有两种语法：<%= xxx %>输出内容
             <% js源码 %>js代码

  类似于使用ejs或者jade模板引擎
*/
var fs = require('fs'),
	path = require('path');

module.exports = function(viewPath) {
	//用于存储模版页面的Function形式
	var viewCache = {};

	fs.readdir(viewPath, function(err, files) {
		files.forEach(function(file) {
			var filePath = path.join(viewPath, file);

			fs.readFile(filePath, function(err, data) {

				var str = data.toString();
				var buf = [];
				buf.push('var result = "";');
				var htmlPart = "";

				var len = str.length
				for (var i = 0; i < len;) {
					if (str.slice(i, i + 2) === '<%') {
						var end = str.indexOf('%>', i);
						var jsPart = str.slice(i + 2, end);
						i = end + 2;
						buf.push(filterRN(htmlPart));

						htmlPart = '';

						if (jsPart.slice(0, 1) === '=') {
							buf.push("\r\nresult += " + jsPart.slice(1) + ';\r\n');
						} else {
							buf.push("\r\n" + jsPart + "\r\n");
						}
					} else {
						htmlPart += str.slice(i, i + 1);
						i += 1;
					}
				} 

				buf.push(filterRN(htmlPart));
				buf.push("return result;");
				viewCache[file] = new Function("locals", buf.join(''));
			});
		});
	});

	return function(req, res, next) {
		res.view = function(fileName, locals) {
			res.write(viewCache[fileName](locals));
			res.end();
		}
		next();
	}
}

function filterRN(s) {
	s = s.replace("\'", "\"")
		.replace(/\n/g, "\\n")
		.replace(/\r/g, "\\r");
	return "result += \'" + s + "\';\n\r";
}

