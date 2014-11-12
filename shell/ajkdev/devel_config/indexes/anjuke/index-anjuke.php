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

define("BASE_URI",'');
unset($base_uri);






define('ROOT_PATH', realpath(dirname(__FILE__) . '/../../../'));
// define('APP_PATH', realpath(dirname(__FILE__)) . '/../../../anjuke-site/app-anjuke/');
define('APP_PATH', ROOT_PATH . '/anjuke-site/app-anjuke/');
// echo APP_PATH;exit;
define('APP_NAME', 'anjuke');
 


define('SYS_PATH',APP_PATH."../system/");
$G_LOAD_PATH=array(
        APP_PATH,
        APP_PATH."../app-anjuke-pad/",
        APP_PATH."../app-sms-shared/",
        APP_PATH."../app-common/",
        APP_PATH.'../app-anjuke-x11/',
        APP_PATH.'../app-anjuke-kernel/',
        APP_PATH.'../app-faq-shared/',
        APP_PATH.'../app-member-public/',
        APP_PATH."../app-api-shared/",
        APP_PATH."../app-group-shared/",
        ROOT_PATH . "/user-site/app-user-pad/",
        ROOT_PATH . "/user-site/app-user-component/",
        ROOT_PATH . "/user-site/app-user-common/",
        ROOT_PATH . "/user-site/app-ershou-web/",
        SYS_PATH,
        "/vagrant/system-ext/",
);
$G_CONF_PATH=array(
        ROOT_PATH . "/user-site/app-user-pad/config/",
        APP_PATH."../app-sms-shared/config/",
        APP_PATH."../app-member-public/config/",
        APP_PATH."../app-common/config/",
        APP_PATH."config/",
        APP_PATH.'../app-faq-shared/config/',
        APP_PATH.'../app-anjuke-kernel/config/',
        APP_PATH.'../app-group-shared/config/',
		ROOT_PATH . "/devel-config/config/" . APP_NAME . "/",
);



require_once (SYS_PATH."functions.php");
require_once ("/vagrant/system-ext/functions.php");
spl_autoload_register('apf_autoload');
apf_require_class("APF");
APF::get_instance()->set_request_class('AJKRequest');
if (apf_require_class("AJKResponse"))
    APF::get_instance()->set_response_class('AJKResponse');
if (apf_require_class("Bucket_Router"))
     APF::get_instance()->set_router_class('Bucket_Router');
APF::get_instance()->run();
