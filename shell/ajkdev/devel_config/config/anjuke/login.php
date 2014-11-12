<?php
$config['member_key'] = array (
    'modbbs' => 'ajk123456',
    'aifang' => 'ajk123456',
    //'aifang-vip' => 'ajk123456',
    'bbscp' => 'ajk123456',
    'anjuke-bbs' => 'ajk123456',
    'haozu' => 'ajk123456',
    'self' => 'member_ajk_key',
    'forum' => 'ajk123456',
    'anjuke' => 'ajk123456',
    'mobile' => 'ajk123456',
    'jinpu' => 'ajk123456',
);
$config['sid_all'] = array('modbbs','bbscp','anjuke-bbs','aifang','haozu','self','anjuke','forum','mobile','jinpu', /*'aifang-vip'*/);
$config['member_sitename'] = array(
    'modbbs'=> 'base forum',
    'bbscp'=> 'base forum manage',
    'aifang'=>'爱房网',
    'haozu'=>'好租',
    'self'=>'会员中心',
    'mobile'=>'手机平台',
    'jinpu'=>'金铺网',
);
$config['uc_url'] = 'http://member.'.DEV_NAME.'.dev.anjuke.com';

$config['uc_login_url'] = $config['uc_url'].'/login';
$config['uc_verify_url'] = $config['uc_url'].'/verify';
$config['uc_logout_url'] = $config['uc_url'].'/logout';
// $config['uc_register_url'] = $config['uc_url'].'/register';
$config['uc_register_url'] = $config['uc_url'].'/register/new/';
$config['uc_edit_basic_url'] = $config['uc_url'].'/info/basic';
$config['ext_login_redirect_url'] = "http://my.{DEV_NAME}.dev.anjuke.com/member/modify/info/";
$config['member_verify'] = array(
    //'modbbs'=>'http://modbbs.anjuke.com/verify',
    //'bbscp'=>'http://bbscp.anjuke.com/group/verify',
    //'aifang'=>'http://www.aifang.com/aifang/web/user/verify',
    //'aifang-vip'=>'http://vip.aifang.com/aifang/login',
    'haozu'=> "http://www.{DEV_NAME}.dev.haozu.com/verify",
    #    'anjuke-bbs'=>'http://my.anjuke.com/v2/user/verify',
    'anjuke'=>"http://my.{DEV_NAME}.dev.anjuke.com/user/verify",
    'jinpu'=>"http://my.{DEV_NAME}.dev.jinpu.com/verify",
);

$config['member_logout'] = array(
    //'modbbs'=>'http://modbbs.anjuke.com/logout',
    //'bbscp'=>'http://bbscp.anjuke.com/group/logout',
    'haozu' => "http://www.{DEV_NAME}.haozu.com/logout",
    //'aifang'=>'http://www.aifang.com/aifang/web/user/logout',
    //'aifang-vip'=>'http://vip.aifang.com/aifang/login',
    #    'anjuke-bbs'=>'/v2/logout',
    'anjuke' => '/logout',
    //'forum'=>'/v2/logout',
    'jinpu' => '/logout',
);

/*** nlogger 记录登录注册统计数据*/
$config['tag_name'] = "anjuke.test_register_login";

