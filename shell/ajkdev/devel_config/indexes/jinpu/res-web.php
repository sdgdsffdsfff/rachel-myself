<?php


error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE & ~E_WARNING & ~E_USER_NOTICE);

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

preg_match_all("/^(.*)\.(js|css)$/", $_SERVER['REQUEST_URI'], $matches, PREG_SET_ORDER);
$include_uri = "web";
if (strpos($_SERVER['REQUEST_URI'], $include_uri) !== false && isset($matches[0])) {
	if (count($matches[0]) == 3) {
		$_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($include_uri)+1); 
		$_SERVER['DOCUMENT_URI'] = substr($_SERVER['DOCUMENT_URI'], strlen($include_uri)+1);
	}
}
// echo $_SERVER['REQUEST_URI'];exit;

define('APP_PATH','/vagrant/jinpu-site/app-web/');
// echo APP_PATH;exit;
define('APP_NAME', 'jinpu');


define('SYS_PATH',APP_PATH."../system/");
define('BASE_URI','/web');

$G_LOAD_PATH=array(
        APP_PATH,
    APP_PATH."../../user-site/app-user-common/",
        APP_PATH."../app-common/",
        APP_PATH."../../user-site/app-user-component/",

        SYS_PATH
);

$G_CONF_PATH=array(
        APP_PATH."../app-common/config/",
        APP_PATH."config/",
		APP_PATH . "../../devel-config/config/" . APP_NAME . "/",
);

require_once (SYS_PATH."functions.php");
apf_require_class("APF");
$apf = APF::get_instance();
$apf->set_request_class('APF_JPRequest');
$apf->run();
