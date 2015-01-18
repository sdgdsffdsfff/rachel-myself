/**
  当某个页面过长（移动），我们常会设计一个滚动到顶部到图标，点击即可立即回到顶部
*/

define('ui.gotop', ['zepto'], function ($) {
    var DEFAULTS = {
        endY: 0,
        duration: 200,
        updateRate: 15
    };
    var interpolate = function (source, target, shift) {
        return (source + (target - source) * shift);
    };
    var easing = function (pos) {
        return (-Math.cos(pos * Math.PI) / 2) + .5;
    };
    var scroll = function(settings) {
        var options = $.extend({}, DEFAULTS, settings);

        if (options.duration === 0) {
            window.scrollTo(0, options.endY);
            if (typeof options.callback === 'function') options.callback();
            return;
        }
        var startY = window.pageYOffset,
            startT = Date.now(),
            finishT = startT + options.duration;
        var animate = function() {
            var now = Date.now(),
                shift = (now > finishT) ? 1 : (now - startT) / options.duration;
            window.scrollTo(0, interpolate(startY, options.endY, easing(shift)));

            if (now < finishT) {
                setTimeout(animate, options.updateRate);
            } else {
                if (typeof options.callback === 'function') options.callback();
            }
        };
        animate();
    };
    var scrollNode = function(settings) {
        var options = $.extend({}, DEFAULTS, settings);
        if (options.duration === 0) {
            this.scrollTop = options.endY;
            if (typeof options.callback === 'function') options.callback();
            return;
        }
        var startY = this.scrollTop,
            startT = Date.now(),
            finishT = startT + options.duration,
            _this = this;
        var animate = function() {
            var now = Date.now(),
                shift = (now > finishT) ? 1 : (now - startT) / options.duration;
            _this.scrollTop = interpolate(startY, options.endY, easing(shift));
            if (now < finishT) {
                setTimeout(animate, options.updateRate);
            } else {
                if (typeof options.callback === 'function') options.callback();
            }
        };
        animate();
    };

    $.gotop = scroll;
    
    $.fn.gotop = function() {
        if (this.length) {
            var args = arguments;
            this.forEach(function(elem, index) {
                scrollNode.apply(elem, args);
            });
        }
    };

    function goTop() {
        $('body').append('<a id="go_top" style="display:none;" href="javascript:;"><i class="iconfont">&#xe60b;</i></a>');

        var $goTop = $('#go_top');
        $goTop.css({
            'position': 'fixed',
            'bottom': '3rem',
            'right': '1rem',
            'width': '4rem',
            'height': '4rem',
            'line-height': '4rem',
            'background-color': '#F1F1F1',
            'text-align': 'center',
            'border-radius': '.5rem',
            'border': '1px solid #D9D9D9'
        });

        $(window).on('scroll.gotop', function (e) {
            if($(window).scrollTop() >= 100) {
                $goTop.show();
            } else {    
                $goTop.hide();
            }  
        });
        
        $goTop.on('tap', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $.gotop({
                endY: 0,
                duration: 300,
                callback: function() {
                  
                }
            });
        });
    }

    return goTop;
});