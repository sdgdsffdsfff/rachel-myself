define(['lib/controller', 'service/loginService'], function (controller, loginService) {
    console.log('this is c1 control.');
    var c1 = new controller('Login Ctrl');
    return c1;
});
