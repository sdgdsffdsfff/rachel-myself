<?php

$strHost=$_SERVER['HTTP_HOST'];
$arrHost=explode('.',$strHost);
if(3==count($arrHost)){
    echo "error";
    exit;
}else{
    $strAppName=$arrHost[1];
    $strLoadPath=$arrHost[2];
}
define('DEV_APP_FORM',$strAppName);
define('LOAD_PATH',$strLoadPath);
define('DEV_NAME',$strLoadPath);
preg_match_all("/^(.*)\.(js|css)$/", $_SERVER['REQUEST_URI'], $matches, PREG_SET_ORDER);
$include_uri = "anjuke";
if (strpos($_SERVER['REQUEST_URI'], $include_uri) !== false && isset($matches[0])) {
	if (count($matches[0]) == 3) {
		$_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($include_uri)+1); 
		$_SERVER['DOCUMENT_URI'] = substr($_SERVER['DOCUMENT_URI'], strlen($include_uri)+1);
	}
}
$tmpArr_app=explode('-',$strAppName);
$app_name = $tmpArr_app[1]."-".$tmpArr_app[2];

define('APP_PATH', '/vagrant/user-site/'.$strAppName.'/');
// echo APP_PATH;exit;
define('APP_NAME', $app_name);
 

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE & ~E_WARNING & ~E_USER_NOTICE  & ~E_STRICT);
require "./indexCommon.php";

if (file_exists("./index-" . APP_NAME . ".php")) {
	require "./index-" . APP_NAME . ".php";
} else {
	$apf = APF::get_instance();
	$apf->set_response_class('APF_Response');
	$apf->set_request_class('APF_Request');
	#$apf->set_router_class('APF_Router');
	$apf->run();
}


