define("app/service/verifyPhoneService",["zepto","ajax"],function(e,t){function n(e){t({type:"GET",url:"/api/sendPhoneCode",data:e.data,dataType:"json",success:e.successCb,error:e.errorCb})}function r(e){t({type:"POST",url:"/api/verifyPhone",data:e.data,dataType:"json",success:e.successCb,error:e.errorCb})}return{sendCode:n,login:r}}),define("app/verify-phone",["zepto","app/service/verifyPhoneService"],function(e,t){function u(){n.on("input",function(){var t=e(this).val();if(t.length==11){var n=a(e(this).val());n&&(i.html(n).show(),c(!0))}}),r.on("click",function(){if(e(this).hasClass("status-true")){var t="";(t=a(n.val()))==""?f(n.val().trim()):i.html(t).show()}}),s.on("click",function(){n.val().trim()==""||o.val().trim()==""?i.html("手机号（或验证码）没有输入").show():(tip=a(n.val()))!=""?i.html(tip).show():l()}),h(n),h(o)}function a(e){var e=e.trim();if(e=="")return"手机号没有输入";var t=/^1\d{10}$/;return t.test(e)?"":"手机号格式错误"}function f(e){function n(){var e=60,t,n=this,i=setInterval(function(){e--,t=e+"秒后重发",r.html(t),e<=0?s(i):null},1e3)}function i(){c(!0)}function s(e){e&&clearInterval(e),r.html("获取验证码"),c(!0)}c(!1),t.sendCode({data:{phone:e},successCb:n,errorCb:i})}function l(){function e(e){location.href=e.redirect}function r(e){i.html(e.msg).show()}params.phone=n.val().trim(),params.phone_code=o.val().trim(),t.login({data:params,successCb:e,errorCb:r})}function c(e){e?r.removeClass("status-false").addClass("status-true"):r.removeClass("status-true").addClass("status-false")}function h(e){e.on("focus",function(){i.hide()})}var n=e("#fiPhone"),r=e("#sendNum"),i=e("#errorTip"),s=e("#loginByPhone"),o=e("#fiCode");(function(){u()})()}),require(["./common"],function(e){require(["app/verify-phone"])}),define("../verify-phone",function(){});