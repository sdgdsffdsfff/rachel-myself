== Read me ==
# CSS FILES
css
|- ui
|   |- button
|   |   |- btn.css  /* do not use @import */
|   |- nav
|   |    |- nav.css /* do not use @import */
|   |
|   |- ui.css   /* can use @import, but can not import duplicate css file with sibling files, e.g: ui.css&form.css import the same css: btn.css  */
|   |- form.css /* can use @import, but can not import duplicate css file with sibling files, e.g: ui.css&form.css import the same css: btn.css  */
|
|- header.css /* can use @import, but can not import duplicate css file with sibling files, e.g: header.css & footer.css import the same css: ui.css */
|- footer.css /* can use @import, but can not import duplicate css file with sibling files, e.g: header.css & footer.css import the same css: ui.css */


# Common CSS
## 页面背景
    灰色：＃EEEEEE
    白色：＃FFFFFF
##字体大小
    H1：
    H2：
    H3：34（行高：50px）
    H4：30
    H5：24
## 字体颜色
    常规深灰：#333333
    常规中灰：#888888
    链接蓝色：#007FFF
    报错红色：#FF0000
    选中橙色：#FF7F00
    价格橙色：#E54A00

# 大按钮尺寸
    高：88
    圆角：10
    背景：#FF8000
    无边框色
    字体：34
## 小按钮尺寸
    高：60
    圆角：6
    背景：#FF8000
    无边框色
    字体：30
##卡片
    padding：20
    margin：30


线条
颜色：＃cccccc
粗细：2px（如能做到1就更好）


圆角
大：10px
小：6px


弹出层
宽度：540px
圆角：10px


个地方的间距
基本都保持30px，如遇到特殊地方会做标注。