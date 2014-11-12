<?php
/**
 * 安居客_用户中心_通用配置文件
 *
 * @author Will Shaw
 * @package member
 * @version 0.1
 */
$config['charset'] = 'utf-8';
$config['minify_html'] = false;
$config['minify_js'] = false;
$config['enabled_auto_router'] = true;
$config['cookie_timeout'] = 31536000;//秒 24*3600*365=31536000
$config['exper_time'] = 31536000;//秒 3600*24*365=31536000
$config['cookie_domain'] = LOAD_PATH . ".dev.anjuke.com";

// 修改密码key
$config['modify_password_signkey'] = "46b5742601ef99db4da653dd3f332bf3";

// 控制用户注册的参数，显示验证码的条件
$config['user_restrict_level1'] = 50000;

// 同一个客户端一天注册用户总数限制，显示验证码的条件
$config['user_restrict_level3'] = 5;

//may be change
//$config['base_domain'] = 'http://shanghai.fp100.dev.anjuke.com';
$config['base_domain'] = "http://member." . LOAD_PATH . ".dev.anjuke.com";
$config['forget_pwd'] = $config['base_domain']."/lost/first";
$config['member_reg'] = $config['base_domain'].'/register';

// 关键词地址
$config['multi_string_search_host'] = array(
        'tcp://192.168.1.97:6000',
        );

$config['aifang_index'] = 'http://shanghai.aifang.com';
$config['aifang_sitename'] = '爱房网';
$config['haozu_sitename'] = '好租';
$config['anjuke_sitename'] = '安居客';
$config['jinpu_sitename'] = '金铺';

//2.0
$config['service_term'] = 'http://shanghai.aifang.com/privacy/';
$config['register_page_login'] = '/login';

$config['SmtpServer']  = "smtp.corpease.net";
$config['SmtpServerPort']  = 25;
$config['SmtpUser']  = "noreply@dm.anjuke.com";
$config['SmtpPass']  = "ajk0805";

$config['anjuke_index_page'] = 'http://www.anjuke.com';
$config['aifang_index_page'] = 'http://www.aifang.com';
$config['haozu_index_page'] = 'http://www.haozu.com';
$config['jinpu_index_page'] = 'http://www.jinpu.com';

$config['img_server'] = 'http://pic.host.dfs.dev.anjuke.com';
$config['upd_server'] = 'http://upd1.dfs.dev.anjuke.com/upload';
//$config['upd_server'] = $config['base_domain']."/info/upload";
$config['error_handler'] = 'apf_error_handler';
$config['display_error'] = false;


$config['extlogin_callback'] = 'http://member.' . LOAD_PATH . '.dev.anjuke.com/extcallback/';
$config['qq_app_id']='100359945';
$config['qq_app_key']='9d0984e2ea414e9ef993531e55f2175b';
$config['weibo_app_key']='2084121680';
$config['weibo_app_sercet']='eb0605ff2ea63a019b34eac464de5ca4';
$config['renren_api_key']='e2bb76d2b5be4f3a86a09533ca0ae5f6';
$config['renren_secret_key']='f568c5fbbdfa40159aacafb9b3019739';
$config['FontsUrl']="/usr/share/fonts/truetype/msfonts/msyh.ttf";
$config['image_server_domain'] = "images";
$config['image_server_base_domain'] = "qa.anjukestatic.com";
$config['imageprefix'] = "http://images.anjukestatic.com/";

$config['pic_server_domain'] = "pic";
$config['pic_server_base_domain'] = "dfs.dev.anjuke.com";
$config['domain_channel']=array(
        "anjuke.com",
        "haozu.com",
        "jinpu.com"
        );
$config['debug_allow_patterns'] = array(
        '/^127\.0\.0\./',
        '/^192\.168\.1\./',
        '/^10\.0\.0\./',
        '/^222\.66\.14\.14$/',
        '/^116\.228\.192\.34$/',
        '/^192\.168\.20\./',
        '/^192\.168\.201\./',
        '/^221\.133\.228\.74$/',
        '/^116\.66\.37\.130$/'
        );

$config["broker_service"] = "http://192.168.201.190:8080/service-internal/rest/brokers/";
$config['api_key'] = array(
        "ef7545201a2bc5911cdb43527b18b8c1"=>"79921bd362e7da67",//test
        );

$config['invalid_words'] = array(
        '共产党',
        '毛主席',
        '俞正声',
        '韩正',
        '殷一璀',
        '董君舒',
        '杨雄',
        '屠光绍',
        '唐登杰',
        '胡延照',
        '艾宝俊',
        '沈骏',
        '沈晓明',
        '赵雯',
        '刘云耕',
        '周慕尧',
        '包信宝',
        '刘伦贤',
        '厉无畏',
        '任文燕',
        '张圣坤',
        '朱晓明',
        '陈豪',
        '胡炜',
        '王培生',
        '周禹鹏',
        '冯国勤',
        '朱晓明',
        '周太彤',
        '王新奎',
        '李良园',
        '钱景林',
        '吴幼英',
        '周汉民',
        '蔡威',
        '高小玫',
        );
/*** nlogger 记录访问用户详细接口的ip */
$config['userInfo_api_ip'] = "userInfo_api_ip";
/**订阅用户注册密钥**/
$config['userSubscribeRegisterLogin'] = "subscsjo59fappu34pasdf";

//新房
$config['xinfang_base_domain'] = 'fang.anjuke.com';
//租房
$config['zu_base_domain'] = 'zu.anjuke.com';
//写字楼
$config['xzl_base_domain'] = 'xzl.anjuke.com';
//商铺
$config['sp_base_domain'] = 'sp.anjuke.com';
//二手房
$config['anjuke_base_domain'] = 'anjuke.com';

