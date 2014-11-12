<?php
if (defined("RELEASE_VERSION")) {
    $config['version'] = str_replace("_", "", RELEASE_VERSION);
}
//$config['expires'] = strtotime("2008-06-01 00:00:00") + 3600 * 24 *3650;
//$config['last_modified'] = strtotime("2008-06-04 00:00:00");

//$config['yuicompressor_host'] = 'localhost';
//$config['yuicompressor_port'] = 9999;

$config['cdn_host'] = "wxapi." . LOAD_PATH . ".dev.aifcdn.com";
$config['cdn_path'] = "/aifang-api";
$config['cdn_boundable_host'] = "include." . LOAD_PATH . ".dev.aifcdn.com";
$config['cdn_boundable_path'] = "/aifang-api";
$config['cdn_pure_static_host'] = "pages." . LOAD_PATH . ".dev.aifcdn.com";
$config['cdn_pure_static_path'] = "";

$config['boundable_resources'] = TRUE;

$config['prefix_uri'] = '/res';
$config['resource_type_single'] = 's';
$config['resource_type_boundable'] = 'b';
