<?php

define('APP_NAME', 'user-job');
$app_realpath = realpath(dirname(__FILE__)) . '/../../../smart-config/app-' . APP_NAME . '/';
define('APP_PATH', $app_realpath);
define('SYS_PATH', APP_PATH . "../../system/");



if(! defined('E_DEPRECATED')) {
    define('E_DEPRECATED', 8192);
}

error_reporting(E_ALL & ~ E_DEPRECATED & ~ E_NOTICE);
$base_uri = DIRECTORY_SEPARATOR == '/' ? dirname($_SERVER["SCRIPT_NAME"]) : str_replace('\\', '/', dirname($_SERVER["SCRIPT_NAME"]));
define("BASE_URI", $base_uri == '/' ? '' : $base_uri);
unset($base_uri);

// var_dump(APP_PATH);exit;

require_once (SYS_PATH . "functions.php");
require_once (SYS_PATH . "../system-ext/functions.php");
spl_autoload_register('apf_autoload');

$G_LOAD_PATH = array(
        APP_PATH,
        APP_PATH . "../app-user-config/",
        APP_PATH . "../app-user-common/",
        APP_PATH . "../app-dao/",
        APP_PATH . "../../system-ext/",
        SYS_PATH
);

$G_CONF_PATH = array(
        APP_PATH . "../../system-ext/config/",
        APP_PATH . "../app-dao/config/",
        APP_PATH . "../app-user-common/config/",
        APP_PATH . "../app-user-config/config/",
        APP_PATH . "config/",
        APP_PATH . "../../devel-config/config/smart-config/user-config/",
);


$opts = getopt('', array(
        'class:',
        'batch::',
));


/**
 * user-site pools config
 */
if (!empty($opts["batch"])) {
    $G_CONF_PATH = array(
            APP_PATH . "../../system-ext/config/",
            APP_PATH . "../../devel-config/config/smart-config/user-config/",
            APP_PATH . "../../devel-config/config/user-site/" . $opts["batch"] . "/",
    );
}
// print_r($G_CONF_PATH);exit;


$logger = Apf_Logger_LoggerFactory::getLogger('joblauncher');

$runnerClass = $opts['class'];
// print_r($runnerClass);exit;
if(empty($runnerClass)) {
    $logger->info("Use php bin/launcher.php --class=User_Job_Demo --xx=yy --xx=yy");
    exit(1);
}
if(! class_exists($runnerClass)) {
    exit("$runnerClass is not exists\n");
}

$logger->info("$runnerClass start to running");

$runner = new $runnerClass();
$runner->run();

$logger->info("$runnerClass run over");

