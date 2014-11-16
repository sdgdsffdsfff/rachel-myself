/*
 这只是作为一个模块pathRegexp 被调用，并不是中间件，所以无需(req, res, next)
*/
module.exports = pathRegexp;

function pathRegexp(path) {

	var paramNames = [];

	//将url中search部分以及search之后部分都替换为空格，即删除
	path = path.replace(/\?(.*)$/, '')

		//该步是把所有＊替换成正则表达式(.*)    .*表示任意文本/空格/空白符组成的字符串
		// .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g, "(.*)")
		.replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g, "[0-9a-zA-Z\-_]*")


		//该步把所有 :xxx替换成正则表达式（.*）
		// .replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g, '.*')

		/*
		  /article/:name/:id。paramNames得到的数组是['name', 'id']。之后在Appv4.js中将其key对应的value对应获取即可
		  以上会替换成：/^\/article\/([0-9a-zA-Z\-_]*)\/([0-9a-zA-Z\-_]*)\/?$/g.test('/article/zhangsan/id002');
		  console.log(RegExp.$1);//打印出：zhangsan.
		  RegExp.$2：打印为id002
		*/
		.replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g, function() {
			//arguments的第一个（整个匹配）和最后两个参数（倒数第一个是被匹配的字符串，倒数第二个是匹配到的最小索引）
			//我们需要的是子匹配
			var len = arguments.length - 3;
			for (var i = 0; i < len; i++) {
				var avg = arguments[i + 1];
				//由于正则嵌套分组，所以要判断匹配字符串是否有“:”前缀
				if (typeof avg === 'string' && avg[0] !== ':') {
					paramNames.push(avg);
				}
			}
			return "([0-9a-zA-Z\-_]*)";

		})

		//把/article/:id/ 的替换为/article/:id，即去掉最后的/
		.replace('\/$', '')

		// 把所有的 / 路径，变成变为匹配正则表达式的\/的形式
		.replace(/\//g, "\\\/");

	//该步：通过生成正则表达式，前后的^和$,表示要严格匹配整个路径
	var regexp = new RegExp('^' + path + '$');
	regexp.paramNames = paramNames;
	return regexp;
}


//以下为测试代码
// var path_regexp = pathRegexp("/article/:id/*/:name");
// console.log(path_regexp.test("/article/2323/dsd/ccc"));输出为true


/*
针对以上代码的说明：
1. 将之前的(.*)改成[0-9a-zA-Z\-_]*形式，原因：之前有一个bug，比如：/article/:name，这种形式也会匹配/article/ok/abc[因为.*也是匹配ok/abc的]
*/

