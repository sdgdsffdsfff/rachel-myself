####switch.js组件讲解
该组件主要是源于工作中经常会用到各种的轮播，每次都需要自己重新写，显得麻烦。个人认为，如果组件内容写的越具体，则用户使用越简单，但是功能却比较狭隘，所以本组件可能更多的是给用户提供一些该组件的api接口，如switchTo/switchPrev/switchNext等，还可以在动画前后绑定对应switchBefore和switchAfter的用户自定义事件。具体使用可看switch.html测试案例。

###一. 功能点介绍
1. 使用者可以通过设置vertical='top'，在slide效果下，不是左右滑动，而是上下滑动
2. 不论用户设置的clipNum及switchNum以及itemCount之间的关系是怎样，都可以正常进行切换。比如：clipNum=switchNum=2,itemCount = 5,则（1，2）=>(3,4)=>(5,1)=>(2,3)=>(4,5)。

###二. 思路说明
1. slide效果：
	因为考虑到展示区域模块的个数clipNum和每次切换的个数switchNum，以及所有模块的总个数itemCount,他们之间的各种关系，有可能itemCount%switchNum不为0，且clipNum和switchNum之间大小关系。所以最好的实现方式是它本身就构成一个循环，这样就不用考虑他们三者之间的复杂关系了。
	一般而言，我们slide思路可能是：在最后一张向后切换到第一张的时候，是更改ul这个container的left值来实现，不过这样因为上述的三个复杂关系，实在不好找出规律，就采用了另一种思路。即让展示区域的内容在html结构上始终在第一个，而不是通过css来实现。我们每往后切换一个switchNum，则将最前面的switchNum个节点移动到最后，左移同理。switchTo:我们可以转化为switchPrev和switchNext，与currPage当前页面比较，如果大于，则往后切换（index - currPage）个模块。

2. fade/none效果：
	这两种效果差不多。原理： 多张图片叠加在一起，切换的时候，将非当前的图片opacity设置为0，当前图片设置为1。如果是fade，则用animate设置效果，否则直接css即可。
