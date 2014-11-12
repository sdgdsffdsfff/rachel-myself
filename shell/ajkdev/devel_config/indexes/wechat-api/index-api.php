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

//for alpha test start
$version="localtest";
$request_uri = ($_SERVER['REQUEST_URI']);//print_r($request_uri);
if (preg_match("/(\d{4})(\d{2})(\d{2})_(\d{2})/", $version)) {
    $app_realpath = "/home/www/release/v2/".$version."/app-api/";
} else {
    // $app_realpath = realpath(dirname(__FILE__)) . '/';
    $app_realpath = realpath(dirname(__FILE__)) . '/../../../wechat-api/app-api/';
}
//echo $app_realpath;exit;
//for alpha test end


define("BASE_URI", $base_uri == '/' ? '' : $base_uri);//echo BASE_URI;exit;
unset($base_uri);
define('APP_NAME', 'app-api');
define('APP_PATH', $app_realpath);
define('SYS_PATH', APP_PATH . "../system/");

$G_LOAD_PATH = array(
        APP_PATH,
        SYS_PATH
);
$G_CONF_PATH = array(
        APP_PATH . "config/",
        APP_PATH . "../config/" . APP_NAME . "/",
        APP_PATH . "../../devel-config/config/wechat-api/" . APP_NAME . "/",
);

require_once (SYS_PATH . "functions.php");
apf_require_class("APF");
APF::get_instance()->set_request_class('APF_Request');
APF::get_instance()->run();
