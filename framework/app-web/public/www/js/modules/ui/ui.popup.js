define("ui.popup",['zepto'], function($) {
	/*
	  备注：组件内所有使用的单位都是px，所以外部传入可能需要做单位转化（如rem转px）
	*/
	var defOpts = { 
		isMask: true, //是否需要遮罩层
		maskColor: '#333',//默认遮罩层颜色
		maskOpacity: '0.4',//默认遮罩层透明度
		content: '', //需要插入的html代码
		width: 200, //默认宽度
		height: 200,
		position: {}, //指定pop的位置({top, left, right, bottom}, 不需要单位)，如果不指定，就默认居中展示;如果left和right都有，则只关注left,top类似
		isResetPos: true, //标记在content内容变化后是否需要变更位置
		maskName: 'pop-mask', //mask类名,供外部样式设置
		contentName: 'pop-content',
		containerName: 'pop-container', 
		showTime: 0 //showTime时间以后自动消失，如果为０则不消失
	}, $containerEle,$maskEle, $panelEle;

	function popUp(options) {
		(function() {
			defOpts = $.extend(defOpts, options);
			createContainer();
			var width = new getPage().width(), height = new getPage().height();
			if (defOpts.isMask) createMask(width, height);
			createPanel(width, height);
			$containerEle.appendTo($(document.body));
			setPosition(width, height);
			if (defOpts.showTime) setShowTime();
			initEvent();
		})();

		//创建最外层的container
		function createContainer() {
			var tpl = '<div style="padding; 0; margin: 0;" class="' + defOpts.containerName + '"></div>';
			$containerEle = $(tpl);
		}

		//创建遮罩层
		function createMask(width, height) {
			var style = 'z-index: 15; width:' + width + 'px; height: ' + Math.max(document.body.clientHeight, window.screen.availHeight) +
			    'px;position: absolute; left: 0; top: 0;background-color:' + defOpts.maskColor + '; opacity: ' + defOpts.maskOpacity + ';'; 
			// var tpl = '<div style="' + style + ' class="' + defOpts.maskName + '"></div>';
			var tpl = '<div style="' + style + '" class="' + defOpts.maskName + '"></div>';
			$maskEle = $(tpl);
			$maskEle.appendTo($containerEle);
		}

		//创建panel主体内容
		function createPanel(width, height) {
			var style = 'background: #fff;position: absolute; z-index: 20; width: ' + defOpts.width + 'px; height: ' + defOpts.height + 'px;';
			var tpl = '<div class="' + defOpts.contentName + '" style="' + style + '">' + defOpts.content + '</div>';
			$panelEle = $(tpl);
			$panelEle.appendTo($containerEle);
		}

		//panel主体内容的位置
		function setPosition(width, height) {
			var pos = {}, p = defOpts.position;
			p['left'] ? pos.left = p['left'] + 'px' : (p['right'] ? pos.right = p['right'] + 'px' : pos.left = (width - defOpts.width) / 2 + 'px');
			p['top'] ? pos.top = p['top'] + 'px' : (p['bottom'] ? pos.bottom = p['bottom'] + 'px' : pos.top = (height - defOpts.height) / 2 + $(window). scrollTop() + 'px');
			
			$panelEle.css(pos);
		}

		//关闭
		function closePop() {
			$containerEle.hide();
		}

		//展示
		function showPop() {
			$containerEle.show();
			if (defOpts.showTime > 0) {
				setTimeout(function() {
					closePop();
				}, defOpts.showTime);
			}
		}

		/*
		  改变展示内容
		  @param tpl 内容的html
		*/
		function changeContent(tpl) {
			$panelEle.html(tpl);
			if (defOpts.isResetPos) setPosition(new getPage().width(), new getPage().height());
		}

		//设置展示时间
		function setShowTime() {
			setTimeout(function() {
				closePop();
			}, defOpts.showTime);
		}

		//window resize
		function initEvent() {
			$(window).on('resize', function() {
				var width = new getPage().width(), height = new getPage().height();
				setPosition(width, height);
				if (defOpts.isMask) {
					$maskEle.css({width: width + 'px', height: height + 'px'});
				}
			});

			$(window).on('scroll', function (event) {
				// setPosition(new getPage().width(), new getPage().height());
			});
		}

		function getPage() {
			var w = window, d = document, de = d.documentElement;

			//获取page的高度
			function height() {
				return de.clientHeight;
				// return Math.max(d.body.clientHeight, de.clientHeight);
			}

			//获取page的宽度
			function width() {
				return de.clientWidth;
				// return Math.max(d.body.clientWidth, de.clientWidth);
			}	
			return {
				height: height,
				width: width
			}
		}

		function changePopHeight(height) {
			defOpts.height = height
		}

		return {
			closePop: closePop,
			showPop: showPop,
			changeContent: changeContent,
			setShowTime: setShowTime,
			setPosition: setPosition,
			changePopHeight: changePopHeight
		}
	}

	return popUp;
});


