<?php

// resources deliver
if (defined("RELEASE_VERSION")) {
    $config['version'] = str_replace("_", "", RELEASE_VERSION);
}
//$config['expires'] = strtotime("2008-06-01 00:00:00") + 3600 * 24 *3650;
//$config['last_modified'] = strtotime("2008-06-04 00:00:00");

//$config['yuicompressor_port'] = 9999;

$config['cdn_host'] = "include.".DEV_NAME.".zu.dev.anjuke.com";
$config['cdn_path'] = "";
$config['boundable_resources'] = false;
$config['cdn_boundable_host'] = "include.".DEV_NAME.".zu.dev.anjuke.com";
$config['cdn_boundable_path'] = "";
$config['cdn_pure_static_host'] = "pages.".DEV_NAME.".zu.dev.anjuke.com";
$config['cdn_pure_static_path'] = "/haozu";
$config['cdn_v1_static_host'] = "static.anjuke.com";
$config['cdn_v1_static_path'] = "";

$config['boundable_resources'] = true;

$config['prefix_uri'] = '/res';
$config['resource_type_single'] = 's';
$config['resource_type_boundable'] = 'b';

//css img 版本
$config['resource_version'] = "";
$config['js_domain'] = "http://jockjs.fp10.anjuke.test";

//$config['js_domain'] = "http://include.aifcdn.com";
//$config['js_domain'] = "http://jockjs.benlinhuo.dev.anjuke.com";
$config['js_version'] = '2014_36_02';
$config['performance_version'] = '1411873963';
