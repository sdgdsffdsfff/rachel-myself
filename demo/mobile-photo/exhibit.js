
/*
Apps.add('Class.gallery',function gallery(){})
var gallery=new Apps.Class.gallery(id);
gallery.extend({});
gallery.load()
*/

var Apps=(function(WIN,undefined){
	var Doc=document,Op=Object.prototype,Ap=Array.prototype,noop=function(){};
	return {
		add:function(str,value){
			var n = str.split("."),g = null,f=Apps;
			while (g = n.shift()){
				if (n.length) {
					f[g] === undefined && (f[g] = {});
					f = f[g];
				}else if (f[g] === undefined){
					if(typeof value=='function'){f[g] =value.call(Apps,f)}else{f[g] = value}
				}
			}
		},
		is:function(obj,type){
			return String(Op.toString.call(obj)).slice(8,-1) === type;
		}
	}
})(window);

//添加一个gallery类在Apps.Class内
Apps.add('Class.gallery',function(){
	var D=document,win=window;
	function gallery(ele,options){
		this.lay=D.getElementById(ele).children[0];
		this.width = this.lay.getBoundingClientRect().width || this.lay.offsetWidth;
		this.options = options || {};
		this.callback = this.options.callback || false;
		this.Added=false;
		this.setup();
	}
	gallery.prototype={
		setup:function(){
			this.pages=this.lay.children;
			if(this.pages<1){return}
			this.NUM=this.pages.length;
			this.index=0;
			this.from=undefined;
			if (!this.Added && this.lay.addEventListener) {
				this.lay.addEventListener('touchstart', this, false);
				this.lay.addEventListener('touchmove', this, false);
				this.lay.addEventListener('touchend', this, false);
				this.lay.addEventListener('touchcancel', this, false);
				win.addEventListener("onorientationchange" in win ? "orientationchange" : "resize",this, false);
				this.Added=true;
			}
			if(this.callback){
				this.lay.addEventListener('webkitTransitionEnd',this, false);
				this.doSomething(this);
			}
			this.slide(this.index,0);
		},
		handleEvent: function(e) {
			switch (e.type) {
			  case 'touchstart': this.onStart(e); break;
			  case 'touchmove': this.onMov(e); break;
			  case 'touchcancel' :
			  case 'touchend': this.onEnd(e); break;
			  case 'webkitTransitionEnd': this.doSomething(this); break;
			  case 'orientationChange' : 
			  case 'resize':this.reset(e);break;
			}
		},
		slide:function(idx,duration){
			var style = this.lay.style;
			this.from=this.index;this.index = idx;
			style.webkitTransitionDuration = duration + 'ms';
			style.webkitTransform ='translateX('+ -(idx * this.width) + 'px)';
			if(this.pages[idx]&&this.pages[idx].className==''){
				this.pages[idx].className="ready";
			}
		},
		onStart:function(e){
			this.pageX=e.touches[0].pageX;
			this.pageY=e.touches[0].pageY;
			this.time=+new Date;
			this.deltaX = 0;
			this.dis=getX(this.lay);
			this.lay.style.webkitTransitionDuration = 0;
			e.stopPropagation();
		},
		onMov:function(e){
			e.preventDefault();
			this.deltaX = e.touches[0].pageX - this.pageX;
			this.lay.style.webkitTransform = 'translate3d(' + (this.deltaX - this.index * this.width) + 'px,0,0)';
			e.stopPropagation();
		},
		onEnd:function(e){
			var isValidSlide = +new Date - this.time <250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width/2,
				isPastBounds = !this.index && this.deltaX > 0 || this.index == this.NUM - 1 && this.deltaX < 0; 
			this.slide( this.index + ( isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0 ),300);
			 e.stopPropagation();
		},
		doSomething:function(e){
			if((e.from==undefined) || (e.from!=e.index)){
				e.callback.apply(e,[e,e.index,e.from]);
			}
		},
		reset:function(){
			this.width = this.lay.getBoundingClientRect().width || this.lay.offsetWidth;
			this.slide(this.index,0);
		},
		extend:function(obj,target){
			target = target||this;
			for(var prop in obj){target[prop] = obj[prop]}
		}
	}
	return gallery
})


var gallery=new Apps.Class.gallery("g");//生成实例
gallery.extend({//特性扩展
	$$:function(a,b){
		var c = (a && typeof a != "string") ? a: document.getElementById(a);
		return (!b ? c: c.getElementsByTagName(b));
	},
	init:function(D){
		this.eles={};
		this.eles['CORE']=D.getElementById("gallery");
		this.eles['p']=D.getElementById("gmore");
		this.eles['title']=D.getElementById("ghd");
		this.eles['info']=D.getElementById("ginfo");
		this.eles['bar']=this.$$("bar","i")[0];
		this.events(this.eles);
		return this;
	},
	events:function(e){
		var that=this;
		e['CORE'].addEventListener("touchstart",function(ev){
			switch(ev.target.id){
				case 'ghd':
				case 'menu':
				case 'gmore':e.p.className=e.p.className=='show'?'':'show';break;
				case 'pre':that.nav(-1);break;
				case 'next':that.nav(1);break;
			}
		},false)
	},
	preload:function(url,callback){
		var img =new Image();    
		img.onload =function(){callback(img);img.onload=img.onerror=null;}
		img.onerror=function(){img.src='http://www.baidu.com/img/baidu_logo.gif';img.onerror=null}
		img.src = url;
	},
	nav:function(e){
		if(this.index+e<0 || this.index+e >=this.NUM){return}
		this.slide(this.index+e,300);
	},
	load:function(uid){
		var that=this,str='',len;
		if(!uid){return};
		that.lay.className="ready";
		$.ajax({
		  type: 'GET',
		  url: 'index.php',
		  data: {m:'dbsource',c:'call',a:'get',id:uid},
		  dataType: 'json',
		  //timeout: 300,
		  success: function(txt){
			that.lay.className="";
			len=txt.length;
			that.DATA=txt;
			for(var i=0;i';}
			that.lay.innerHTML=str;
			that.setup();
		  },
		  error: function(xhr,type){
			that.lay.innerHTML="栏目繁忙，请选择其他图集"
		  }
		})
	},
	render:function(){/* 模板引擎 */},
	callback:function(e,idx,from){
		var pages=e.pages[idx||0];
		var data=e.DATA[idx||0];
		e.eles.title.innerHTML=data['title'];
		e.eles.info.innerHTML=(idx+1)+"/"+e.NUM;
		e.eles.p.innerHTML=data['description']+"
"+data['intime'];
		e.eles.bar.style.width = (idx+1)/e.NUM*100 + "%";
		if(pages.className!='done'){
			e.preload(data['thumb'],function(img){
					pages.innerHTML="img src='"+img.src+"'";
					pages.className="done";
			})
		}
	},
	menu:function(){
		var t=this;var cate=t.$$('cate'),panel=t.$$('panel'),lis=t.$$(panel,'li'),len=lis.length,from=lis[0];
		from.className='on';
		cate.addEventListener("touchstart",function(ev){
			var node=ev.target;
			panel.style.display=panel.style.display=="block"?'none':"block";
			t.eles.p.className='show';
			if(node.nodeName.toLowerCase()=='li'){
				if(node==from){return}
				from.className="";node.className="on";
				from=node;
				t.load(node.getAttribute("data-uid"));
			}
		},false);
	
	}
});
gallery.init(document).load(9);
gallery.menu();


/* 其他插件 */
;(function($,win,undefined){
        'use strict';
        var pName="Orz",
        defaults = {
			content:"ul>li",
			effect:"scroll",
			button:true,
			loop:false,
			vertical:false,
			all:true,
			nav:false
		};
		var EFFECT={
			'scroll':function(e){
				e.isMoving=true;
				if(e.opts.loop && e.from==e.len-1 && e.idx==0){
					e.css[e.fly]+=this.WH;
					e.lay.animate(e.css,function(){
							e.lay[0][e.fly]=0;
							e.isMoving=false;
					})
				}else{
					e.css[e.fly]=(e.idx*this.WH);
					e.lay.animate(e.css,'slow',function(){
							e.isMoving=false;
					});
				}
			},
			'fade'  : function(e){},
			'flip'  : function(e){},
			'swipe' : function(e){}
		}
        $.fn[pName]=function(options,value){
                if(typeof options === 'object' || !arguments.length){
                        var opts= $.extend({},defaults,options);//$.extend(defaults,options);
                        return this.each(function(){
                                if (!$.data(this,'plugin-' + pName)){
					$.data(this,'plugin-' + pName,new Plugin($(this),opts));
                                }
                        });
                }else if(typeof options === 'string' && options != 'init'){
                        return this.each(function(){
                                var data=$.data(this,'plugin-' + pName);
                                if(data && data[options]){
                                        value && (data.opts[options]=value);
                                        return data[options]();
                                }
                        });
                }
        };

        function Plugin($this,opts){
                this.$e = $this;
		this.idx=0;
		this.from=0;
		this.opts=opts;
		this.$lis=$this.find(opts.content);
		this.isMoving=false;
		this.len=this.$lis.length;
		this.effect = EFFECT[opts.effect]||function(){};
                this.init(opts);
        };
        Plugin.prototype={
                init:function(opts){
					this.readyCss(opts);
					this.generate(opts)
                },
                readyCss:function(opts){
					var $lis=this.$lis.eq(0);
					var wh=opts.vertical?$lis.outerHeight(true):$lis.outerWidth(true);
					var WH=opts.vertical?this.$e.height():this.$e.width();
					var gap=opts.vertical?parseInt($lis.css('marginBottom')):parseInt($lis.css('marginRight'));
					if(gap>0){WH=WH+gap}//算上margin
					this.viewed=Math.ceil(WH/wh);
					this.num=this.len;
					switch(opts.effect){
						case "scroll":
							var l,tmp;
							this.css={};
							if(opts.all){this.WH=WH;this.len=Math.ceil(wh*this.num/(this.WH+gap))}else{this.WH=wh}
							this.fly=opts.vertical?'scrollTop':'scrollLeft';
							this.$ul=this.$e.children(opts.content.substring(0,opts.content.indexOf('>')));
							if(opts.loop){
								tmp=document.createDocumentFragment();
								for(var i=0;i").children().css({overflow:'hidden',float:opts.vertical?'':'left'});
							this.lay=this.$ul.parent();
							break;
						default:break;
					}
                },
				generate:function(opts){
					var that=this;
					if(opts.button && this.len>1){
						var $ol=$("
").appendTo(this.$e),str='';
						for(var i=0;i"+(i+1)+"";}
						$ol[0].innerHTML=str;
						this.olis=$ol[0].getElementsByTagName('li');
						this.olis[0].className="on";
						this.$e.on("mouseover","ol li", function(){
							that.start($(this).index());
						})
					}
					if(opts.nav && this.len>1){
						$("<>").appendTo(this.$e);
						this.$e.on("click",".pre",function(){
							that.nav(that.idx--);
							
						}).on("click",".next",function(){
							that.nav(that.idx++);
							
						})
					}
				},
				start:function(now){
					this.idx=now;
					if(this.idx!=this.from && !this.isMoving){		
						this.effect(this);
						this.reset();
					}
				},
				reset:function(){
					if(this.opts.button){
						this.olis[this.from].className="";
						this.olis[this.idx].className="on";
					}
					this.from=this.idx;
				},
				nav:function(){
					if(!this.isMoving){
						if( (!this.opts.loop && !this.opts.all) && (this.idx>(this.num-this.viewed))){
							this.idx=0;
						}
						if(this.idx<0 || this.idx>=this.len){
							this.idx=0;
						}
						this.start(this.idx);
					}
				}
        }

})(jQuery,window);

$('#ppt').Orz({nav:true,loop:true})
$('#ppt2').Orz({nav:true,button:false,all:false,loop:true})
$('#ppt3').Orz({vertical:true,nav:true,all:false,button:false})
$('#ppt4').Orz({vertical:true,nav:true})
