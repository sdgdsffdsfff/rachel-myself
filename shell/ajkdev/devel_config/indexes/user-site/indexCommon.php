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
define('USC_PATH', ROOT_PATH . '/devel-config/config/user-site/');
//echo SYS_PATH;
require_once (SYS_PATH . "functions.php");
require_once (SYS_PATH . "../system-ext/functions.php");
spl_autoload_register('apf_autoload');

$G_LOAD_PATH = array(
        APP_PATH,
        APP_PATH . "../app-user-core/",
        APP_PATH . "../app-ershou-core/",
        APP_PATH . "../app-zufang-core/",
        APP_PATH . "../app-shangpu-core/",
        APP_PATH . "../app-maifang-core/",
        APP_PATH . "../app-user-common/",
        APP_PATH . "../app-user-util/",
        APP_PATH . "../app-dao/",
        SYSEXT_PATH,
        APP_PATH . "../app-public-core/",
        APP_PATH . "../app-biz/",
        APP_PATH . "../app-community-core/",
        APP_PATH . "../app-broker-core/",
        APP_PATH . "../app-member-core/",
        SYS_PATH
);

$G_CONF_PATH = array(
        SYSEXT_PATH . "config/",
        APP_PATH . "../app-dao/config/",
        APP_PATH . "../app-user-common/config/",
        APP_PATH . "../app-user-util/config/",
        APP_PATH . "../app-user-core/config/",
        APP_PATH . "../app-ershou-core/config/",
        APP_PATH . "../app-zufang-core/config/",
        APP_PATH . "../app-shangpu-core/config/",
        APP_PATH . "../app-maifang-core/config/",
        APP_PATH . "../app-public-core/config/",
        APP_PATH . "../app-broker-core/config/",
        APP_PATH . "../app-biz/config/",
        APP_PATH . "config/",
        APP_PATH . "../config/user-common/",
        APP_PATH . "../config/" . APP_NAME . "/",
        USC_PATH . "user-common/",
        USC_PATH . APP_NAME . "/",
);
