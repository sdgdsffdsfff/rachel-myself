;(function($) {
	var _lib = {};

	/**
	* @fn 注册命名空间
	* @param [String] ns 格式：例如：lib.foo.fn
	*/
	_lib.namespace = function(ns) {
		var parts = ns.split('.'),
			parent = window, i;
		//执行后，lib.foo.fn就注册为了window的对象
		for(i = 0; i < parts.length; i++) {
			//只能parent[parts[i]]，不能用parent.parts[i],因为返回的parts[i]是个字符串，如"lib"
			if (typeof parent[parts[i]] == 'undefined') {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
	}

	/**
	* @fn 继承父类
	* @param child 子构造函数的环境变量
	* @param parent 父构造函数
	* @param args 父构造函数初始化的时候所需参数
	*/
	_lib.inherit = function(self, parent, args) {
		//让父构造函数在子构造函数的上下文环境中执行，则会让child拥有parent的所有函数和方法
		parent.apply(self, args);
		//同时让parent的prototype上内容也赋值给child
		$.extend(self.constructor.prototype, parent.prototype);
	}

})(jQuery);