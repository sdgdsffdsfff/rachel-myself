//The build will inline common dependencies into this file.
requirejs.config({
    baseUrl: 'js',
//    baseUrl: 'http://192.168.198.60/www/js',
    paths: {
        app: '../js',

        // Files
        common: '../common',

        // 3rd party libraries
        zeptoDir: 'lib/zepto',
        zepto: 'lib/zepto/zepto',//single
        zeptoPlugins: 'lib/zeptoPlugins',


        // modules
        utils: 'lib/utils',
        ajax: 'lib/ajax',
        'zepto.temp': 'lib/zepto.temp',
        'zepto.sp': 'lib/zepto.subscribepublish',
        'ui.popup': 'modules/ui/ui.popup',
        'ui.vote': 'modules/ui/ui.vote',
        'ui.calendar': 'modules/ui/calendar/ui.calendar',
        'ui.tab': 'modules/ui/ui.tab',
        'userService': 'service/userService',
        'ui.autocomplete': 'modules/ui/ui.autocomplete',
        'ui.slider': 'modules/ui/ui.slider'

    },
    shim: {
        zepto: {
            exports: '$'
        },
        zeptoPlugins: {
            deps: ['zepto']
        },
        'zepto.temp': {
            deps: ['zepto']
        },
        ajax: {
            deps: ['zeptoPlugins']
        },
        common: {
            deps: ['zepto', 'zeptoPlugins', 'utils', 'zepto.temp', 'zepto.sp', 'ajax']
        },
        userService: {
            deps: ['zepto', 'ajax']
        },
        'ui.popup': {
            deps: ['zepto']
        }





    },
    // remove combined files
    removeCombined: true,
    findNestedDependencies: true,
    optimizeCss: 'standard',
    //none  不压缩，仅合并
    //standard  标准压缩 去换行、空格、注释
    //standard.keepLines  除标准压缩外，保留换行
    //standard.keepComments  除标准压缩外，保留注释
    //standard.keepComments.keepLines  除标准压缩外，保留换行和注释

    waitSeconds: 0
});

define('common', ['zepto', 'zeptoPlugins', 'utils', 'zepto.temp', 'zepto.sp', 'ajax', 'app/lib/detect'], function($, plugins, utils, temp, sp, ajax){
    sp.subscribe('detect.network', function(data){
        //{online: true, status: "online", event: Event}
        var networkStatusDom = $('.network-status');
        if (networkStatusDom) {
            if (! data.online) {
                networkStatusDom.html('已断开网络，请检查网络连接。');
                networkStatusDom.show();
            } else {
                networkStatusDom.html('已连接成功。');
                networkStatusDom.show();
                setTimeout(function(){
                    networkStatusDom.hide();
                }, 2000);

            }
        }
    });

});