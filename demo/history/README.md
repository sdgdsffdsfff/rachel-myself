###history api总结

####html4时代的history api

A) history.length：当前历史列表中的历史记录数（我大概测了下，IE6+是从0开始的，其他的是从1开始的）； 

B) history.go(n)：前进或后退n条记录，当n=0或空时会刷新当前页； 

C) history.back()：后退一步； 

D) history.forward()：前进一步;

理论上来说，我们比较少的会用length去判断

####html5新增的history api

A) history.pushState(data, title [, url])：往历史记录堆栈顶部添加一条记录；data会在onpopstate事件触发时作为参数传递过去；title为页面标题，当前所有浏览器都会 忽略此参数；url为页面地址，可选，缺省为当前页地址； 

B) history.replaceState(data, title [, url]) ：更改当前的历史记录，参数同上； 

C) history.state：用于存储以上方法的data数据，不同浏览器的读写权限不一样；(**它用于表示当前的浏览历史记录对应的data数据**) 

D) window.onpopstate：响应pushState或replaceState的调用；关于它的详细理解，可以在后面的例子中结合实例讲解。

####如何检测浏览器是否支持history api
```javascript
function supports_history_api() { 
    return !!(window.history && history.pushState); 
}
```

####如何检测history.state的兼容性

```javascript

var originalHistoryState = history.state; // 保存原有的历史信息 
history.replaceState(1, null); // 替换当前历史信息 
var stateSupport = history.state == 1; // 是否存储到刚设置的历史信息 
history.replaceState(originalHistoryState, null); // 恢复原来的历史信息

```

####适用场景

个人认为，它更适合于单页面ajax数据请求，单独作为一个页面，可以使用前进/后退按钮，进行切换。如Facebook相册，虽然是ajax的方式，但哟ing胡可以直接复制页面地址分享给好友，好友打开看到的就是ajax加载的数据，做到了书签化（可以看例子history2:单页面不同标签间的切换，可以当作不同页面进行前进/后退）

####history 知识点总结

1) A -> B -> C，不论是否使用history，由C后退到B，则B页面的dom会重新渲染，js啥的也会重新执行

2) replaceState只是在替换当前url，并不会刷新页面。对于之后，后退到该url时，显示的是该url，内容不变。pushState也是同样，它只是在浏览历史记录中增加一个新的url，且当前url变成pushState指定的url，内容不变。例子：A(pushState了)->B。当我们从B回退到A时，第一次时回退到pushState指定的url,如果不做特殊处理，页面展示内容同A，如果做了处理，则是处理后的内容。再点一次回退，才会真正回退到A页面。

####history 例子解析

#####history1例子

这个是用于测试从列表页面（通过点击“更多”，ajax异步获取数据）到单页，再返回列表页，希望页面能停留在离开时候的位置，同时异步获取的数据也要存在。这个在一般手机的app浏览器中，浏览器自身就会做到。但是在微信的浏览器中测试，就会出现异步加载的内容返回后是不存在的。为了解决这个问题，有如下解决方案：

1) 当我们在点击“更多”的时候，将当前页面的url(使用history.replaceState)替换为http://192.168.198.112:3000/list?page=对应的页数(原先的url是http://192.168.198.112:3000/list)。

2) 当我们从列表页点击到单页，此时在点击“返回”到列表页，它就还会停留在之前离开的位置（异步加载的数据也在）。原因是：当我们回退后，回退到的页面会重新刷新渲染（url是http://192.168.198.112:3000/list?page=2）。当然这个是需要后端支持能渲染该url对应的页面（这样之前异步加载的数据就在了，其实本次是同步加载过来的），而且位置也正确。


#####history2例子

这是一个单页面，通过不同链接，ajax请求不同数据。但是通过history的处理，我们可以做到，把不同标签代表的页面（实际上是ajax请求的数据）通过前进/后退，进行切换。

原理：

1) 每次手动点击上面的链接菜单，不仅ajax去请求数据，同时将（**当前页面location.href问号前的部分＋ajax请求url问号后的内容**）组合，使用history.pushState塞到浏览器历史中。

2) 我们也会给window绑定popstate事件，则只要浏览器前进或者后退，都会触发window.onpopstate事件（**只要整个页面使用过一次pushState或者replaceState，则之后的前进后退都会触发该事件。**）。

3) 在window.onpopstate事件中（**只要触发了该事件，则此时浏览历史栈中的最上面的就会成为当前页面的url，自动替换，只要触发该事件就行**）。所以接下来，只需要将内容也改成对应该url应有的内容就行。

**注意：我们触发了popstate事件后，从栈中会取出当前位置的url，但是特别注意的是，它不是真正的抛出后就找不到了，等下次前进的时候，它还可以在当前位置取出后一个url。我们就可以理解为：其实浏览器历史是一个数组，我们前进后退就只是取出当前位置的前一个或者后一个url,而并不会取出后就丢失了，它会一直在，即使后退到了，最后一个url，之前的url数组仍在都在**

4) 在页面首次载入的时候，如果没有问号后面的内容，则使用第一个链接菜单对应的查询内容（默认）。且使用history.replaceState更改当前的浏览器历史。这样的结果就是url改了，等下次利用后退到该页面，显示的url就是被替换后的url，其他不变。

