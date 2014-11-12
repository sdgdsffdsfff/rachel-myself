<?php

// 变量设置
$INDEX_APP_SOURCE_ROOT_PATH = '/vagrant/user-site/';
$INDEX_REQUEST_CLASS = 'Ershou_Web_Request';
$INDEX_RESPONSE_CLASS = 'APF_Response';
$INDEX_ROUTER_CLASS = false;

$strHost=$_SERVER['HTTP_HOST'];
$arrHost=explode('.',$strHost);
$strLoadPath=$arrHost[1];
// define('LOAD_PATH',$strLoadPath);
define('DEV_NAME',$strLoadPath);

define('APP_NAME', 'ershou-web');

// 定义机器hostname
define("MACHINE_NAME", trim(file_get_contents('/etc/hostname')));

define('SYS_PATH', "/vagrant/system/");
define('SYSEXT_PATH', "/vagrant/system-ext/");

include (dirname(__FILE__) . "/../indexBus.php");

