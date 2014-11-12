<?php
$config['cdn_host'] = "include.".DEV_NAME.".dev.anjuke.com";
$config['cdn_path'] = '';
$config['cdn_boundable_host'] = "include.".DEV_NAME.".dev.anjuke.com";
$config['cdn_boundable_path'] = '/touch';
if (PAGE_NAME == "app-user-touch" ){
$config['cdn_pure_static_host'] = "pages.".DEV_NAME.".dev.ajkcdn.com";
}else{
$config['cdn_pure_static_host'] = "pages.".PAGE_NAME.".dev.ajkcdn.com";
}
$config['cdn_pure_static_path'] = '/touch';
$config['cdn_v1_static_host'] = "static.".DEV_NAME.".dev.anjuke.com";

$config['boundable_resources'] = true;
$config['prefix_uri'] = '/res';
$config['resource_type_single'] = 's';
$config['resource_type_boundable'] = 'b';

$config['dfs_pic_touch_host'] = "pic1.ajkimg.com/";
$config['dfs_pic_display_host'] = "pc1.ajkimg.kakie.d.corp.anjuke.com/display/";
$config['dfs_pic_display_host_suffix'] = "ajkimg.kakie.d.corp.anjuke.com/display/";
#$config['yuicompressor_host'] = 'dev.aifang.com';
#$config['yuicompressor_port'] = 9998;

$config['js_domain'] =
"http://include.aifcdn.com/ujs/base/logger/dom.dom/dom.query/ajax/event/ui.panel/ui.autocomplete/ui.exposure/cookie/site/utils.base/9d96f0c3cb94d1287b370b7c14dfa500.js";
