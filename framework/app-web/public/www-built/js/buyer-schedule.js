define(["zepto","zepto.temp","zepto.sp","ui.popup","userService"],function(e,t,n,r,i){var s=function(t){var n=this;n._op=e.extend({},{noshowTpl:"",confirmTpl:""},t),n.showDialog=new r({width:"300",height:"auto"}),n.showDialog.closePop(),n.data={},n.init()};s.prototype.init=function(){var t=this;e(".confirm-show").on("tap",function(n){n.preventDefault();var r=n.target,i=e(r).closest(".schedule-box").data("showid");t.showDialog.changeContent(t._op.confirmTpl),t.showDialog.showPop(),t.data.showId=i}),e(".no-show").on("tap",function(n){n.preventDefault();var r=n.target,i=e(r).closest(".schedule-box").data("showid");t.showDialog.changeContent(t._op.noshowTpl),t.showDialog.showPop(),t.data.showId=i}),e(".pop-container").on("tap",["#no_cancel","#no_submit","#show_cancel","#show_submit",'input[type="radio"]'],function(n){n.preventDefault();var r=e(n.target);if(r.is("#no_cancel")||r.is("#show_cancel"))t.showDialog.closePop();else if(r.is("#no_submit")){var i=e(".noshow-dialog").find("input:checked");i.length>0?(t.data.result=0,t.data.reason=i.data("reasonid"),t.handle()):e(".error-msg").empty().html("请选择原因")}else r.is("#show_submit")?(t.data.result=1,t.data.reason="",t.handle()):r.closest("label")&&e(".error-msg").empty().html("&nbsp;")})},s.prototype.handle=function(){var e=this;i.confirmSchedule({data:e.data,sucFn:function(e){},errFn:function(e){}})},new s({noshowTpl:e("#noshow_tpl").html(),confirmTpl:e("#confirm_tpl").html()})});