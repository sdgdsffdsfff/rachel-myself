<?php

if(! defined('E_DEPRECATED')) {
    define('E_DEPRECATED', 8192);
}
error_reporting(E_ALL & ~ E_DEPRECATED & ~ E_NOTICE);

$strHost=$_SERVER['HTTP_HOST'];
$arrHost=explode('.',$strHost);
if(3==count($arrHost)){
    echo "error";
    exit;
}else{
    $strLoadPath=$arrHost[1];
}
define('LOAD_PATH',$strLoadPath);
#echo LOAD_PATH;exit;
 
$base_uri = DIRECTORY_SEPARATOR == '/' ? dirname($_SERVER["SCRIPT_NAME"]) : str_replace('\\', '/', dirname($_SERVER["SCRIPT_NAME"]));
$app_realpath = realpath(dirname(__FILE__)) . '/../../../smart-config/app-user-config/';
define("BASE_URI", $base_uri == '/' ? '' : $base_uri);//echo BASE_URI;exit;
unset($base_uri);
define('APP_NAME', 'user-config');
define('APP_PATH', $app_realpath);
define('SYS_PATH', APP_PATH . "../../system/");
// echo SYS_PATH;exit;

require_once (SYS_PATH . "functions.php");
require_once (SYS_PATH . "../system-ext/functions.php");
spl_autoload_register('apf_autoload');
 
$G_LOAD_PATH = array(
        APP_PATH,
        APP_PATH . "../app-dao/",
        APP_PATH . "../../system-ext/",
        SYS_PATH
);
$G_CONF_PATH = array(
        APP_PATH . "../../system-ext/config/",
        APP_PATH . "../app-dao/config/",
        APP_PATH . "config/",
        APP_PATH . "../config/" . APP_NAME . "/",
        APP_PATH . "../../devel-config/config/smart-config/" . APP_NAME . "/",
);
// print_r($G_LOAD_PATH);exit;

$apf = APF::get_instance();
$apf->set_response_class('APF_Response');
$apf->set_request_class('APF_Request');
$apf->run();


