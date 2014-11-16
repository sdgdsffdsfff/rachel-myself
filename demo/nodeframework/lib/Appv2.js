/*
应用程序类，可以通过new App()来创建一个应用程序
v2：路由route的实现
*/
var http = require('http');
module.exports = App;

function App() {
	//中间件的有序列表
	this._midWareList = [];

	//增加get和post方法
	// this._getHandler = null;
	// this._postHandler = null;

	//针对get或post增加路由route
	this._getRouteHandlers = {};
	this._postRoutehandlers = {};

	this._server = http.createServer(handler);
	var self = this;

	function handler(req, res) {  
		//如果我们没有任何中间件，加上如下代码，则get/post路由请求是不会被请求的。所以以下代码需要删除
		// if (!self._midWareList.length) {
		// 	return;
		// }
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
			//请求方法的判断是通过req.method
			// if (req.method == 'GET') {
			// 	self._getHandler && self._getHandler(req, res);

			// } else if (req.method == 'POST') {
			// 	self._postHandler && self._postHandler(req, res);
			// }

			//增加路由
			var handler = null;
			if (req.method == "GET") {
				handler = self._getRouteHandlers[req.url];

			} else if (req.method == 'POST') {
				handler = self._postRoutehandlers[req.url];
			}
			handler && handler(req, res);
		}
	}

}

//push一个新的中间件到middleList数组中，以备执行
App.prototype.use = function(midWare) {
	this._midWareList.push(midWare);
}

//将原生的http模块的listen挂载到了App上，所以它的参数同原生
App.prototype.listen = function() {
	this._server.listen.apply(this._server, arguments);
}

//get/post/use只是相当于一个注册的过程，真正的执行是通过next
//get或者是post是在所有中间件执行完了才会执行，因为它没有next。
// App.prototype.get = function(handler) {
// 	this._getHandler = handler;
// }

// App.prototype.post = function(handler) {
// 	this._postHandler = handler;
// }

//增加路由
App.prototype.get = function(route, handler) {
	this._getRouteHandlers[route] = handler;
};

App.prototype.post = function(route, handler) {
	this._postRoutehandlers[route] = handler;
};



