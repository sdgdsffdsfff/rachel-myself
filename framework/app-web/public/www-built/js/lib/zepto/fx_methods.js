//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

(function(e,t){function u(n,r,i,s,o){typeof r=="function"&&!o&&(o=r,r=t);var u={opacity:i};return s&&(u.scale=s,n.css(e.fx.cssPrefix+"transform-origin","0 0")),n.animate(u,r,null,o)}function a(t,n,r,i){return u(t,n,0,r,function(){s.call(e(this)),i&&i.call(this)})}var n=window.document,r=n.documentElement,i=e.fn.show,s=e.fn.hide,o=e.fn.toggle;e.fn.show=function(e,n){return i.call(this),e===t?e=0:this.css("opacity",0),u(this,e,1,"1,1",n)},e.fn.hide=function(e,n){return e===t?s.call(this):a(this,e,"0,0",n)},e.fn.toggle=function(n,r){return n===t||typeof n=="boolean"?o.call(this,n):this.each(function(){var t=e(this);t[t.css("display")=="none"?"show":"hide"](n,r)})},e.fn.fadeTo=function(e,t,n){return u(this,e,t,null,n)},e.fn.fadeIn=function(e,t){var n=this.css("opacity");return n>0?this.css("opacity",0):n=1,i.call(this).fadeTo(e,n,t)},e.fn.fadeOut=function(e,t){return a(this,e,null,t)},e.fn.fadeToggle=function(t,n){return this.each(function(){var r=e(this);r[r.css("opacity")==0||r.css("display")=="none"?"fadeIn":"fadeOut"](t,n)})}})(Zepto);