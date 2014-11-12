<?php


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

error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE & ~E_WARNING & ~E_USER_NOTICE);


define('APP_PATH', '/vagrant/jinpu-site/app-chart/');
// echo APP_PATH;exit;
define('APP_NAME', 'jinpu');
define('CONFING_PATH', '/vagrant/devel-config/config/');


define('SYS_PATH',APP_PATH."../system/");
define('BASE_URI','');

$G_LOAD_PATH=array(
        APP_PATH,
        APP_PATH."../app-common/",
        SYS_PATH
);

$G_CONF_PATH=array(
        APP_PATH."../app-common/config/",
        APP_PATH."config/",
                CONFING_PATH  . APP_NAME . "/",
);

require_once (SYS_PATH."functions.php");
apf_require_class("APF");
$apf = APF::get_instance();
$apf->set_request_class('APF_JPRequest');
$apf->set_response_class('APF_JPResponse');
$apf->run();
