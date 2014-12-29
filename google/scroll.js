(function() {
	function ScrollBar(options) {
		var opts = {
			dir: 'Y',  //方向
			content: null, //内容的jockjs对象
			clickStep: 40,  // 每点击滚动条一次移动的距离
			keyStep: 10, //键盘的上下左右箭头每点击一次移动的距离
			wheelStep: 1 //鼠标滚动一次移动的距离

		}, scrollParent, scroll, block, middle, //scroll:滚动条最外层的div，block：内部滚动的整体部分，middle：内部滚动的中间部分
		scrollLength, length, pointStart, 
		isbarMove;//用于判断滚动条是否正在移动

		(function() {
			var ele;
			opts = J.mix(opts, options || {});
			if (opts.dir != 'X' && opts.dir != 'Y') return;
			opts.dir = opts.dir == 'Y' ? true : false; //方便书写
			ele = createScrollEle();
			scrollParent = opts.content.up(0);	
			scrollParent.append(ele);		
			if (!initEles(ele)) return;
			buildPosition();
			calcLength();
			bindEvent();
		})();


		function createScrollEle(){
			var scrollDiv = document.createElement('div'), innerHtml;
			scrollDiv.className = (opts.dir ? 'Vscroll' : 'Hscroll');
			// scrollDiv.style.display = 'none';//最开始滚动条不显示
			length = (opts.dir ? opts.content.height() : opts.content.width()) - 8;//8是除去滚动条上下4px
			innerHtml = '<div class="' + (opts.dir ? 'Vp1' : 'Hp1') + '"></div>' +
				'<div class="' + (opts.dir ? 'VblockContainer' : 'HblockContainer')  + '" style＝"' + (opts.dir ? 'height: ' : 'width: ') + length + 
				'px;"><div class="' + (opts.dir ? 'Vblock' : 'Hblock') +
				'"><div class="' +  (opts.dir ? 'VtAndl' : 'HtAndl') +
				'"></div><div class="' + (opts.dir ? 'Vmiddle' : 'Hmiddle') +
				'"></div><div class="' + (opts.dir ? 'VbAndr' : 'HbAndr') + '"></div></div></div>' +
				'<div class="' + (opts.dir ? 'Vp2' : 'Hp2') + '"></div>';
			scrollDiv.innerHTML = innerHtml;
			return scrollDiv;
		}

		function buildPosition() {
			var offset = opts.content.offset(),
				left = offset.x + (opts.dir ? opts.content.width() : 0),
				top = offset.y + (opts.dir ? 0 : opts.content.height());
			scroll.setStyle({
				left: left + 'px',
				top: top + 'px',
				position: 'absolute'
			});
			//????????????????
			scroll.s('.VblockContainer').eq(0).setStyle({
				height: length + 'px'
			});

		}


		function initEles(scrollEle) {
			scroll = J.g(scrollEle);
			middle = opts.dir ? scroll.s('.Vmiddle').eq(0) : scroll.s('.Hmiddle').eq(0);
			block = middle.up(0);
			if (scroll && middle && block) return true;
			return false;
		}


		/*
		* 滚动条事件的绑定
		*/
		function bindEvent() {
			scroll.on('mouseenter', mouseEnter);
			scroll.on('mouseleave', mouseLeave);

			scroll.on('click', scrollClick);

			//鼠标拖动
			block.on('mousedown', mouseDownHandler);

			//鼠标滚轮
			var eventName = (J.ua.ua.indexOf('Firefox') > -1) ? 'DOMMouseScroll' : 'mousewheel';
			scrollParent.on(eventName, wheelHandler);

			//键盘上下左右箭头
			scrollParent.on('keydown', keyHandler);
		}

		function wheelHandler(e) {
			var delta = (J.ua.ua.indexOf('Firefox') > -1) ? e.detail : -e.wheelDelta;//>0向下
			(delta > 0) ? scrollBarRun(opts.wheelStep) : scrollBarRun(-opts.wheelStep);
			cancelBubble(e);
			stopDefault(e);
		}

		function keyHandler(e) { 
			console.log('sdfsdf');
			switch(e.keyCode) {
				case 37: //left
					scrollBarRun(-opts.keyStep);
					break;

				case 38: //up
					scrollBarRun(-opts.keyStep);
					break;

				case 39: //right
					scrollBarRun(opts.keyStep);
					break;

				case 40: //down
					scrollBarRun(opts.keyStep);
					break;
			}
			cancelBubble(e);
			stopDefault(e);
		}

		function mouseDownHandler(e) {
			isbarMove = true;
			pointStart = {};
			pointStart.x = e.x;
			pointStart.y = e.y;
			J.on(document, 'mousemove', documentMouseMove);
			J.on(document, 'mouseup', documentMouseUp);
		}

		function documentMouseMove(e) {
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			var num = opts.dir ? (e.y - pointStart.y) : (e.x - pointStart.x);
			pointStart.x = e.x;
			pointStart.y = e.y;
			scrollBarRun(num);
		}

		function documentMouseUp(e) {
			if (!isMouseEnter(e)) { 
                isbarMove = false;
            }
            mouseLeave();
            isbarMove = false;
			J.un(document, 'mousemove', documentMouseMove);
			J.un(document, 'mouseup', documentMouseUp);
		}

		/*
		* 判断鼠标mouseup时是否在滚动条的范围内
		*/
		function isMouseEnter(e) {
			var x, y;
			var left = getElementPos(scroll.get(), 0),
				right = left + scroll.width(),
				top = getElementPos(scroll.get(), 1),
				bottom = top + scroll.height();
			scrollTopDis = (J.ua.ua.indexOf('Chrome') > -1) ? document.body.scrollTop : document.documentElement.scrollTop;
			scrollLeftDis = (J.ua.ua.indexOf('Chrome') > -1) ? document.body.scrollLeft : document.documentElement.scrollLeft;
			x = e.x + scrollLeftDis;
			y = e.y + scrollTopDis;
			if (x > left && x < right && y > top && y < bottom) return true;
			return false;
		}

		/*
		* 获取元素的位置
		* @param ele:被计算dom元素
		* @param flag: 0表示left，1表示top
		*/
		function getElementPos(ele, flag) {
			var value = 0;
			while(ele != null) {
				value += (flag ? ele.offsetTop : ele.offsetLeft);
				ele = ele.offsetParent;
			}
			return value;
		}


		function scrollClick(e) { 
			var offset = block.offset(), dis;
			if (J.ua.ua.indexOf('Chrome') > -1) {
				dis = opts.dir ? document.body.scrollTop : document.body.scrollLeft;
			} else {
				dis = opts.dir ? document.documentElement.scrollTop : document.documentElement.scrollLeft;
			}
			var pointXY = opts.dir ? (e.y + dis) : (e.x + dis);
			var offsetXY = opts.dir ? offset.y : offset.x;

			if (pointXY < offsetXY) { // 滚动条上方
				scrollBarRun(-opts.clickStep);
				return;
			} 
			var dom_wh = offsetXY + (opts.dir ? block.height() : block.width());
			if (pointXY > dom_wh) { //滚动条下方
				scrollBarRun(opts.clickStep);
			}
			//点击滚动条位置，不移动
		}

		function mouseEnter() {
			var className = opts.dir ? 'VscrollHover' : 'HscrollHover';
			scroll.addClass(className);
		}

		function mouseLeave() {
			if (isbarMove) return; 
			var className = opts.dir ? 'VscrollHover' : 'HscrollHover';
			scroll.removeClass(className);
		
		}

		/*
		* 滚动条滚动
		* @param num:滚动的距离
		*/
		function scrollBarRun(num, e) {
			var needBubble = false, property = opts.dir ? 'top' : 'left';
			var begin = (block.get().style[property].split('px')[0] || 0) * 1,
				end = begin + num;

			if (end < 0) { //不超过最顶端
				end = 0;
				// needBubble = true;
			}
			var blockH = block.height();
			if (end + blockH > length) { //不超过最底端
				end = length - blockH;
				// needBubble = true;
			}
			block.get().style[property] = end + 'px'; 
			//内容跟着变动
			var scrollProp = opts.dir ? 'scrollTop' : 'scrollLeft';
			opts.content.get()[scrollProp] = end / length * scrollLength;
			// !needBubble && cancelBubble(e);
		}

		/*
		* 滚动到指定位置
		* @param endDis:滚动到指定的位置
		*/
		function scrollTo(endDis) {
			var prop = opts.dir ? 'top' : 'left',
				curDis = (block.get().style[property].split('px')[0] || 0) * 1;
			scrollBarRun(endDis - curDis);
		}


		function cancelBubble(e) {
			e && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true);
		}

		function stopDefault(e) {
			(J.ua.ua.indexOf('IE') > -1) ? (e.returnValue = false) : (e.preventDefault());
		}

		/*
		* 计算中间滚动条的宽度或者高度
		*/
		function calcLength() {
			var prop = (opts.dir ? 'height' : 'width'); 
			opts.content.get().style.overflow = 'visible';
			opts.content.get().style[prop] = 'auto';

			scrollLength = opts.dir ? opts.content.height() : opts.content.width(); 
			opts.content.get().style.overflow = '';
			opts.content.get().style[prop] = '';

			// scrollLength = opts.dir ? opts.content.get().scrollHeight : opts.content.get().scrollWidth;
			
			scrollLength < length ?  hideScroll() : showScroll();
			middle.get().style[prop] = (length / scrollLength * length - 8) + 'px';
		}

		function hideScroll() {
			scroll.setStyle('display', 'none');
		}

		function showScroll() {
			scroll.setStyle('display', 'display');
		}

		return {
			calcLength: calcLength,
			scrollTo: scrollTo
		};


	}
	J.ui.scrollBar = ScrollBar;
})(J.ui);