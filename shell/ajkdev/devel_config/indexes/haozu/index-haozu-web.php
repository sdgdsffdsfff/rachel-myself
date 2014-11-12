<?php
// die('haozu-web');
$strHost=$_SERVER['HTTP_HOST'];
$arrHost=explode('.',$strHost);
if(3==count($arrHost)){
    echo "error";
    exit;
}else{
    $strLoadPath=$arrHost[1];
}
define('LOAD_PATH',$strLoadPath);
define('DEV_NAME',$strLoadPath);
// echo LOAD_PATH;exit;



if (!defined('E_DEPRECATED')) {
    define('E_DEPRECATED',0);
}

$starttime = round(microtime(true) * 1000);

error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE & ~E_WARNING & ~E_USER_NOTICE   & ~E_USER_WARNING & ~E_STRICT);

//error_reporting(0);

$base_uri = DIRECTORY_SEPARATOR=='/' ? dirname($_SERVER["SCRIPT_NAME"]) : str_replace('\\', '/', dirname($_SERVER["SCRIPT_NAME"]));
define("BASE_URI", '');
unset($base_uri);


define('ROOT_PATH', realpath(dirname(__FILE__) . '/../../../'));
define('APP_PATH', ROOT_PATH . '/haozu-site/app-haozu-web/');
// echo APP_PATH;exit;
define('APP_NAME', 'haozu');
define('CONFING_PATH', ROOT_PATH . '/devel-config/config/'); 


define('SYS_PATH', APP_PATH."../system/");
define('AJK_DOMAIN', '.anjuke.com');
define('PAD_PATH', ROOT_PATH . '/user-site/app-user-pad/');
$G_LOAD_PATH = array(
    APP_PATH."../app-haozu-pad/",//pad
    APP_PATH."../app-member-public/",
    APP_PATH."../app-haozu-core/",
    APP_PATH,
    APP_PATH."../app-api-shared/",
    PAD_PATH,
    APP_PATH."../../user-site/app-user-component/",
    APP_PATH."../../user-site/app-user-common/",
    SYS_PATH,
    "/vagrant/system-ext/",
);
$G_CONF_PATH = array(
    PAD_PATH."config/",
    APP_PATH."../app-haozu-core/config/",
    APP_PATH."../app-member-public/config/",
    APP_PATH."config/",
                CONFING_PATH  . APP_NAME . "/",
);
// print_r($G_CONF_PATH);exit;
require_once(SYS_PATH."functions.php");
require_once ("/vagrant/system-ext/functions.php");
spl_autoload_register('apf_autoload');
apf_require_class("APF");
APF::get_instance()->set_request_class('RentRequest');
require_once(APP_PATH."../app-router-bucket/index.php");//灰度发布
APF::get_instance()->run();
