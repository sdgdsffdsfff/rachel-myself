//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

(function(e){"__proto__"in{}||e.extend(e.zepto,{Z:function(t,n){return t=t||[],e.extend(t,e.fn),t.selector=n||"",t.__Z=!0,t},isZ:function(t){return e.type(t)==="array"&&"__Z"in t}});try{getComputedStyle(undefined)}catch(t){var n=getComputedStyle;window.getComputedStyle=function(e){try{return n(e)}catch(t){return null}}}})(Zepto);