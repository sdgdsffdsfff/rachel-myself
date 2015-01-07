define(['zepto', 'ajax'], function($, ajax) {
    //下发短信验证码
    function sendCode(opts) {
        ajax({
            type: 'GET',
            url: '/api/sendPhoneCode',
            data: opts.data,
            dataType: 'json',
            success: opts.successCb,
            error: opts.errorCb
        });
    }
    
    //登录
    function login(opts) {
        ajax({
            type: 'POST',
            url: '/api/verifyPhone',
            data: opts.data,
            dataType: 'json',
            success: opts.successCb, //后台根据from_src跳转至不同页面
            error: opts.errorCb
        });
    }
    
    return {
        sendCode: sendCode,
        login: login
    }
});
