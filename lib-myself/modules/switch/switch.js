/**
 * Created with JetBrains PhpStorm.
 * User: benlinhuo
 * Date: 14-9-21
 * Time: 下午4:30
 * To change this template use File | Settings | File Templates.
 */


;(function($) {
    lib.namespace('lib.switch');

    /*
    * Switch实例对象可以绑定switchBefore, switchAfter，表示在动画前后的用户自定义动作
    */
    function Switch(options) {
         //默认参数
        var defOP = {
            switchId: '', //ID名称
            contentCN: 'content', //class名称，全部切换内容（例如ul）
            itemCN: 'item', //class名称，每个可切换元素（例如li）
            effect: 'slide', //切换效果，默认值slide，可选择值[slide/fade/none]
            vertical: false, //是否垂直滚动，仅在切换效果是slide时才会有效，默认为false，可选：true/false
            auto: 'true', //是否自动播放，默认为false，可选值：true/false   
            start: 0, //起始帧，默认第一帧（0代表第一帧）
            duration: 400, //每帧动画持续时间，单位ms，默认400
            interval: 2000, //每帧动画间隔时间，单位ms，默认5000
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
            op.content = op.switchId.find('.' + op.contentCN).css('position', 'relative');
            op.item = op.content.find('.' + op.itemCN);
            
            //init parameter
            op.currPage = 0;
            op.itemCount = op.item.length;
            op.leftOrTop = op.vertical ? 'top' : 'left';
            op.widthOrHeight = op.vertical ? op.item.outerHeight() : op.item.outerWidth();
            
            op.contentSize = op.widthOrHeight * op.itemCount;
            op.isStart = false;

            if (op.effect == 'slide') {
                if (!op.vertical) {
                    op.content.css('width', op.contentSize);
                    op.item.css('float', 'left');
                }

            } else if (op.effect == 'fade') {
                op.item.css({'position': 'absolute', 'opacity': 0});
                op.item.eq(0).css('opacity', 1);
            } else {
                op.effect = 'none';//没有任何效果的切换
                op.item.css({'position': 'absolute', 'opacity': 0});
                op.item.eq(0).css('opacity', 1);
                op.duration = 0;

            }
        }

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
     * @param isprev [boolean] true表示switchPrev
     * @param isnext [boolean] true表示switchNext
     * @param switchNum [number] 表示切换的个数
     * 
     * 需要考虑的点：
     * 1. vertical:是否垂直滚动（只在slide时有用）
     * 2. effect：slide/fade/none
     * 3. itemCount / switchNum 如果有余数该怎么办
     * 4. switchNum > 1, clipNum > 1，以及二者之间的关系（switchNum大于（或者小于，等于）clipNum）
     */
    Switch.prototype.play = function(isprev, isnext, switchNum) {
        var op = this.op;
        if (!!op.isStart) {return;}  //防止多次点击

        op.isStart = true;
        this.trigger('switchBefore');//动画前
       
        var targetPos = {}, //slide
            targetItem; //fade

        circleMove();
        animateOper();

        this.trigger('switchAfter');//动画后
        
        //循环向前或向后切换
        function circleMove() {
            setCurrPage();
            if (op.effect == 'slide') {
                var cloneNode, i;
                if (isprev) {
                    for (i = 0; i < switchNum; i++) {
                        cloneNode = op.item.eq(op.itemCount - 1 -i).clone(true);
                        op.content.prepend(cloneNode);
                    }
                    op.content.css(op.leftOrTop, -switchNum * op.widthOrHeight);
                    targetPos[op.leftOrTop] = 0;

                }
                if (isnext) {
                    for (i = 0; i < switchNum; i++) {
                        cloneNode = op.item.eq(i).clone(true);
                        op.content.append(cloneNode);
                    }
                    targetPos[op.leftOrTop] = -switchNum * op.widthOrHeight;
                }

            } else if (op.effect == 'fade' || op.effect == 'none') {
                targetItem = op.item.eq(op.currPage);
            }

            function setCurrPage() {
                for (i = 0; i < switchNum; i++) {
                    if (isprev) {
                        op.currPage = (op.currPage > 0) ? op.currPage - 1 : op.itemCount - 1;
                    } 
                    if (isnext) {
                        op.currPage = (op.currPage < op.itemCount - 1) ? op.currPage + 1 : 0;
                    }
                }
            }

        }

        //动画操作
        function animateOper() {
            if (op.effect == 'slide') {
                op.content.stop().animate(targetPos, op.duration, function() {
                    if (isprev) {
                        for (i = 0; i < switchNum; i++) {
                            op.item.eq(op.itemCount - 1 -i).remove();
                        }
                    }
                    if (isnext) {
                        for (i = 0; i < switchNum; i++) {
                            cloneNode = op.item.eq(i).remove();
                        }
                    }
                    op.content.css(op.leftOrTop, '0');
                    op.item = op.content.find('.' + op.itemCN);
                    isprev && op.item.css('position', '');
                    op.isStart = false;
                });

            } else if (op.effect == 'fade') { 
                //所有的item都重叠放在一起，然后通过opacity来设置
                op.item.not(targetItem).animate({opacity: 0}, op.duration);
                targetItem.animate({opacity: 1}, op.duration);
                op.isStart = false;

            } else if (op.effect == 'none') {
                op.item.not(targetItem).css('opacity', 0);
                targetItem.css('opacity', 1);
                op.isStart = false;
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
        var dir = (topage - op.currPage > 0) ? true : false;//向右为true
        this.play(!dir, dir, Math.abs(topage - op.currPage));
    }

    /**
    * 可以切换到上一帧
    */
    Switch.prototype.switchPrev = function() {
        this.play(true, false, this.op.switchNum);
    }

    /**
    * 可以切换到下一帧
    */
    Switch.prototype.switchNext = function() {
        this.play(false, true, this.op.switchNum);
    }


    lib.switch = Switch;

})(jQuery);
