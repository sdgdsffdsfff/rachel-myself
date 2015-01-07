define(['lib/controller', 'service/loginService'], function (controller, loginService) {
    console.log('this is c1 control.');
    console.log($('body'));
    console.log(loginService.status);
    var c1 = new controller('Home Ctrl');
    return c1;
});
