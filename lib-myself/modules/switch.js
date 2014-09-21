/**
 * Created with JetBrains PhpStorm.
 * User: benlinhuo
 * Date: 14-9-21
 * Time: 下午4:30
 * To change this template use File | Settings | File Templates.
 */
;(function($) {
    lib.namespace('lib.switch');

    function Switch(options) {
        //默认参数
        var defOP = {
            switchId: '', //ID名称
            clipCN: '', //class名称，实际可展示区域
            contentCN: '', //class名称，全部切换内容
            itemCN: '', //class名称，每个可切换元素
            effect: 'slide', //切换效果，默认值slide，可选择值[slide/fade/none]
            vertical: 'false', //是否垂直滚动，仅在切换效果是slide时才会有效，默认为false，可选：true/false
            auto: 'true', //是否自动播放，默认为false，可选值：true/false
            start: 0, //起始帧，默认第一帧（0代表第一帧）
            duration: 400, //每帧动画持续时间，单位ms，默认400
            interval: 5000, //每帧动画间隔时间，单位ms，默认5000
            switchNum: 1, //每帧切换的元素数目，默认为1
            clipNum: 1 //展示区域的元素数目，默认为1
        }

        function init() {
            defOP = $.extend(defOP, options || {});
            initParams();
            startPlay();

            //初始化参数
            function initParams() {
                defOP.switchId = $('#' + defOP.switchId);
                defOP.item = $('.' + defOP.itemCN);
            }

            //开始滚动
            function startPlay() {
                var timer;
                switchTo(defOP.start);

                function setTimer() {
                    timer = setInterval(switchNext, defOP.interval);
                }

                function clearTimer() {
                    timer && clearInterval(timer);
                }

                if (defOP.auto) {
                    setTimer();
                    defOP.item.on({
                        'mouseenter': function() {
                            clearTimer();
                        },
                        'mouseleave': function() {
                            setTimer();
                        }
                    });
                }

            }

        }

        /*
        * 切换到指定的帧（每帧的item数目等于switchNum）
        * @param [int] topage 指定的page
        */
        function switchTo(topage) {

        }

        /*
        * 可以切换到上一帧
        * 可绑定函数 playBefore,playAfter
        */
        function switchPrev() {

        }

        /*
        * 可以切换到下一帧
        * 可绑定函数 playBefore,playAfter
        */
        function switchNext() {

        }

        /**
         * 按照给定条件进行切换
         * @param topage［int］表示switchTo
         * @param isprev [boolean] 表示switchPrev
         * @param isnext [boolean] 表示switchNext
         *
         */
        function play(topage, isprev, isnext) {

        }

        return {
            switchTo: switchTo,
            switchPrev: switchPrev,
            switchNext: switchNext
        }

    }

    lib.switch = Switch;

})(jQuery);
