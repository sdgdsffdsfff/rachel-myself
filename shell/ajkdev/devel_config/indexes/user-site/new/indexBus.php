<?php

if(! defined('E_DEPRECATED')) {
    define('E_DEPRECATED', 8192);
}
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE & ~E_WARNING & ~E_USER_NOTICE & ~E_STRICT );

// 增加header头信息
header("ajk: m=" . MACHINE_NAME);

preg_match_all("/^(.*)\.(js|css)$/", $_SERVER['REQUEST_URI'], $matches, PREG_SET_ORDER);
$include_uri = APP_NAME;
if (strpos($_SERVER['REQUEST_URI'], $include_uri) !== false && isset($matches[0])) {
    if (count($matches[0]) == 3) {
        $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($include_uri)+1);
        $_SERVER['DOCUMENT_URI'] = substr($_SERVER['DOCUMENT_URI'], strlen($include_uri)+1);
    }
}

// 定义BASE_URI
$base_uri = DIRECTORY_SEPARATOR == '/' ? dirname($_SERVER['SCRIPT_NAME']) : str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
// define('BASE_URI', $base_uri == '/' ? '' : $base_uri);
define('BASE_URI', '');
unset($base_uri);

ini_set('display_errors',1);

// 定义LOAD_PATH和CONF_PATH
include(dirname(__FILE__) . "/loadconf.php");

// 设置业务request，response，route(bucket)
$apf = APF::get_instance();
if ($INDEX_REQUEST_CLASS && apf_require_class($INDEX_REQUEST_CLASS)) {
    $apf->set_request_class($INDEX_REQUEST_CLASS);
}
if ($INDEX_RESPONSE_CLASS && apf_require_class($INDEX_RESPONSE_CLASS)) {
    $apf->set_response_class($INDEX_RESPONSE_CLASS);
}
if ($INDEX_ROUTER_CLASS && apf_require_class($INDEX_ROUTER_CLASS)) {
    $apf->set_router_class($INDEX_ROUTER_CLASS);
}

$apf->run();

