<?php

$config['member_key'] = 'ajk123456';
$config['member_key'] = array (
    'modbbs'=>'ajk123456',
    'aifang' => 'ajk123456',
    'bbscp' => 'ajk123456',
    'anjuke-bbs' => 'ajk123456',
    'haozu' => 'ajk123456',
    'self' => 'ajk123456',
    'forum' => 'ajk123456',
    'anjuke' => 'ajk123456',
    'mobile' => 'ajk123456',
    'jinpu' => 'ajk123456',
);
$config['sid_all'] = array('modbbs','aifang','bbscp','anjuke-bbs','haozu','self','forum','anjuke','mobile','jinpu');

$config['member_sitename'] = array(
    'modbbs'=>'基础论坛',
    'bbscp'=>'论坛管理中心',
    'aifang'=>'爱房网',
    'anjuke-bbs'=>'安居客论坛',
    'haozu'=>'好租',
    'anjuke'=>'安居客',
    'self'=>'会员中心',
    'mobile'=>'手机平台',
    'jinpu'=>'金铺',
);

//$config['uc_url'] = 'http://member.fp100.dev.anjuke.com';
$config['uc_url'] = 'http://member.kakiezhang.dev.anjuke.com';

$config['uc_login_url'] = $config['uc_url'].'/login';

$config['uc_verify_url'] = $config['uc_url'].'/verify';

$config['uc_logout_url'] = $config['uc_url'].'/logout';

$config['uc_extregister_url'] = $config['uc_url'].'/extlogin';

$config['uc_register_url'] = $config['uc_url'].'/register';

$config['uc_edit_basic_url'] = $config['uc_url'].'/info/basic';

$config['ext_login_redirect_url'] = "http://my.anjuke.com/member/modify/info/";

$config['user_center_base_domain'] = 'user.anjuke.com';

$config['member_verify'] = array(
    'modbbs'=>'/verify',
    'bbscp'=>'/verify',
    'aifang'=>'/aifang/web/user/verify',
    // 'anjuke'=>'/v2/user/verify',
    'anjuke'=>'/user/verify',
    'haozu'=>'/verify',
    'jinpu'=>'/verify',
    'anjuke-bbs'=>'/pm/pm.php',
);

$config['member_logout'] = array(
    'modbbs'=>'/logout',
    'bbscp'=>'/logout',
    'aifang'=>'/aifang/web/user/logout',
    'anjuke-bbs'=>'/v2/logout',
    'anjuke'=>'/v2/logout',
    'forum'=>'/v2/logout',
    'haozu'=>'/logout',
    'jinpu'=>'/logout',
);

/*** nlogger 记录登录注册统计数据*/
$config['tag_name'] = "register_login";
$config['page_type'] = array(
    "register"=>"register",//注册页面
    "login"=>"login",//登录页面
    "fastlogin"=>"fastlogin",//快速登录层
    "mobile"=>"mobile"//移动
);
$config['login_type'] = array(
    "anjuke"=>"anjuke",
    "aifang"=>"aifang",
    "haozu"=>"haozu",
    "jinpu"=>"jinpu",
    "weibo"=>"weibo",
    "qq"=>"qq"
);
$config['type'] = array(
    "register"=>"register",//邮箱发送ajax验证请求,邮箱发注册创建用户成功后
    "login"=>"login",//邮箱发直接登录成功
    "registerlogin"=>"registerlogin",//邮箱发注册后登录
    "phoneregister"=>"phoneregister",//手机发送ajax验证请求,手机发注册创建用户成功后
    "phonelogin"=>"phonelogin",//手机发直接登录成功
    "phoneregisterlogin"=>"phoneregisterlogin",//手机发注册后登录
    "extlogin"=>"extlogin",//点击进入第三方登录跳转前,第三方登录成功
    "extregister"=>"extregister",//第三方需注册，注册成功
    "extregisterlogin"=>"extregisterlogin"//第三方注册成功，并登录，
);
$config['mobole_url'] = "http://m.anjuke.com";//手机端第三方登录，来源地址

//用户注册来源(39)
$config['register_from'] = array(
    'Site_XF_Price_LP','Site_XF_Price_FP','Site_XF_Price_Info','Site_XF_MP_LP','Site_XF_MP_FP','Site_XF_Register_LP','Site_XF_Register_LL','Site_XF_Register_FP','Site_XF_Register_FL',
    'Site_ESF_MP_FP','Site_ESF_Price_LP','Site_ESF_Price_FP','Site_ESF_HouseInfo_FP','Site_ESF_HouseInfo_LP','Site_ESF_Register_FL','Site_ESF_Register_LL','Site_ESF_Register_FP','Site_ESF_Register_LP',
    'Site_Rent_MP_FP','Site_Rent_RSS_LP','Site_Rent_Register_FL','Site_Rent_Register_LL','Site_Rent_Register_FP','Site_Rent_Register_LP',
    'Site_SP_Register_BL','Site_SP_Register_BP','Site_SP_Register_RL','Site_SP_Register_RP','Site_SP_Register_PL','Site_SP_Register_PP',
    'Site_XZL_Register_BL','Site_XZL_Register_BP','Site_XZL_Register_RL','Site_XZL_Register_RP','Site_XZL_Register_LL','Site_XZL_Register_LP',
    'Site_Index_Register_ALL','Site_QA_Register_ALL','Site_Other'
);

