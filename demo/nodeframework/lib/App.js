/*
应用程序类，可以通过new App()来创建一个应用程序
*/
var http = require('http');
module.exports = function App() {
	//中间件的有序列表
	this._midWareList = [];

	this._server = http.createServer(handler);

	function handler(req, res) {
		if (!!this._midWareList.length) {
			return;
		}
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
			var midWare = this._midWareList[midWareIndex];
			midWare && midWare(req, res, next);
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