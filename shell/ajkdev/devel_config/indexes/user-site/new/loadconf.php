<?php

define('BASE_PATH', $INDEX_APP_SOURCE_ROOT_PATH);
define('APP_PATH', BASE_PATH . 'app-' . APP_NAME . '/');

// 临时添加usersite的新配置路径
define('USC_PATH', '/vagrant/devel-config/config/user-site/new/');

require_once (SYS_PATH . "functions.php");
require_once (SYSEXT_PATH . "functions.php");
spl_autoload_register('apf_autoload');

$G_LOAD_PATH = array(
        APP_PATH,
        APP_PATH . "../app-user-component/",
        APP_PATH . "../app-user-core/",
        APP_PATH . "../app-member-core/",
        APP_PATH . "../app-ershou-core/",
        APP_PATH . "../app-zufang-core/",
        APP_PATH . "../app-shangpu-core/",
        APP_PATH . "../app-broker-core/",
        APP_PATH . "../app-user-common/",
        APP_PATH . "../app-user-util/",
        APP_PATH . "../app-dao/",
        APP_PATH . "../app-public-core/",
        APP_PATH . "../app-biz/",
        APP_PATH . "../app-community-core/",
        APP_PATH . "../app-maifang-core/",
        SYSEXT_PATH,
        SYS_PATH,
);

$G_CONF_PATH = array(
        SYSEXT_PATH . "config/",
        APP_PATH . "../app-biz/config/",
        APP_PATH . "../app-community-core/config/",
        APP_PATH . "../app-dao/config/",
        APP_PATH . "../app-user-common/config/",
        APP_PATH . "../app-user-util/config/",
        APP_PATH . "../app-user-core/config/",
        APP_PATH . "../app-ershou-core/config/",
        APP_PATH . "../app-zufang-core/config/",
        APP_PATH . "../app-shangpu-core/config/",
        APP_PATH . "../app-public-core/config/",
        APP_PATH . "../app-broker-core/config/",
        APP_PATH . "config/",
        USC_PATH . "../user-common/",
        USC_PATH . APP_NAME . "/",
        "/home/www/user/usersite/config/user-common/",
        "/home/www/user/usersite/config/" . APP_NAME . "/",
);