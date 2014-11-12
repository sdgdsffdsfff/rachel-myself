<?php

// define('BASE_PATH','/site/');
// define('CONF_PATH',BASE_PATH.'conf/');
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
$include_uri = "anjuke";
if (strpos($_SERVER['REQUEST_URI'], $include_uri) !== false && isset($matches[0])) {
	if (count($matches[0]) == 3) {
		$_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($include_uri)+1); 
		$_SERVER['DOCUMENT_URI'] = substr($_SERVER['DOCUMENT_URI'], strlen($include_uri)+1);
	}
}


if (!defined('E_DEPRECATED')) {
    define('E_DEPRECATED',0);
}
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE & ~E_WARNING & ~E_USER_NOTICE  & ~E_STRICT);


$base_uri=DIRECTORY_SEPARATOR=='/'?dirname($_SERVER["SCRIPT_NAME"]):str_replace('\\','/',dirname($_SERVER["SCRIPT_NAME"]));

define("BASE_URI",$base_uri=='/'?'':$base_uri);
unset($base_uri);






define('APP_PATH', '/vagrant/anjuke-site/app-member/');
// echo APP_PATH;exit;
define('APP_NAME', 'member');
 


define('SYS_PATH',APP_PATH."../system/");
$G_LOAD_PATH=array(
        APP_PATH,
        APP_PATH."../app-sms-shared/",
        APP_PATH."../app-common/",
        APP_PATH.'../app-member-public/',
        SYS_PATH,
);
$G_CONF_PATH=array(
        APP_PATH."../app-sms-shared/config/",
        APP_PATH."../app-member-public/config/",
        APP_PATH."../app-common/config/",
        APP_PATH."config/",
        "/vagrant/devel-config/config/" . APP_NAME . "/",
);

require_once(SYS_PATH."functions.php");
apf_require_class("APF");
APF::get_instance()->set_request_class('MemberRequest');
APF::get_instance()->run();

