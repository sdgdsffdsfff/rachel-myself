define("ui.slider",["zepto","zepto.sp"],function(e,t){var n=function(t){var n=this;n.op=e.extend({},{list:[],wrap:e("#canvas"),wrapHeight:-1,isHandleRadio:!0},t),n.list=n.op.list,n.wrap=n.op.wrap,n.init()},r=function(){var e=[],t=null,n=function(){var t=0;for(;t<e.length;t++)e[t].end?e.splice(t--,1):e[t]();!e.length&&r()},r=function(){clearInterval(t),t=null};return function(r,i,s,o){var u,a,f,l,c,h=new Image;h.src=r;if(h.complete){i.call(h),s&&s.call(h);return}a=h.width,f=h.height,h.onerror=function(){o&&o.call(h),u.end=!0,h=h.onload=h.onerror=null},u=function(){l=h.width,c=h.height;if(l!==a||c!==f||l*c>1024)i.call(h),u.end=!0},u(),h.onload=function(){!u.end&&u(),s&&s.call(h),h=h.onload=h.onerror=null},u.end||(e.push(u),t===null&&(t=setInterval(n,40)))}}();return n.prototype.init=function(){this.render(),this.bindEvent()},n.prototype.render=function(){this.scaleW=this.deviceWidth(),this.scaleH=this.op.wrapHeight>0?this.op.wrapHeight:this.deviceHeight(),this.radio=this.scaleH/this.scaleW,this.idx=0,this.wrap.width(this.scaleW);var t=this.wrap[0],n=this.list,r=n.length,i=this.scaleW;this.outer=document.createElement("ul"),this.nav=document.createElement("nav"),this.outer.classList.add("slider-wrap"),this.nav.classList.add("nav-wrap");for(var s=0;s<r;s++){var o=document.createElement("li"),u=document.createElement("i"),a=n[s],f=s==r-1?-i:i;o.style.width=i+"px",o.style.webkitTransform="translate3d("+f+"px, 0, 0)",o.innerHTML="<img width="+i+' data-index="'+s+'" data-img="'+n[s]+'">',u.innerHTML="•",this.outer.appendChild(o),this.nav.appendChild(u)}this.outer.style.width=i+"px",t.style.height=this.op.wrapHeight==-1?this.scaleH+"px":this.op.wrapHeight+"px",e(t).html(this.outer),e(t).append(this.nav)},n.prototype.bindEvent=function(){var n=this,r=n.scaleW,i=n.outer,s=n.list.length,o=i.getElementsByTagName("li"),u=function(e){n.startX=e.touches[0].pageX,n.offsetX=0,n.startTime=new Date*1},a=function(e){e.preventDefault(),n.offsetX=e.touches[0].pageX-n.startX;var t=i.getElementsByTagName("li"),o=n.idx-1,u=n.idx+1;if(s==2){for(o;o<=u;o++)t[o]&&(t[o].style.webkitTransition="-webkit-transform 0s ease-out"),t[o]&&(t[o].style.webkitTransform="translate3d("+((o-n.idx)*n.scaleW+n.offsetX)+"px, 0, 0)");return}for(o;o<=u;o++)o==-1?t[s-1].style.webkitTransform="translate3d("+((o-n.idx)*r+n.offsetX)+"px,0,0)":o==s?t[0].style.webkitTransform="translate3d("+((o-n.idx)*r+n.offsetX)+"px,0,0)":t[o]&&(t[o].style.webkitTransform="translate3d("+((o-n.idx)*r+n.offsetX)+"px,0,0)")},f=function(){var e=r/6,t=new Date+1,s=i.getElementsByTagName("li");t-n.startTime>300?n.offsetX>=e?n.go("-1"):n.offsetX<-e?n.go("+1"):n.go("0"):n.offsetX>50?n.go("-1"):n.offsetX<-50?n.go("+1"):n.go("0")};this.op.list.length>1&&e(i).on("touchstart",function(e){u(e)}).on("touchmove",function(e){a(e),e.preventDefault()}).on("touchend",function(e){f(e)}),e(window).on("resize",function(e){var r=n.scaleW=n.deviceWidth(),i=n.scaleH=n.op.wrapHeight>0?n.op.wrapHeight:n.deviceHeight();t.publish("slider_resized"),n.wrap.width(r),n.wrap.height(i),n.wrap.find("ul").css({width:r,height:i}),n.wrap.find("li").css({width:r,height:i}),n.go(n.idx)})},n.prototype.radioHandle=function(e,t,n){var r=this;e/t>r.scaleH/r.scaleW?(n.width("auto"),n.height(Number(r.scaleH))):(n.height("auto"),n.width(Number(r.scaleW)))},n.prototype.go=function(e){var n=this.idx,r,i=this.outer.getElementsByTagName("li"),s=i.length,o=this.scaleW;typeof e=="number"?r=e:typeof e=="string"&&(r=n+Number(e)),r>s-1?r=s==2?1:0:r<0&&(r=s==2?0:s-1),this.idx=r,t.publish("slider_move_start",[r]);if(s==1&&e==0){i[r].style.webkitTransition="-webkit-transform 0.2s ease-out",i[r].style.webkitTransform="translate3d(0, 0, 0)",this.sliderMoveEnd(r);return}if(s==2){i[r].style.webkitTransition="-webkit-transform 0.2s ease-out",i[r-1]&&(i[r-1].style.webkitTransition="-webkit-transform 0.2s ease-out"),i[r+1]&&(i[r+1].style.webkitTransition="-webkit-transform 0.2s ease-out"),i[r].style.webkitTransform="translate3d(0, 0, 0)",i[r-1]&&(i[r-1].style.webkitTransform="translate3d(-"+this.scaleW+"px, 0, 0)"),i[r+1]&&(i[r+1].style.webkitTransform="translate3d("+this.scaleW+"px, 0, 0)"),this.sliderMoveEnd(r);return}i[r].style.webkitTransition="-webkit-transform 0.2s ease-out",r==0?(i[s-1]&&(i[s-1].style.webkitTransition="-webkit-transform 0.2s ease-out"),i[r+1]&&(i[r+1].style.webkitTransition="-webkit-transform 0.2s ease-out")):r==s-1?e=="+1"?i[r-1]&&(i[r-1].style.webkitTransition="-webkit-transform 0.2s ease-out"):e=="-1"&&i[0]&&(i[0].style.webkitTransition="-webkit-transform 0.2s ease-out"):e=="+1"?i[r-1]&&(i[r-1].style.webkitTransition="-webkit-transform 0.2s ease-out"):e=="-1"&&i[r+1]&&(i[r+1].style.webkitTransition="-webkit-transform 0.2s ease-out"),i[r].style.webkitTransform="translate3d(0, 0, 0)",r==0?e=="+1"?i[s-1]&&(i[s-1].style.webkitTransform="translate3d(-"+o+"px, 0, 0)"):e=="-1"&&i[r+1]&&(i[r+1].style.webkitTransform="translate3d("+o+"px, 0, 0)"):r==s-1?e=="+1"?i[r-1]&&(i[r-1].style.webkitTransform="translate3d(-"+o+"px, 0, 0)"):e=="-1"&&(i[r-1]&&(i[r-1].style.webkitTransform="translate3d(-"+o+"px, 0, 0)"),i[0]&&(i[0].style.webkitTransform="translate3d("+o+"px, 0, 0)")):(i[r-1]&&(i[r-1].style.webkitTransform="translate3d(-"+o+"px, 0, 0)"),i[r+1]&&(i[r+1].style.webkitTransform="translate3d("+o+"px, 0, 0)")),setTimeout(function(){i[r].style.webkitTransition="-webkit-transform 0s ease-out",r==0?(i[s-1]&&(i[s-1].style.webkitTransition="-webkit-transform 0s ease-out"),i[r+1]&&(i[r+1].style.webkitTransition="-webkit-transform 0s ease-out")):r==s-1?(i[0]&&(i[0].style.webkitTransition="-webkit-transform 0s ease-out"),i[r-1]&&(i[r-1].style.webkitTransition="-webkit-transform 0s ease-out")):(i[r+1]&&(i[r+1].style.webkitTransition="-webkit-transform 0s ease-out"),i[r-1]&&(i[r-1].style.webkitTransition="-webkit-transform 0s ease-out")),r==0?(i[s-1]&&(i[s-1].style.webkitTransform="translate3d(-"+o+"px, 0, 0)"),i[r+1]&&(i[r+1].style.webkitTransform="translate3d("+o+"px, 0, 0)")):r==s-1?(i[r-1]&&(i[r-1].style.webkitTransform="translate3d(-"+o+"px, 0, 0)"),i[0]&&(i[0].style.webkitTransform="translate3d("+o+"px, 0, 0)")):(i[r-1]&&(i[r-1].style.webkitTransform="translate3d(-"+o+"px, 0, 0)"),i[r+1]&&(i[r+1].style.webkitTransform="translate3d("+o+"px, 0, 0)"))},200),this.sliderMoveEnd(r)},n.prototype.sliderMoveEnd=function(t){var n=this,i=0,s=0,o=null,u=null,a=null,f=n.scaleW,l=n.outer,c=n.list.length,h=l.getElementsByTagName("li");i=t+1==c?0:t+1,s=t==0?c-1:t-1,o=h[t]?e(h[t]).children():null,u=h[i]?e(h[i]).children():null,a=h[s]?e(h[s]).children():null,!o.attr("src")&&o.attr("src",o.attr("data-img")),!u.attr("src")&&u.attr("src",u.attr("data-img")),!a.attr("src")&&a.attr("src",a.attr("data-img")),n.op.isHandleRadio&&(r(o.attr("data-img"),function(){n.radioHandle(this.height,this.width,o)}),r(u.attr("data-img"),function(){n.radioHandle(this.height,this.width,u)}),r(a.attr("data-img"),function(){n.radioHandle(this.height,this.width,a)})),e(n.nav).find("i").removeClass("active"),e(n.nav).find("i").eq(Number(t)).addClass("active")},n.prototype.deviceWidth=function(){var e=document.body.clientWidth;return e},n.prototype.deviceHeight=function(){var e=document.body.clientHeight;return e},n}),define("userService",["zepto","ajax"],function(e,t){function n(e){var n=e.data;t({type:"POST",url:"/api/schedules/"+n.scheid+"/review",data:{level:n.level,content:n.content},dataType:"json",success:e.sucFn,error:e.errFn})}function r(e){var n=e.data;t({type:"PUT",url:"/api/inventories/"+n.property_id+"/wishlist/add",data:{url:window.location.href},dataType:"json",success:e.sucFn,error:e.errFn})}function i(e){var n=e.data;t({type:"PUT",url:"/api/inventories/"+n.property_id+"/wishlist/remove",dataType:"json",success:e.sucFn,error:e.errFn})}function s(e){var n=e.data;t({type:"PUT",url:"/api/schedules/"+n.id+"/complete",dataType:"json",success:e.sucFn,error:e.errFn})}function o(e){var n=e.data;t({type:"PUT",url:"/api/schedules/"+n.id+"/cancel",data:{reason_type:n.reason_type},dataType:"json",success:e.sucFn,error:e.errFn})}function u(e){t({type:"GET",url:"/api/property",data:e.pageInfo,dataType:"json",success:e.sucFn})}return{vote:n,addFavorite:r,cancelFavorite:i,cancelSchedule:o,completeSchedule:s,getMoreProperty:u}}),define("app/detail-property",["zepto","zepto.temp","zepto.sp","ui.slider","userService","module"],function(e,t,n,r,i,s){var o=function(t){var n=this;n._op=e.extend({},{images:s.config().images,property_id:s.config().property_id},t),n.$canvas=e("#canvas"),n.$box=e("#slider_box"),n.$detail=e("#content-detail"),n.$contentShow=e(".content-show"),n.scrollTop=0,n.suitablePic(),n.list=n.getUrls(n._op.images),n.bigSlider=null,n.minSlider=null,n.init()};o.prototype.init=function(){var t=this;t._op.images.length!=0&&(t.$box.removeClass("hidden"),t.minSlider=new r({wrap:e("#slider_box"),list:t.list,wrapHeight:"200",isHandleRadio:!1}),t.minSlider.go(0),t.$canvas.on("tap",function(){t.showPage(),e(window).scrollTop(t.scrollTop),t.$canvas.addClass("hidden")}),t.$box.on("tap",["li"],function(n){t.scrollTop=window.scrollY;var i=e(n.target).closest("img"),s=0;i.length>0&&(s=i.data("index")),t.hidePage(),t.$canvas.removeClass("hidden"),t.bigSlider?t.$canvas.removeClass("hidden"):t.bigSlider=new r({wrap:e("#canvas"),list:t.list}),t.bigSlider.go(Number(s))})),e("#wantbuy").on("tap",function(n){var r=this,s=e(this).data("status");s==0?i.addFavorite({data:{property_id:t._op.property_id},sucFn:function(t){t&&t.call_back?window.location.href=t.call_back:e(r).empty().html("&#xe60c;"),e(r).data("status",1)},errFn:function(e){t.dealError(e)}}):i.cancelFavorite({data:{property_id:t._op.property_id},sucFn:function(t){(!t||!t.call_back)&&e(r).empty().html("&#xe60d;"),e(r).data("status",0)},errFn:function(e){t.dealError(e)}})}),t.$detail.height()>40&&(t.$detail.addClass("ellipses"),t.$contentShow.removeClass("content-hide")),e("#show_all").on("tap",function(e){e.preventDefault(),t.$contentShow.addClass("content-hide"),t.$detail.removeClass("ellipses")}),e(".default-img").on("tap",function(n){var i=e(this).data("index");t.scrollTop=window.scrollY,t.$canvas.removeClass("hidden"),t.hidePage(),t.bigSlider?t.$canvas.removeClass("hidden"):t.bigSlider=new r({wrap:e("#canvas"),list:t.list}),t.bigSlider.go(Number(i))}),n.subscribe("slider_resized",function(){t.$canvas.is(".hidden")?t.showPage():t.hidePage()})},o.prototype.hidePage=function(){e(".page").css({height:document.body.clientHeight,overflow:"hidden"})},o.prototype.showPage=function(){e(".page").css({height:"auto",overflow:"auto"})},o.prototype.getUrls=function(e){var t=this,n=[];for(var r=0,i=e.length;r<i;r++)n.push(e[r].url+"-"+t.pWidth+"x"+t.pHeight);return n},o.prototype.dealError=function(e){e.redirect&&(window.location.href=e.redirect)},o.prototype.suitablePic=function(){var t=e("body").width(),n=window.devicePixelRatio,r=this;t*=n,t<=320?(r.pWidth=320,r.pHeight=200):t<=480?(r.pWidth=480,r.pHeight=300):t<=640?(r.pWidth=640,r.pHeight=400):t<=750?(r.pWidth=750,r.pHeight=468):(r.pWidth=960,r.pHeight=600)},new o}),require(["./common"],function(e){require(["app/detail-property"])}),define("../detail-property",function(){});