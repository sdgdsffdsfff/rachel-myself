define("ui.slider", ['zepto', 'zepto.sp'], function($, sp) {
    "use strict";

    var Slider = function(_op) {
        var self = this;
        self.op = $.extend({}, {
            list: [],
            wrap: $('#canvas'),
            wrapHeight: -1,
            isHandleRadio: true
        }, _op);

        self.list = self.op.list;
        self.wrap = self.op.wrap;

        self.init();
    }

    var imgReady = (function () {
        var list = [], intervalId = null,
        tick = function () {
            var i = 0;
            for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]();
            };
            !list.length && stop();
        },
        stop = function () {
            clearInterval(intervalId);
            intervalId = null;
        };

        return function (url, ready, load, error) {
            var onready, width, height, newWidth, newHeight,
            img = new Image();
            img.src = url;

            // 如果图片被缓存，则直接返回缓存数据
            if (img.complete) {
                ready.call(img);
                load && load.call(img);
                return;
            };

            width = img.width;
            height = img.height;

            img.onerror = function () {
                error && error.call(img);
                onready.end = true;
                img = img.onload = img.onerror = null;
            };

            onready = function () {
                newWidth = img.width;
                newHeight = img.height;
                if (newWidth !== width || newHeight !== height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                    newWidth * newHeight > 1024
                ) {
                    ready.call(img);
                    onready.end = true;
                };
            };
            onready();

            // 完全加载完毕的事件
            img.onload = function () {
                // onload在定时器时间差范围内可能比onready快
                // 这里进行检查并保证onready优先执行
                !onready.end && onready();

                load && load.call(img);

                // IE gif动画会循环执行onload，置空onload即可
                img = img.onload = img.onerror = null;
            };

            // 加入队列中定期执行
            if (!onready.end) {
                list.push(onready);
                // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                if (intervalId === null) intervalId = setInterval(tick, 40);
            };
        };
    })();

    Slider.prototype.init = function () {
        this.render();
        this.bindEvent();
    }

    Slider.prototype.render = function () {
        this.scaleW = this.deviceWidth();
        this.scaleH = this.op.wrapHeight > 0 ? this.op.wrapHeight :  this.deviceHeight();
        this.radio = this.scaleH/this.scaleW;
        this.idx = 0;
        this.wrap.width(this.scaleW);

        var wrap = this.wrap[0];
        var data = this.list;
        var len = data.length;
        var scale = this.scaleW;

        this.outer = document.createElement('ul');
        this.nav = document.createElement('nav');
        this.outer.classList.add('slider-wrap');
        this.nav.classList.add('nav-wrap');

        for (var i = 0; i < len; i++) {
            var li = document.createElement('li');
            var $i = document.createElement('i');
            var item = data[i];
            var cScale = i == len - 1 ? -scale : scale;
            li.style.width = scale + 'px';
            li.style.webkitTransform = 'translate3d(' + cScale + 'px, 0, 0)';

            li.innerHTML = '<img width=' + scale + ' data-index="' + i + '" data-img="' + data[i] + '">';
            $i.innerHTML = '•';
            this.outer.appendChild(li);
            this.nav.appendChild($i);
        }

        this.outer.style.width = scale + 'px';
        wrap.style.height = this.op.wrapHeight == -1 ? this.scaleH + 'px' : this.op.wrapHeight + 'px';

        $(wrap).html(this.outer);
        $(wrap).append(this.nav);
    }

    Slider.prototype.bindEvent = function () {
        var self = this;
        var scale = self.scaleW;
        var outer = self.outer;
        var len = self.list.length;
        var lis = outer.getElementsByTagName('li');
        var startHandler = function (evt) {
            self.startX = evt.touches[0].pageX;
            self.offsetX = 0;
            self.startTime = new Date() * 1;
        };
        var moveHandler = function (evt) {
            evt.preventDefault();
            self.offsetX = evt.touches[0].pageX - self.startX;

            var lis = outer.getElementsByTagName('li');
            var i = self.idx - 1;
            var m = self.idx + 1;

            if (len == 2) {
                for (i; i <= m; i++) {
                    lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');
                    lis[i] && (lis[i].style.webkitTransform = 'translate3d('+ ((i-self.idx)*self.scaleW + self.offsetX) +'px, 0, 0)');
                }
                return;
            }

            for (i; i <= m; i++) {
                if (i == -1) {
                    (lis[len -1].style.webkitTransform = 'translate3d(' + ((i - self.idx) * scale + self.offsetX) + 'px,0,0)')
                } else if (i == len) {
                    (lis[0].style.webkitTransform = 'translate3d(' + ((i - self.idx) * scale + self.offsetX) + 'px,0,0)')
                } else {
                    lis[i] && (lis[i].style.webkitTransform = 'translate3d(' + ((i - self.idx) * scale + self.offsetX) + 'px,0,0)')                    
                }
            }
        };
        var endHandler = function () {
            var boundary = scale/6;
            var endTime = new Date() + 1;

            var lis = outer.getElementsByTagName('li');

            if (endTime - self.startTime > 300) {
                if (self.offsetX >= boundary) {
                    // prev
                    self.go('-1');
                } else if (self.offsetX < -boundary) {
                    // next
                    self.go('+1');
                } else {
                    // curr
                    self.go('0');
                }
            } else {
                if (self.offsetX > 50) {
                    self.go('-1');
                } else if (self.offsetX < -50) {
                    self.go('+1');
                } else {
                    self.go('0');
                }
            }
        }

        if (this.op.list.length > 1) {
            $(outer).on('touchstart', function(e) {
                startHandler(e);
            }).on('touchmove', function(e) {
                moveHandler(e);
                e.preventDefault();
            }).on('touchend', function(e) {
                endHandler(e);
            });
        }

        $(window).on('resize', function(event) {
            var w = self.scaleW = self.deviceWidth();
            var h = self.scaleH = self.op.wrapHeight > 0 ? self.op.wrapHeight :  self.deviceHeight();
            
            sp.publish('slider_resized');

            self.wrap.width(w);
            self.wrap.height(h);
            self.wrap.find('ul').css({
                'width': w,
                'height': h
            });
            self.wrap.find('li').css({
                'width': w,
                'height': h
            });
            
            self.go(self.idx);
        });
    }

    Slider.prototype.radioHandle = function (h, w, img) {
        var self = this;

        if (h/w > self.scaleH/self.scaleW) {
            img.width('auto');
            img.height(Number(self.scaleH));
        } else {
            img.height('auto');
            img.width(Number(self.scaleW));
        }
    }

    Slider.prototype.go = function (n) {
        var idx = this.idx;
        var cidx;
        var lis = this.outer.getElementsByTagName('li');
        var len = lis.length;
        var scale = this.scaleW;

        if (typeof n == 'number') {
            cidx = n;
        } else if (typeof n == 'string') {
            cidx = idx + Number(n);
        }
        // 右边超出
        if (cidx > len - 1) {
            // cidx = len - 1;
            cidx = len == 2 ? 1 : 0;
        } else if (cidx < 0) {
            // cidx = 0;
            cidx = len == 2 ? 0 : len - 1;
        }

        this.idx = cidx;

        sp.publish('slider_move_start', [cidx]);

        if (len == 1 && n == 0) {
            lis[cidx].style.webkitTransition = '-webkit-transform 0.2s ease-out';
            lis[cidx].style.webkitTransform = 'translate3d(0, 0, 0)';
            this.sliderMoveEnd(cidx);
            return;
        }

        if (len == 2) {
            lis[cidx].style.webkitTransition = '-webkit-transform 0.2s ease-out';
            lis[cidx-1] && (lis[cidx-1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
            lis[cidx+1] && (lis[cidx+1].style.webkitTransition = '-webkit-transform 0.2s ease-out');

            lis[cidx].style.webkitTransform = 'translate3d(0, 0, 0)';
            lis[cidx-1] && (lis[cidx-1].style.webkitTransform = 'translate3d(-'+ this.scaleW +'px, 0, 0)');
            lis[cidx+1] && (lis[cidx+1].style.webkitTransform = 'translate3d('+ this.scaleW +'px, 0, 0)');
            
            this.sliderMoveEnd(cidx);
            return;
        }

        lis[cidx].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        
        if (cidx == 0) {

            lis[len - 1] && (lis[len - 1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
            lis[cidx + 1] && (lis[cidx + 1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
        } else if (cidx == len - 1) {
            if (n == '+1') {
                lis[cidx - 1] && (lis[cidx - 1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
            } else if (n == '-1') {
                lis[0] && (lis[0].style.webkitTransition = '-webkit-transform 0.2s ease-out');
            }
        } else {
            if (n == '+1') {
                lis[cidx - 1] && (lis[cidx - 1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
            } else if (n == '-1')  {
                lis[cidx + 1] && (lis[cidx + 1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
            }
        }

        lis[cidx].style.webkitTransform = 'translate3d(0, 0, 0)';

        if (cidx == 0) {
            if (n == '+1') {
                lis[len - 1] && (lis[len - 1].style.webkitTransform = 'translate3d(-' + scale + 'px, 0, 0)');
            } else if (n == '-1') {
                // lis[len - 1] && (lis[len - 1].style.webkitTransform = 'translate3d(-' + scale + 'px, 0, 0)');
                lis[cidx + 1] && (lis[cidx + 1].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0)');
            }
            // lis[cidx + 1] && (lis[cidx + 1].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0)');
        } else if (cidx == len - 1) {
            if (n == '+1') {
                lis[cidx - 1] && (lis[cidx - 1].style.webkitTransform = 'translate3d(-' + scale + 'px, 0, 0)');
            } else if (n == '-1') {
                lis[cidx - 1] && (lis[cidx - 1].style.webkitTransform = 'translate3d(-' + scale + 'px, 0, 0)');
                lis[0] && (lis[0].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0)');
            }
            // lis[0] && (lis[0].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0)');
        } else {
            lis[cidx - 1] && (lis[cidx - 1].style.webkitTransform = 'translate3d(-' + scale + 'px, 0, 0)');
            lis[cidx + 1] && (lis[cidx + 1].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0)');            
        }

        setTimeout(function () {
            lis[cidx].style.webkitTransition = '-webkit-transform 0s ease-out';

            if (cidx == 0) {
                lis[len - 1] && (lis[len - 1].style.webkitTransition = '-webkit-transform 0s ease-out');
                lis[cidx + 1] && (lis[cidx + 1].style.webkitTransition = '-webkit-transform 0s ease-out');
            } else if (cidx == len - 1) {
                lis[0] && (lis[0].style.webkitTransition = '-webkit-transform 0s ease-out');
                lis[cidx - 1] && (lis[cidx - 1].style.webkitTransition = '-webkit-transform 0s ease-out');
            } else {
                lis[cidx + 1] && (lis[cidx + 1].style.webkitTransition = '-webkit-transform 0s ease-out');
                lis[cidx - 1] && (lis[cidx - 1].style.webkitTransition = '-webkit-transform 0s ease-out');
            }

            if (cidx == 0) {
                lis[len - 1] && (lis[len - 1].style.webkitTransform = 'translate3d(-' + scale + 'px, 0, 0)');
                lis[cidx + 1] && (lis[cidx + 1].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0)');
            } else if (cidx == len - 1) {
                lis[cidx - 1] && (lis[cidx - 1].style.webkitTransform = 'translate3d(-' + scale + 'px, 0, 0)');
                lis[0] && (lis[0].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0)');
            } else {
                lis[cidx - 1] && (lis[cidx - 1].style.webkitTransform = 'translate3d(-' + scale + 'px, 0, 0)');
                lis[cidx + 1] && (lis[cidx + 1].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0)');            
            }
        }, 200);

        this.sliderMoveEnd(cidx);
    }

    Slider.prototype.sliderMoveEnd = function (i) {
        var self = this;
        var next = 0;
        var prev = 0;
        var cImg = null;
        var nImg = null;
        var pImg = null;
        var scale = self.scaleW;
        var outer = self.outer;
        var len = self.list.length;
        var lis = outer.getElementsByTagName('li');

        next = i + 1 == len ? 0 : i + 1;
        prev = i == 0 ? len - 1 : i - 1;

        cImg = lis[i] ? $(lis[i]).children() : null;
        nImg = lis[next] ? $(lis[next]).children() : null;
        pImg = lis[prev] ? $(lis[prev]).children() : null;
        
        !cImg.attr('src') && cImg.attr('src', cImg.attr('data-img'));
        !nImg.attr('src') && nImg.attr('src', nImg.attr('data-img'));
        !pImg.attr('src') && pImg.attr('src', pImg.attr('data-img'));

        if (self.op.isHandleRadio) {
            imgReady(cImg.attr('data-img'), function () {
                self.radioHandle(this.height, this.width, cImg);
            });

            imgReady(nImg.attr('data-img'), function () {
                self.radioHandle(this.height, this.width, nImg);
            });

            imgReady(pImg.attr('data-img'), function () {
                self.radioHandle(this.height, this.width, pImg);
            });
        }

        $(self.nav).find('i').removeClass('active');
        $(self.nav).find('i').eq(Number(i)).addClass('active'); 
    }

    Slider.prototype.deviceWidth = function() {
        var devWidth = document.body.clientWidth;
        /*;
        if (navigator.userAgent.indexOf('Android') >= 0 && window.devicePixelRatio) {
            deviceWidth = deviceWidth / window.devicePixelRatio;
        }*/

        return devWidth;
    }

    Slider.prototype.deviceHeight = function() {
        /*var devHeight = window.screen.height;

        if (navigator.userAgent.indexOf('Android') >= 0 && window.devicePixelRatio) {
            devHeight = devHeight / window.devicePixelRatio;
        }*/
        var devHeight = document.body.clientHeight;

        return devHeight;
    }

    return Slider;
});