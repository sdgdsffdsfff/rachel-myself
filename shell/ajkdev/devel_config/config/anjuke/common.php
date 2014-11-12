<?php
$config['debug_allow_patterns'] = array(
    '/^127\.0\.0\./',
    '/^192\.168\./',
    '/^10\.0\./',
);


$config['anjuke_base_domain'] = DEV_NAME.".dev.anjuke.com";
$config['base_domain'] = DEV_NAME.".dev.anjuke.com";
$config['cookie_domain'] = 'dev.anjuke.com';
$config['user_center_base_domain'] = 'user.'.DEV_NAME.'.dev.anjuke.com';//用户中心

//新房
$config['xinfang_base_domain'] = DEV_NAME.'.fang.dev.anjuke.com';
//租房
$config['zu_base_domain'] = DEV_NAME.'.zu.dev.anjuke.com';
//写字楼
$config['xzl_base_domain'] = DEV_NAME.'.xzl.dev.anjuke.com';
//商铺
$config['sp_base_domain'] = DEV_NAME.'.sp.dev.anjuke.com';
//好租分词
$config['scws_url'] = "http://10.10.3.46:8999/seg/pkuseg";
//$config['scws_url'] = "http://10.11.6.28:8999/seg/pkuseg";


//$config['fenci_url'] = 'http://shanghai.anjuke.com/fenci/';
$config['fenci_url'] = '';

$config['image_server_base_domain'] = "anjukestatic.com";

    $config['JavaAPIHost'] = "http://10.20.6.102:8080/";

//pad web 灰度发布比例
$config['map_point'] = 1;

$config['JavaAPIHost'] = "http://java-api.a.ajkdns.com:8080/";

$config['api_member_domain'] = "member." . DEV_NAME . ".dev.anjuke.com";
$config['performance_is_allow'] = 0; 
$config['performance_rate'] = 100; 
$config['aifang_home'] = array(
    'client' => array('tcp://192.168.1.169:9227')
);

