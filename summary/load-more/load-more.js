/**
  移动开发中，列表页滚动到最后，会自动异步请求下一页数据。
*/

define("ui.waterfall", ['zepto', 'zepto.sp'], function($, sp) {
    "use strict";
    /*$(window).waterfall({
        resources: service.getMoreProperty,
        onLoad: function (data) {
            $('.waiting').hide();
        },
        onInit: function () {
            $('.more-property').hide();
            $('.waiting').show();
        },
        data: {
            'city_id': 1,
            'status': 2,
            'limit': 10,
            'page': 1
        },
        wrap: '.class' // #id 
    });*/
    $.fn.waterfall = function (_op) {
        var noop = function() {};
        var op = $.extend({}, {
            data: {
                page: 1
            },
            resources: '', // 获取数据资源，可以是string，可以是ajax
            scrollAfterHeight: 100, // 距离底部多少开始触发事件
            onLoad: noop, // 获得数据后的回调
            onInit: function () {
                $('#loading').show().css('display', 'block');
            }, // 初始化之前执行的操作
            onEnd: function () {
                $('#loading').text('不好意思，已经没有了...');
            },
            onError: noop,
            continueWhile: function () {
                return true;
            },
            wrap: 'body' 
        }, _op);
        
        return this.each(function () {
            $(op.wrap).after('<a id="loading" style="width: 100%;height: 6rem;line-height: 6rem;text-align: center;margin-top: -1px;border-top: 1px solid #CCCCCC;color: #888;font-size: 1.6rem;display: none;">加载中...</a>');
            this.scrolling = false;
            this.scrollPrev = this.onscroll ? this.onscroll : null;
            $(this).on('scroll.waterfall', function (e) {
                var height = 0;
                var $this = $(this);
                if (this.scrollPrev) {
                    this.scrollPrev();
                }
                if (this.scrolling || this.isStop) {
                    return;
                }
                if (this == window) {
                    height = 0 + $(document).height() - $this.scrollTop() - $(window).height();
                } else {
                    height = 0 + $this.attr('scrollHeight') - $this.attr('scrollTop') - $this.attr('clientHeight');
                }
                if(height <= op.scrollAfterHeight) {
                    op.onInit.call(this, this);
                    this.scrolling = true;
                    op.data.page++;
                    if ($.isFunction(op.resources)) {
                        op.resources({
                            data: op.data,
                            sucFn: function (data) {
                                $this[0].scrolling = false;
                                op.onLoad.call($this[0], data, $this[0]);
                                if(!op.continueWhile.call($this[0], data) || data.length == 0) {
                                    $this.unbind('scroll');
                                    op.onEnd.call($this[0]);
                                }
                            },
                            errFn: function (data) {
                                op.onError.call($this[0]);
                            }
                        });
                    } else if ($.isArray(op.resources)) {
                        // 直接返回
                    } else {
                        // ajax
                    }
                }
            });
        });
    }

    return $.fn.waterfall;
});