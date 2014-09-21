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
	* @param [this] child 子构造函数的环境变量
	* @param [fn] parent 父构造函数
	* @param [Array] args 父构造函数初始化的时候所需参数
	*/
	_lib.inherit = function(self, parent, args) {
		//让父构造函数在子构造函数的上下文环境中执行，则会让child拥有parent的所有函数和方法
        //继承属性
		parent.apply(self, args);
		//同时让parent的prototype上内容也赋值给child
        //继承方法
		$.extend(self.constructor.prototype, parent.prototype);
	}

	/*
	* 自定义事件（订阅/发布模式）
	* 原理：实际上就是一个事件队列，on的时候先放入队列，trigger的时候从队列中拿出来执行(每个事件的)
	*/
    _lib.customEvent = function() {}
	;(function(E) {

		var list = {}, uid = -1;

		/*
		* 自定义事件的绑定
		* @param [String] eventnames 绑定的事件名字，可以同时是多个，以空格隔开
		* @param [fn] callback 回调函数
		* @return [int] key 用于后面指定解绑某个事件的某个callback
		* 说明：每一个eventname对应的是callback数组
		*/
		E.prototype.on = function(eventnames, callback) {
			var parts = eventnames.split(' '), i, key, keys = [];
			for (i = 0; i < parts.length; i++) {
				!list[parts[i]] && (list[parts[i]] = []);
				key = ++uid;
				list[parts[i]].push({
					fn: callback,
					key: key
				});
				keys.push(key);
			}
			return keys;
		}

		/*
		* 自定义事件的触发
		* @param [String] eventname 要触发的事件名
		* @param [Array] args 事件callback执行的参数
		*/
		E.prototype.trigger = function(eventname, args) {
			if (!list[eventname]) return;
			var i, en;
            args = $.isArray(args) ? args : [args];
			for (i = 0; i < list[eventname].length; i++) {
				en = list[eventname][i].fn;
				en.apply(this, args);
			}
		}

		/*
		* 解绑指定的eventname事件，且可以通过key指定到特定的eventname对应的某个callback
		* @param [String] eventname 事件名称
		* @param [Array] keys on绑定事件返回值的数组
		*/
		E.prototype.off = function(eventname, keys) {
			if (!list[eventname]) return;
			var i, event;
			!!keys && !$.isArray(keys) && (keys = [keys]);
			//针对eventname进行的循环
			for (i = 0; i < list[eventname].length; i++) {
				event = list[eventname][i];
                ($.inArray(event.key, keys) > -1) && (list[eventname][i] = undefined);
			}
		}

		/*
		* 一次性绑定某个函数:执行一次后，自动解绑
		* @param [String] eventnames 绑定的事件名字，可以同时是多个，以空格隔开
		* @param [fn] callback 回调函数
		*/
		E.prototype.once = function(eventname, callback) {
			var self = this;
			var keys = self.on(eventname, function() {
				callback.apply(this, arguments);
				self.off(eventname, keys);
			});
		}

	})(_lib.customEvent);

	window.lib = _lib;
console.log('llll')
})(jQuery);