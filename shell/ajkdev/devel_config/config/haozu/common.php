<?php


$config['charset'] = 'utf-8';
$config['minify_html'] = false;
$config['minify_js'] = false;

$config['static_domain'] = "static.haozu.com";
$config['base_domain'] = DEV_NAME.".zu.dev.anjuke.com";
$config['anjuke_base_domain'] = DEV_NAME.'.dev.anjuke.com';
$config['cookie_domain'] = "dev.anjuke.com";
$config['cookie_time']   = 1800;
$config['cookie_path'] = '/';
$config['user_center_base_domain'] = 'user.'.DEV_NAME.'.dev.anjuke.com';//用户中心

$config['bbs_home_index'] = "bbs.".DEV_NAME.".zu.dev.anjuke.com";
$config['bbs_base_domain'] = "bbs.".DEV_NAME.".zu.dev.anjuke.com";


$config['AnjukeSecques']  = "Xi7@Sz";
$config['ImpressionTracker']  = true;
$config['ClickTracker'] = false;

$config['display_error'] = true;
$config['debug_allow_patterns'] = array(
        '/^127\.0\.0\./',
        '/^192\.168\./',
        '/^10\.0\./',
);
$config['size_thumbnail']['width'] = 100;
$config['size_thumbnail']['height'] = 75;
$config['size_larger']['width'] = 420;
$config['size_larger']['height'] = 315;

$config['image_server_domain'] = "images";
$config['image_server_base_domain'] = "qa.haozustatic.com";

$config['daoPropViewClass'] = 'DAO_Prop_PropertyMemcache';
$config['daoAreaClass'] = 'DAO_Area_AreaMemcache';
$config['daoCommunityMemcacheClass'] = 'DAO_Community_CommunityMemcache';

$config['getCommunityUrl'] = 'http://www.anjuke.com';
$config['propDueto'] = 15;
$config['send_message_key']   = '10';
$config['LogKWPath']   = '/home/ch98/kw.txt';

$config['autocomplete'] = 1;
$config['autosearchQueryUrl'] = 'http://10.0.0.130:8983/search-suggestion/select?';

$config['haozu_member_label'] = 'haozu';

$config['publishErrorLog'] = '/home/www/tmp/publishlog.txt';

//$config['dfs']['upload_url'] = "http://upd1.dfs.dev.anjuke.com/upload";
//$config['dfs']['display_host'] = "pic";
//$config['dfs']['display_domain'] = "dfs.dev.anjuke.com";

$config['MemberCookieName'] = "aQQ_Memberauthinfos";
$config['MemberSecques']  = "hz@b5b8s";
$config['MemLastUserCookieName'] = "aQQ_Memberlastuser";

$config['allow_mobile'] = array('13817516665','13916672794','13524644183','13052285329', '18701926684');
//$config['list_comm_solr'] = 'http://10.0.1.145:8998/community/select?';
$config['list_comm_solr'] = 'http://vip10-001.a.ajkdns.com:8998/community/select?fl=';

$config['global_city_id'] = 10;//全部城市对应ID

$config['beijing_promotion_proids'] = array(38400881,40075722,35259397,39783071,35111855,40074707,39924455,38698004,37061270,36903322,38868813,35843195,40074381,34881542,40064374,35290693,35290206,39812493,37727042,37060343);//北京推广页房源id

// 过滤非法关键字
$config['filter_keyword'] = "http://java01-002.a.ajkdns.com:8080/service-keywords-release/rest/keyword/listKeywordsByGroupId/";

// 400开通城市
$config['transfer_cities'] = array(11, 14);

// 是否打开转接服务
$config['is_transfer'] = 1;
$config['performance_is_allow'] = true;

// 是否开启列表关键字查找 拆字服务
$config['is_mmseg'] = false;
$config['home_login_version'] = 2;
//好租租金趋势字体
$config['trend_en_font_url']  = BASE_PATH."fonts/arial.ttf";
$config['trend_cn_font_url'] = BASE_PATH."fonts/msyh.ttf";

$config['idc_proxy_domain'] = "http://my.haozu.com";
$config['FontsUrl'] = BASE_PATH.'fonts/simsun.ttf';

function see() {
    header('Conten-Type: text/html;charset=utf-8;');
    $cnt = func_num_args();
    $values = func_get_args();

    if ($cnt > 1) {
        foreach ($values as $k => $v) {
            see($v);
        }

        return;
    } else {
        $value = $values[0];
    }

    $echo = function ($value, $color, $type) {
                $len = '';

                if ($type === 'string') {
                    $len = '(' . mb_strlen($value, 'UTF-8') . ')';
                }

                echo '<font color="',
                $color,
                '" style="font-family: arial;word-wrap: break-word;word-break: normal;"><b>',
                $type,
                $len,
                '</b> : ',
                $value,
                '</font><br>';
            };

    switch (TRUE) {
        case is_string($value) :
            $echo($value, 'red', 'string');
            break;

        case is_float($value) :
            $echo($value, 'BlueViolet', 'float');
            break;

        case is_int($value) :
            $echo($value, 'blue', 'int');
            break;

        case is_null($value) :
            $echo('null', 'Coral ', 'null');
            break;

        case is_bool($value) :
            $v = ($value) ? 'TRUE' : 'FALSE';
            $echo($v, 'green', 'bool');
            break;

        case is_array($value) :
            echo '<b style="font-family:arial">array</b>(', count($value), ')<div style="margin:10px 20px;font-family:arial">';

            foreach ($value as $kk => $vv) {
                echo '<font color="#555">', $kk, '</font> => ', see($vv);
            }

            echo '</div>';
            break;

        default :
            echo "<pre>";
            var_export($value);
            echo "</pre>";
            break;
    }
}
if(!defined('APP_ENV')){
    define('APP_ENV','online');
}
//导航
//$config['header_nav_api'] = 'http://shanghai.rayliu.dev.anjuke.com/api/nav/?cityId=';
$config['header_nav_api'] = 'http://www.'.DEV_NAME.'.dev.anjuke.com/api/nav/?cityId=';
//用户中心
//$config['ajk_api_url'] = 'rayliu.dev.anjuke.com/ajax/member/center/api/';
$config['ajk_api_url'] = DEV_NAME.'.dev.anjuke.com/ajax/member/center/api/';
//pad web 灰度发布比例
$config['ipad_point'] = 100;

$config['performance_is_allow'] = 0;
$config['performance_rate'] = 100;
