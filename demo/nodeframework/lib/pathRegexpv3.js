/*
 这只是作为一个模块pathRegexp 被调用，并不是中间件，所以无需(req, res, next)
*/
module.exports = pathRegexp;

function pathRegexp(path) {

	var paramNames = [];

	//将url中search部分以及search之后部分都替换为空格，即删除
	path = path.replace(/\?(.*)$/, '')
		//该步是把所有＊替换成正则表达式(.*)    .*表示任意文本/空格/空白符组成的字符串
		.replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g, "(.*)")
		//该步把所有 :xxx替换成正则表达式（.*）
		.replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g, '.*')
		//把所有的 / 路径，变成变为匹配正则表达式的\/的形式
		.replace(/\//g, "\\\/");

	//该步：通过生成正则表达式，前后的^和$,表示要严格匹配整个路径
	var regexp = new RegExp('^' + path + '$');
	regexp.paramNames = paramNames;
	return regexp;
}


//以下为测试代码
// var path_regexp = pathRegexp("/article/:id/*/:name");
// console.log(path_regexp.test("/article/2323/dsd/ccc"));输出为true