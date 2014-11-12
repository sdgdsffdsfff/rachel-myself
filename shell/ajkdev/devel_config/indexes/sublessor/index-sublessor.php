<?php
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE & ~E_WARNING & ~E_USER_NOTICE);
$strHost=$_SERVER['HTTP_HOST'];
$arrHost=explode('.',$strHost);
if(3==count($arrHost)){
    echo "error";
    exit;
}else{
    $strLoadPath=$arrHost[1];
    $dev_name=$arrHost[1];
}
define('LOAD_PATH',$strLoadPath);
define('DEV_NAME',$dev_name);
//echo DEV_NAME;exit;

preg_match_all("/^(.*)\.(js|css)$/", $_SERVER['REQUEST_URI'], $matches, PREG_SET_ORDER);
$include_uri = "sublessor";
if (strpos($_SERVER['REQUEST_URI'], $include_uri) !== false && isset($matches[0])) {
    if (count($matches[0]) == 3) {
        $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($include_uri)+1);
        $_SERVER['DOCUMENT_URI'] = substr($_SERVER['DOCUMENT_URI'], strlen($include_uri)+1);
    }
}

define('APP_PATH', realpath(dirname(__FILE__) . '/../../../sublessor/app-sublessor-web') . '/');
define('APP_NAME', 'sublessor-web');
define('PAGE_NAME', $arrHost[1]);

require "./indexCommon.php";

$apf = APF::get_instance();
$apf->set_response_class('APF_Response');
$apf->set_request_class('Sublessor_Web_Request');
// $apf->set_router_class('APF_Router');
// $apf->set_router_class('User_Common_Bucket_Router');
$apf->run();
