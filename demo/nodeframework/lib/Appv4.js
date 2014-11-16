/*
应用程序类，可以通过new App()来创建一个应用程序
v4：添加params.js的实现
*/
var http = require('http');
var pathRegexp = require('./pathRegexpv4');
var url = require('url');

module.exports = App;

function App() {
	//中间件的有序列表
	this._midWareList = [];  

	//v3.{}改成数组，是因为：
	//当一个具体请求过来后，我们是无法知道它的key值。这时候如果用数组，可以遍历匹配。当然此时用{}，也不是一定不行（也可以循环匹配）。
	this._getRouteHandlers = [];
	this._postRouteHandlers = [];

	this._server = http.createServer(handler);
	var self = this;

	function handler(req, res) { 
		//每次请求重置req.params
		req.params = {}; 
		var midWareIndex = 0;
     
     	//第一次执行该函数时，会默认执行第一个中间件（即开个头）
 		execMidWare();

 		//执行该函数时（会在中间件中执行），会自动执行下一个middleware。
		function next() {
			midWareIndex++;
			execMidWare();
		}

		//执行中间件
		function execMidWare() {
			var midWare = self._midWareList[midWareIndex]; 
			if (midWare) {
				midWare(req, res, next);
				return;
			}

			//v3泛式路由
			var handler = null;

			function findHandler(routeHandlers) {
				var urlPathname = url.parse(req.url).pathname;
				//routeHandlers[i］的key值是一个正则表达式
				for (var i = 0; i < routeHandlers.length; i++) {
					var isPass = routeHandlers[i].route.test(urlPathname);
					if (isPass) {
						//匹配成功的情况下，获取paramNames中key对应的value
						//routeHandlers[i].route是个正则
						routeHandlers[i].route.paramNames.forEach(function(name, index) {
							req.params[name] = RegExp['$' + (index + 1)];
						});
						return routeHandlers[i].handler;
					}
				}
				return null;
			}

			if (req.method == 'GET') {
				handler = findHandler(self._getRouteHandlers);

			} else if (req.method == 'POST') {
				handler = findHandler(self._postRouteHandlers);

			}
			//做好错误处理
			if (handler) {
				handler(req, res);
			} else {
				res.statusCode = 404;
				res.end();	
			}
		}
	}
}

// //push一个新的中间件到middleList数组中，以备执行
App.prototype.use = function(midWare) {
	this._midWareList.push(midWare);
};

//将原生的http模块的listen挂载到了App上，所以它的参数同原生
App.prototype.listen = function() {
	this._server.listen.apply(this._server, arguments);
};

//泛式路由
App.prototype.get = function(route, handler) {
	//不直接把route作为key，而是该route经过处理后的正则表达式
	this._getRouteHandlers.push({route: pathRegexp(route), handler: handler});
};

App.prototype.post = function(route, handler) {
	this._postRouteHandlers.push({route: pathRegexp(route), handler: handler});
};

