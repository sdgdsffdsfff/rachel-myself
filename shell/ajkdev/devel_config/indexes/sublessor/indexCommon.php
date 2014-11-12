<?php
if(! defined('E_DEPRECATED')) {
    define('E_DEPRECATED', 8192);
}

$base_uri = DIRECTORY_SEPARATOR == '/' ? dirname($_SERVER["SCRIPT_NAME"]) : str_replace('\\', '/', dirname($_SERVER["SCRIPT_NAME"]));
define("BASE_URI", '');
unset($base_uri);

define('ROOT_PATH', realpath(dirname(__FILE__) . '/../../../'));
define('SYS_PATH', ROOT_PATH . "/system/");
define('SYSEXT_PATH', ROOT_PATH . "/system-ext/");
define('USC_PATH', ROOT_PATH . '/devel-config/config/sublessor/');
require_once (SYS_PATH . "functions.php");
require_once (SYS_PATH . "../system-ext/functions.php");
spl_autoload_register('apf_autoload');
$G_LOAD_PATH = array(
        APP_PATH,
        APP_PATH . "../app-sublessor-core/",
        SYSEXT_PATH,
        APP_PATH . "../app-biz/",
        SYS_PATH
);

$G_CONF_PATH = array(
        SYSEXT_PATH . "config/",
        APP_PATH . "../app-sublessor-core/config/",
        APP_PATH . "../app-biz/config/",
        APP_PATH . "config/",
        APP_PATH . "../config/" . APP_NAME . "/",
        USC_PATH . APP_NAME . "/",
);