####锚点总结

一、锚点定位的本质就是修改容器的滚动高度。当然如果父容器无法滚动，则锚点定位就会实效。

见"父容器无滚动锚点定位失效demo.html"。该例子中
```html
body,
html {
    height: 100%;
    margin: 0;
    overflow: hidden;
}
.container {
    height: 100%;
    overflow: auto;    /* 滚动条来自这里 */
}
而#hot的img，是绝对定位到文档中的，不在滚动容器内，所以它是没法通过锚点滚动而准确定位的。
```

二、overflow：hidden下的锚点定位

overflow: hidden跟overflow: auto/scroll的差别就在于有没有那个滚动条。元素overflow: hidden了，里面内容高度溢出的时候，滚动依然存在，仅仅滚动条不存在。所以overflow：hidden依然可以进行锚点定位。

可以见“无js实现选项卡轮转切换效果.html”。原理：overflow：hidden实际上只是个障眼法，里面的选项卡列表们因为锚点定位而一个个滚动到容器上边缘了，就形成了“选项卡切换”的效果。

三、锚点定位机制产生的问题

看例子：slidedown.html是正常的，可以自上往下正常动画切换。而slideup.html是有问题的，可以运行例子。但是查看源码，可以知道，这两个例子的差异就只是translateY(100%)与translateY(-100%)的一点点差别，但是效果一个正常，一个不正常。原因是：slidedown效果是元素从容器的上面往下出现，在触发锚点定位的时候，这个元素是没有定位的。但是，slideup是从下面开始，在执行CSS的translateY(100%)的一瞬间，实际上一个等高的滚动条已经出现，锚点定位于是被触发，元素被上移一个身位；然后slideup动画触发，于是，元素跑到了容器之外，不可见了，这就是slideup demo中元素莫名向上的原因。

关于锚点：

如果元素在滚动容器的左上角区域及其之外，显然滚不动，自然也没有锚点定位的效果！ 但是，如果元素在滚动容器的右下方及其之外，滚动条就是用来滚动右下溢出内容的，因此，这类元素可以被锚点定位。

解决方案：

slideup效果是从translateY（100%）到translateY(0%)，其效果不能准确呈现的终极原因是translateY（100%）造成的滚动和锚点定位偏移滚动同一时间出现造成了冲突！所以我们的解决方案就是让动画效果延迟。如下：
```html
@keyframes slideupin {
    0% {transform: translateY(100%); }
    100% { transform: translateY(0%);}
}
.list{
    ... position:absolute;
    transform: translateY(-100%);
    transition: transform .35s .05s linear;//多加了.05s的延迟
}
.list:target {
    z-index: 1;    /* 最上面显示 */
    transform: translateY(0%);
    animation: slideupin .35s .05s linear forwards;//多加了.05s的延迟
}
```