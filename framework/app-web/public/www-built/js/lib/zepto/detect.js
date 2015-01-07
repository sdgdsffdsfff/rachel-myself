//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

(function(e){function t(e){var t=this.os={},n=this.browser={},r=e.match(/Web[kK]it[\/]{0,1}([\d.]+)/),i=e.match(/(Android);?[\s\/]+([\d.]+)?/),s=!!e.match(/\(Macintosh\; Intel /),o=e.match(/(iPad).*OS\s([\d_]+)/),u=e.match(/(iPod)(.*OS\s([\d_]+))?/),a=!o&&e.match(/(iPhone\sOS)\s([\d_]+)/),f=e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),l=e.match(/Windows Phone ([\d.]+)/),c=f&&e.match(/TouchPad/),h=e.match(/Kindle\/([\d.]+)/),p=e.match(/Silk\/([\d._]+)/),d=e.match(/(BlackBerry).*Version\/([\d.]+)/),v=e.match(/(BB10).*Version\/([\d.]+)/),m=e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),g=e.match(/PlayBook/),y=e.match(/Chrome\/([\d.]+)/)||e.match(/CriOS\/([\d.]+)/),b=e.match(/Firefox\/([\d.]+)/),w=e.match(/MSIE\s([\d.]+)/)||e.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),E=!y&&e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),S=E||e.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);if(n.webkit=!!r)n.version=r[1];i&&(t.android=!0,t.version=i[2]),a&&!u&&(t.ios=t.iphone=!0,t.version=a[2].replace(/_/g,".")),o&&(t.ios=t.ipad=!0,t.version=o[2].replace(/_/g,".")),u&&(t.ios=t.ipod=!0,t.version=u[3]?u[3].replace(/_/g,"."):null),l&&(t.wp=!0,t.version=l[1]),f&&(t.webos=!0,t.version=f[2]),c&&(t.touchpad=!0),d&&(t.blackberry=!0,t.version=d[2]),v&&(t.bb10=!0,t.version=v[2]),m&&(t.rimtabletos=!0,t.version=m[2]),g&&(n.playbook=!0),h&&(t.kindle=!0,t.version=h[1]),p&&(n.silk=!0,n.version=p[1]),!p&&t.android&&e.match(/Kindle Fire/)&&(n.silk=!0),y&&(n.chrome=!0,n.version=y[1]),b&&(n.firefox=!0,n.version=b[1]),w&&(n.ie=!0,n.version=w[1]),S&&(s||t.ios)&&(n.safari=!0,s&&(n.version=S[1])),E&&(n.webview=!0),t.tablet=!!(o||g||i&&!e.match(/Mobile/)||b&&e.match(/Tablet/)||w&&!e.match(/Phone/)&&e.match(/Touch/)),t.phone=!!(!t.tablet&&!t.ipod&&(i||a||f||d||v||y&&e.match(/Android/)||y&&e.match(/CriOS\/([\d.]+)/)||b&&e.match(/Mobile/)||w&&e.match(/Touch/)))}t.call(e,navigator.userAgent),e.__detect=t})(Zepto);