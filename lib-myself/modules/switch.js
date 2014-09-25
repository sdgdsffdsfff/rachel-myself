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
            // clipCN: 'clip', //class名称，实际可展示区域 （例如div）
            contentCN: 'content', //class名称，全部切换内容（例如ul）
            itemCN: 'item', //class名称，每个可切换元素（例如li）
            effect: 'slide', //切换效果，默认值slide，可选择值[slide/fade/none]
            vertical: false, //是否垂直滚动，仅在切换效果是slide时才会有效，默认为false，可选：true/false
            auto: 'true', //是否自动播放，默认为false，可选值：true/false   
            start: 0, //起始帧，默认第一帧（0代表第一帧）
            duration: 400, //每帧动画持续时间，单位ms，默认400
            interval: 1000, //每帧动画间隔时间，单位ms，默认5000
            switchNum: 1, //每帧切换的元素数目，默认为1
            clipNum: 1 //展示区域的元素数目，默认为1
        }, op, self = this;

        //继承base.js中自定义事件
        lib.inherit(self, lib.customEvent);
        self.op = $.extend(defOP, options || {});

        self.init();
    }

    Switch.prototype.init = function() {
        var self = this, op = self.op;

        initParams();
        startPlay();

        //初始化参数
        function initParams() {
            // all element
            op.switchId = $('#' + op.switchId);
            // op.clip = op.switchId.find('.' + op.clipCN);
            op.content = op.switchId.find('.' + op.contentCN).css('position', 'relative');
            op.item = op.content.find('.' + op.itemCN);
            
            //init parameter
            op.currPage = 0;//初始化当前page(每个图片都算做一个page)
            op.itemCount = op.item.length;//变化的图片总个数
            op.leftOrTop = op.vertical ? 'top' : 'left';
            op.widthOrHeight = op.vertical ? op.item.outerHeight() : op.item.outerWidth();
            
            op.itemMod = op.itemCount / op.switchNum;
            op.contentSize = op.widthOrHeight * op.itemCount;

            //
            if (op.effect == 'slide') {
                if (!op.vertical) {
                    op.content.css('width', op.contentSize);
                    op.item.css('float', 'left');
                }

            } else if (op.effect == 'fade') {
                op.item.css('position', 'absolute');
            } else {
                op.effect = 'none';//没有任何效果的切换
                op.item.css('position', 'absolute');
                op.duration = 0;

            }
        }

        //开始滚动
        function startPlay() {
            var timer;
            op.start = parseInt(op.start);
            op.start = op.start < 0 ? 0 : (op.start > (op.itemCount - 1) ? op.itemCount - 1 : op.start); 
            clearTimer();
            self.switchTo(op.start);

            function setTimer() {
                timer = setInterval(function(){self.switchNext();}, op.interval);
            }

            function clearTimer() {
                timer && clearInterval(timer);
            }

            if (op.auto) {
                setTimer();
                op.switchId.on({
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

     /**
     * 按照给定条件进行切换
     * @param topage［int］不为null表示switchTo
     * @param isprev [boolean] true表示switchPrev
     * @param isnext [boolean] true表示switchNext
     * 
     * 需要考虑的点：
     * 1. vertical:是否垂直滚动（只在slide时有用）
     * 2. effect：slide/fade/none
     * 3. itemCount / switchNum 如果有余数该怎么办
     * 
     */
    Switch.prototype.play = function(topage, isprev, isnext) {
        var op = this.op;
        this.trigger('switchBefore');//动画前
        var targetPos = {}, //slide
            targetItemPos = {}, //最后一张向第一张切换
            targetItem; //fade

        //针对itemCount%switchNum!=0
        if (isnext && op.itemMod && op.currPage == (op.itemCount - op.itemMod)) {
            switchNum = op.itemCount - op.itemMod; //5/2，最后切换的只是一张图
        }
        if (isprev && op.itemMod && op.currPage == op.itemMod) {
            switchNum = op.itemMod;
        }
        if (topage !== null) {
            op.currPage = topage;
            if (op.effect == 'slide') {//需要的是整个ul的left或者top
                targetPos[op.leftOrTop] =  -op.widthOrHeight * op.currPage;

            } else if (op.effect == 'fade' || op.effect == 'none') {//需要的是当前展示的li
                targetItem = op.item.eq(op.currPage);
            }

        } else if (isprev || isnext) {
            for (var i = 0; i < op.switchNum; i++) {
                circleMove();
            }
        }
        animateOper();

        this.trigger('switchAfter');//动画后
        //动画操作
        function animateOper() {
            if (op.effect == 'slide') {
                op.content.stop().animate(targetPos, op.duration, function() {
                    //第一张向最后一张切换（恢复）
                    if (isprev && op.currPage > (op.itemCount - op.clipNum - 1)) {
                        op.item.css('position', '');
                        op.content.css(op.leftOrTop, -op.currPage * op.widthOrHeight);

                    }
                    if (isnext && op.currPage <= (op.clipNum - 1)) {
                        op.item.css('position', '');//这样即使item有left，也不会起作用
                        //恢复移动到最后一张图片右侧的真实位置
                        op.content.css(op.leftOrTop, -op.currPage * op.widthOrHeight);

                    }
                });

            } else if (op.effect == 'fade') { 
                //所有的item都重叠放在一起，然后通过opacity来设置
                op.item.not(targetItem).animate({opacity: 0}, op.duration);
                targetItem.animate({opacity: 1}, op.duration);

            } else if (op.effect == 'none') {
                op.item.not(targetItem).css('opacity', 0);
                targetItem.css('opacity', 1);
            }
        }

        //循环向前或向后切换
        function circleMove() {
            if (isprev) {
                //第一张
                op.currPage = (op.currPage > 0) ? op.currPage - 1 : op.itemCount - 1;

            } else if (isnext) {
                //最后一张
                op.currPage = (op.currPage < op.itemCount - 1) ? op.currPage + 1 : 0;
            }

            if (op.effect == 'slide') {
                targetItem = op.item.eq(op.currPage);
                targetPos[op.leftOrTop] = -op.widthOrHeight * op.currPage;
                //第一张向最后一张切换（或者最后一张向第一张切换，需要考虑clipNum，因为此时是循环switchNum的）
                if (isprev && op.currPage > (op.itemCount - op.clipNum - 1)) {
                    targetItemPos['position'] = 'absolute';
                    targetItemPos[op.leftOrTop] = -op.widthOrHeight * (op.itemCount - op.currPage);
                    targetItem.css(targetItemPos);
                    targetPos[op.leftOrTop] = op.widthOrHeight * (op.itemCount - op.currPage);
                    

                }
                if (isnext && op.currPage <= (op.clipNum - 1)) {
                    targetItemPos['position'] = 'relative';
                    targetItemPos[op.leftOrTop] = op.contentSize + op.currPage * op.widthOrHeight;
                    targetItem.css(targetItemPos);
                    targetPos[op.leftOrTop] = -op.contentSize;
                    

                }

            } else if (op.effect == 'fade' || op.effect == 'none') {
                targetItem = op.item.eq(op.currPage);
            }
        }
    }


    /*
    * 切换到指定的帧（每帧的item数目等于switchNum）
    * @param [int] toframe 指定的frame
    */
    Switch.prototype.switchTo = function (toframe) {
        var op = this.op;
        var topage = toframe * op.switchNum;//从0开始，与数组下标匹配
        (topage < 0 || isNaN(topage)) ? (topage = 0) : '';
        topage > (op.itemCount - 1) ? (topage = op.itemCount - 1) : '';
        if (topage == op.currPage) {
            return;//当switchTo的页面是当前页面，则不做任何操作
        }
        this.play(topage, false, false);

    }

    /**
    * 可以切换到上一帧
    * 可绑定函数 switchBefore,switchAfter
    */
    Switch.prototype.switchPrev = function() {
        this.play(null, true, false);
    }

    /**
    * 可以切换到下一帧
    * 可绑定函数 switchBefore,switchAfter
    */
    Switch.prototype.switchNext = function() {
        this.play(null, false, true);
    }


    lib.switch = Switch;

})(jQuery);
