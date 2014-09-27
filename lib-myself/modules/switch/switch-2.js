function initNewHouseDiscount() {
            var pre, cur= 0;
            function LoopSlide(target,config){
                this.init(target,config);
            }

            LoopSlide.prototype = {
                config: {
                    autoSpeed: 3000,        //自动播放速度
                    speed: 10,              //播放速度
                    count: 1
                },
                init: function(target,config){
                    //判断target参数类型是否是dom，不是终止
                    if(!target){
                        return;
                    }
                    this.target = target;
                    this.config = config || {};
                    this.config = this.extend(this.config,config);

                    this.autoPlay();    //auto play to doing

                },
                autoPlay: function(){
                    var _this = this;
                    this.loop = window.setInterval(function(){
                       moveRightToLeft(_this, _this.config.speed);
                    }, _this.config.autoSpeed);
                },

                /*动画函数 默认marginLeft 0% -> -100% -> 0%
                 * @parm1 loopSlide *必需 组件对象
                 * @parm2 callback 函数 animate 结束后调用
                 */
                animate: function(_this, fn){
                    var movePecent = 5, currentPecent, _de = _this.direction == "right" ? 1 : 0, _goal = 0, _st;   //往右切换为-100% -> 0%

                    if(_de){
                        //往右切换为-100% -> 0%
                        _goal = -100;
                    }else{
                        //往左切换为0% -> -100%
                        _goal = 0;
                    }

                    currentPecent = parseInt(_this.target.getStyle("marginLeft"));
                    if(currentPecent == _goal){
                        if(fn){
                            fn(); //animate 结束后调用callback function
                        }
                        return;
                    }

                    if(_de){
                        _this.target.get().style.marginLeft = (currentPecent - movePecent) + "%";
                    }else{
                        _this.target.get().style.marginLeft = (currentPecent + movePecent) + "%";
                    }

                    //循环调用自身知道满足退出条件, speed 缺省 10ms
                    _st = setTimeout(function(){_this.animate(_this, fn)},_this.speed);

                },

                //extend覆盖新的键值对
                extend: function(o,n){
                    for(var p in n){
                        o[p] = n[p];
                    }
                    return o;
                }
            }

            function  moveRightToLeft(_this, _speed, step){
                var _left_ = 0, i, _list = _this.target.s("li");

                _this.direction = "right";
                _this.speed = _speed;
                _this.animate(_this,function(){
                    for(i = 0; i < _this.config.count; i++){
                        var _cloneNode_ = _this.target.s("li").eq(0).get().cloneNode(true);
                        _this.target.append(_cloneNode_);
                        //
                        _this.target.first().remove();
                    }

                    _this.target.setStyle({marginLeft:_left_ + "%"});
                    if(step) moveRightToLeft(_this, _speed);
                });
                /*热门导购底部 scroll-num */
                pre = cur;
                cur = (++cur) % 3;
                J.g("scroller-num" + pre).length && J.g("scroller-num" + pre).removeClass("cur-num");
                J.g("scroller-num" + cur).length && J.g("scroller-num" + cur).addClass("cur-num");
            }

            function moveLeftToRight(_this, _speed, step){
                var _left_ = -100, i, _list = _this.target.s("li");
                _this.direction = "left";
                _this.speed = _speed;
                _this.target.setStyle({marginLeft:_left_ + "%"});

                for(i = 0; i < _this.config.count; i++){
                    var _cloneNode_ = _this.target.s("li").eq(_this.target.s("li").length -1).get().cloneNode(true);
                    _this.target.get().insertBefore(_cloneNode_, _this.target.first().get());
                    _this.target.last().remove();
                }

                //调用动画函数 默认marginLeft -100% -> 0%
                _this.animate(_this, function(){
                    if(step) moveLeftToRight(_this, _speed);
                });

                pre = cur;
                cur = (--cur) % 3;
                J.g("scroller-num" + pre).length && J.g("scroller-num" + pre).removeClass("cur-num");
                J.g("scroller-num" + cur).length && J.g("scroller-num" + cur).addClass("cur-num");
            }
            var autoLoopSlide =  new LoopSlide(J.g("popGuide-scroll-ul"), {speed:10, count:1, autoSpeed:60000});

            /*热门导购底部 scroll-num click事件*/
            J.g("scroller-num").length && J.g("scroller-num").s("li").each(function(i, v){
                v.on('click', function(){
                    if(i == cur){
                        return;
                    }else if(i > cur){
                        moveRightToLeft(autoLoopSlide, autoLoopSlide.config.speed/(i-cur), i - cur > 1);
                    }else{
                        moveLeftToRight(autoLoopSlide, autoLoopSlide.config.speed/(cur-i), cur - i > 1);
                    }
                });

                v.on('mouseover', function(){
                    v.addClass("cur-num");
                });

                v.on('mouseout', function(){
                    if(i != cur){
                        v.removeClass("cur-num");
                    }
                });
            });
        }