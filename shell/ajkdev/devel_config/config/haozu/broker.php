<?php


/**
 * 好租经纪人配置页面
 */
apf_require_class('Const_MultiCity');

// 经纪人域名
$config['domain'] 			= "agent.".DEV_NAME.".dev.haozu.com";
$config['cookie_domain'] 	= "dev.anjuke.com";

// 经纪人cookie名称
$config['brokerCookieName'] = 'aQQ_Brokerauthinfos';

// 用户登录时间判断
$config['cookieTime'] 		= 7200;

$config['PointName'] 		= "好币";

//字符串加密解密、解密串
$config['md5_str'] 			= "happy/^^HzBroker/^^";

$config['send_email'] = array(
    "smtp_id" 	=> "wesleyxu@anjuke.com",
    "smtp_pwd" 	=> "123456789",
    "host" 		=> "192.168.0.96",
    "port" 		=> 25
);

$config['brokerCard'] 		= 'aQQ_haozuBrokerCard';
$config['bankCard']			= 'aQQ_haozuBrokerBank';

// 支付跳转接收时间在6小时内
$config['payIntervalTime']	= 21600;

// 最多可以支付3w
$config['payAllMoney']		= 10000;

// 发布房源的好币
$config['propPrice'] 		= 10;

// 草稿箱最大条数
$config['outlineMax'] 		= 100;

// mfs上传
$config['dfs']['upload_url'] 		= "http://upd1.anjuke.com/upload";
$config['dfs']['display_host'] 		= "pic";
$config['dfs']['display_domain'] 	= "ajkimg.com";
