<?php
$config['minify_js'] = false;
$config['enabled_auto_router'] = false;
$config['base_domain'] = DEV_NAME.'.'.SUB_DOMAIN.'.dev.anjuke.com';
$config['xzl_domain'] = DEV_NAME.'.xzl.dev.anjuke.com';
$config['sp_domain'] = DEV_NAME.'.sp.dev.anjuke.com';
$config['cookie_domain'] = 'dev.anjuke.com';
$config['disable_obj_cache'] = true;

$config['enabled_auto_route'] = false;

$config['image_server_base_domain'] = "anjukestatic.com";


$config['display_error'] = true;
$config['error_handler'] = 'jinpu_error_handler';
$config['exception_handler'] = 'jinpu_exception_handler';

$config['anjuke_passport_memberapi']      = 'http://member.fp100.dev.anjuke.com/memberapi/';
$config['anjuke_passport'] 	              = 'http://member.fp100.dev.anjuke.com/';
$config['anjuke_member_password_first']   = 'http://member.fp100.dev.anjuke.com/lost/first';
$config['member_login_url'] = 'http://member.fp100.dev.anjuke.com/login';
$config['member_reg_url'] = 'http://member.fp100.dev.anjuke.com/register';

//支付中心
$config['payment_center_api'] = 'http://acenter.anjuke.test/acenter/interfaces/';
$config['payment_center_recharge'] = 'http://my.release.anjuke.test/acenter/account/';



define('IN_OFFICE',false);
$config['aa_js']['test'] = null;
$config['server_tokens'] = 'test';
$config['anjuke_nav_info'] = "http://www.".DEV_NAME.".dev.anjuke.com/api/nav/";
$config['ajk_api_url'] = DEV_NAME.'.'.SUB_DOMAIN.'.dev.anjuke.com/ajax/member/center/api/';
$config['user_center_base_domain'] = 'user.'.DEV_NAME.'.dev.anjuke.com';

$config['anjuke_test_domain'] = DEV_NAME.'.dev.anjuke.com';

$config['font_file'] = BASE_PATH.'fonts/simsun.ttc';
$config['font_file_chn'] = BASE_PATH.'fonts/msyh.ttf';
$config['font_file_en'] = BASE_PATH.'fonts/arial.ttf';

