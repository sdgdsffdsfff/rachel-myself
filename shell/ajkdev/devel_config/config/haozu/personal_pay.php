<?php
/**
 * 个人支付试点项目 相关配置
 * @ticket http://projects.dev.anjuke.com/trac/sites/ticket/8367
 * @author lizhiyong <zhiyongli@anjuke.com>
 * @copyright ANJUKE Inc.
 *
 * edit by lisum @2011_08_25试点上海，杭州
 * edit by lisum @2011_09_07开通所有城市
 * edit by lisum @2011_09_20北京必须付费
 */

apf_require_class('Const_MultiCity');

//试点开通的城市
$config['personal_pay']['open_city'] = array(
    //Const_MultiCity::CITY_ID_SHANGHAI,
    Const_MultiCity::CITY_ID_BEIJING,
    Const_MultiCity::CITY_ID_GUANGZHOU,
    Const_MultiCity::CITY_ID_SHENZHEN,
    Const_MultiCity::CITY_ID_CHENGDU,
    Const_MultiCity::CITY_ID_NANJING,
    Const_MultiCity::CITY_ID_TIANJIN,
    Const_MultiCity::CITY_ID_HANGZHOU,
    Const_MultiCity::CITY_ID_SUZHOU,
    Const_MultiCity::CITY_ID_CHONGQING,
    Const_MultiCity::CITY_ID_DALIAN,
    Const_MultiCity::CITY_ID_WUHAN,
    Const_MultiCity::CITY_ID_JINAN,
    Const_MultiCity::CITY_ID_FOSHAN,
    Const_MultiCity::CITY_ID_WUXI,
    Const_MultiCity::CITY_ID_ZHENGZHOU,
    Const_MultiCity::CITY_ID_CHANGSHA,
    Const_MultiCity::CITY_ID_SHIJIAZHUANG,
    Const_MultiCity::CITY_ID_QINGDAO,
    Const_MultiCity::CITY_ID_XIAN,
    Const_MultiCity::CITY_ID_NINGBO,
    Const_MultiCity::CITY_ID_HEFEI,
    Const_MultiCity::CITY_ID_DONGGUAN,
    Const_MultiCity::CITY_ID_FUZHOU,
    Const_MultiCity::CITY_ID_KUNMING,
    Const_MultiCity::CITY_ID_GUIYANG,
    Const_MultiCity::CITY_ID_TAIYUAN,
    Const_MultiCity::CITY_ID_SHENYANG,
    Const_MultiCity::CITY_ID_KUNSHAN,

    Const_MultiCity::CITY_ID_ZHUHAI,
    Const_MultiCity::CITY_ID_CHANGZHOU,
    Const_MultiCity::CITY_ID_ZHONGSHAN,
    Const_MultiCity::CITY_ID_JIAXING,
    Const_MultiCity::CITY_ID_XIAMEN,
    Const_MultiCity::CITY_ID_YANTAI,
    Const_MultiCity::CITY_ID_HAERBIN,
    Const_MultiCity::CITY_ID_HAIKOU,
    Const_MultiCity::CITY_ID_SANYA,
    Const_MultiCity::CITY_ID_HUIZHOU,
    Const_MultiCity::CITY_ID_BAODING,
    Const_MultiCity::CITY_ID_GUILIN,
    Const_MultiCity::CITY_ID_HANDAN,
    Const_MultiCity::CITY_ID_HUHEHAOTE,
    Const_MultiCity::CITY_ID_JILIN,
    Const_MultiCity::CITY_ID_LANZHOU,
    Const_MultiCity::CITY_ID_LANGFANG,
    Const_MultiCity::CITY_ID_LUOYANG,
    Const_MultiCity::CITY_ID_MIANYANG,
    Const_MultiCity::CITY_ID_NANNING,
    Const_MultiCity::CITY_ID_NANTONG,
    Const_MultiCity::CITY_ID_QINHUANGDAO,
    Const_MultiCity::CITY_ID_QUANZHOU,
    Const_MultiCity::CITY_ID_SHAOXING,
    Const_MultiCity::CITY_ID_TAIZHOU,
    Const_MultiCity::CITY_ID_TANGSHAN,
    Const_MultiCity::CITY_ID_WEIHAI,
    Const_MultiCity::CITY_ID_WEIFANG,
    Const_MultiCity::CITY_ID_XUZHOU,
    Const_MultiCity::CITY_ID_YANGZHOU,
    Const_MultiCity::CITY_ID_YICHANG,
    Const_MultiCity::CITY_ID_YINCHUAN,
    Const_MultiCity::CITY_ID_ZHENJIANG
);

//必须付费的城市
$config['personal_pay']['hastopay'] = array(

);
//调价城市
$config['personal_pay']['testprice'] = array(

);
//3种套餐
$config['personal_pay']['service'] = array(
    'gong'=>array(
        'name'    => '包租公卡',
        'price'   => 30,
        'promise' => 10
    ),
    'po'=>array(
        'name'    => '包租卡',
        'price'   => 0.01,
        'promise' => 20
    ),
    'gong1'=>array(
        'name'    => '包租公卡',
        'price'   => 20,
        'promise' => 10
    ),
    'po1'=>array(
        'name'    => '包租婆卡',
        'price'   => 30,
        'promise' => 20
    ),
    'zeng'=>array(
        'name'    => '增值服务',
        'price'   => 50,
        'promise' => 20
    )
);
//支付宝银行列表
$config['personal_pay']['ali']   = array (
        'zgjsyh' => array(
        'name' => '中国建设银行',
        'logo' => 'zgjsyh.gif',
        'id' => 'CCB'
    ),
    'zggsyh' => array(
        'name' => '中国工商银行',
        'logo' => 'zggsyh.gif',
        'id' => 'ICBCB2C'
    ),
    'zsyh' => array(
        'name' => '招商银行',
        'logo' => 'zsyh.gif',
        'id' => 'CMB'
    ),
    'xyyh' => array(
        'name' => '兴业银行',
        'logo' => 'xyyh.gif',
        'id' => 'CIB'
    ),
    'gdfzyh' => array(
        'name' => '广东发展银行',
        'logo' => 'gdfzyh.gif',
        'id' => 'GDB'
    ),
    'jtyh' => array(
        'name' => '交通银行',
        'logo' => 'jtyh.gif',
        'id' => 'COMM'
    ),
    'szfzyh' => array(
        'name' => '深圳发展银行',
        'logo' => 'szfzyh.gif',
        'id' => 'SDB'
    ),
    'zggdyh' => array(
        'name' => '中国光大银行',
        'logo' => 'zggdyh.gif',
        'id' => 'CEBBANK'
    ),
    'zgmsyh' => array(
        'name' => '中国民生银行',
        'logo' => 'zgmsyh.gif',
        'id' => 'CMBC'
    ),
    'pfyh' => array(
        'name' => '上海浦东发展银行',
        'logo' => 'pfyh.gif',
        'id' => 'SPDB'
    ),
    'pingan'=> array(
        'name' => "平安银行",
        'logo' => 'pingan.gif',
        'id'   => "SPABANK"
    ),
    'zxyh'  => array(
        'name' => "中信银行",
        'logo' => 'zxyh.gif',
        'id'   =>  "CITIC"
    ),
    'nyyh'  => array(
        'name' => "中国农业银行",
        'logo' => 'nyyh.gif',
        'id'   => "ABC"
    ),
    'shanghai' => array(
        'name' => "上海银行",
        'logo' => "shanghai.gif",
        'id'   => "SHBANK"
    )
);
$config['personal_pay']['alipay'] = array(
    'ICBCB2C'       => '中国工商银行',
    'CMB'           => '招商银行',
    'CCB'           => '中国建设银行',
    //'BOCB2C'        => '中国银行',
    'ABC'           => '中国农业银行',
    'COMM'          => '交通银行',
    'CEBBANK'       => '中国光大银行',
    'SPDB'          => '上海浦东发展银行',
    'GDB'           => '广东发展银行',
    'CITIC'         => '中信银行',
    'CIB'           => '兴业银行',
    'SDB'           => '深圳发展银行',
    'CMBC'          => '中国民生银行',
    'HZCBB2C'       => '杭州银行',
    'SHBANK'        => '上海银行',
    'BJRCB'         => '北京农村商业银行',
    'SPABANK'       => '平安银行',
    'fdb101'        => '富滇银行',
    'NBBANK'        => '宁波银行'
    //'ICBCBTB'       => '中国工商银行(B2B)',
    //'CCBBTB'        => '中国建设银行(B2B)',
    //'ABCBTB'        => '中国农业银行(B2B)',
    //'SPDBB2B'       => '上海浦东发展银行(B2B)'
);
// 快钱银行支付 禁止修改
$config['personal_pay']['billpay'] = array(
    'zgjsyh' => array(
        'name' => '中国建设银行',
        'logo' => 'zgjsyh.gif',
        'limit' => '非签约用户单笔限额5000元，日累计10000元；文件证书用户单笔10000元，日累计30000元',
        'id' => 'CCB'
    ),
    'zggsyh' => array(
        'name' => '中国工商银行',
        'logo' => 'zggsyh.gif',
        'limit' => '通过网上自助注册开通即可支付，每日单笔限额20000元，日累计限额20000元',
        'id' => 'ICBC'
    ),
    'zsyh' => array(
        'name' => '招商银行',
        'logo' => 'zsyh.gif',
        'limit' => '大众版单笔限额和日限额为5000元；专业版无限额',
        'id' => 'CMB'
    ),
    'xyyh' => array(
        'name' => '兴业银行',
        'logo' => 'xyyh.gif',
        'limit' => '单笔限额20000元，信用卡不过自身限额',
        'id' => 'CIB'
    ),
    'gdfzyh' => array(
        'name' => '广东发展银行',
        'logo' => 'gdfzyh.gif',
        'limit' => '仅限证书版，单笔限额5000元，日累计无限额',
        'id' => 'GDB'
    ),
    'jtyh' => array(
        'name' => '交通银行',
        'logo' => 'jtyh.gif',
        'limit' => '借记卡：手机动态密码用户单笔和日累计均为5000元',
        'id' => 'BCOM'
    ),
    'szfzyh' => array(
        'name' => '深圳发展银行',
        'logo' => 'szfzyh.gif',
        'limit' => '仅限借记卡，动态口令刮刮卡日累计限额5000元',
        'id' => 'SDB'
    ),
    'zggdyh' => array(
        'name' => '中国光大银行',
        'logo' => 'zggdyh.gif',
        'limit' => '动态密码、证书客户单笔每日限额5000元，信用卡不超过自身额度',
        'id' => 'CEB'
    ),
    'bjyh' => array(
        'name' => '北京银行',
        'logo' => 'bjyh.gif',
        'limit' => '仅限网银专业版用户，单笔限额10000元',
        'id' => 'BOB'
    ),
//  'njyh' => array(
//      'name' => '南京银行',
//      'logo' => 'njyh.gif',
//      'limit' => '仅限借记卡，单笔限额10000元',
//      'id' => 'NJCB'
//  ),
    'zgyh' => array(
        'name' => '中国银行',
        'logo' => 'zgyh.gif',
        'limit' => '仅限网银签约用户，单笔5000元',
        'id' => 'BOC'
    ),
    'zgmsyh' => array(
        'name' => '中国民生银行',
        'logo' => 'zgmsyh.gif',
        'limit' => '仅限贵宾版网银，单笔限额5000元',
        'id' => 'CMBC'
    ),
    'hxyh' => array(
        'name' => '华夏银行',
        'logo' => 'hxyh.gif',
        'limit' => '仅限借记卡，单笔限额5000元',
        'id' => 'HXB'
    ),
    'pfyh' => array(
        'name' => '上海浦东发展银行',
        'logo' => 'pfyh.gif',
        'limit' => '仅限借记卡，无限额',
        'id' => 'SPDB'
    )
);
//发房白名单
$config['personal_pay']['white_list'] = array(
    "13764855833",
    "15921950498",
    "13701876618"
);

//新的个人付费开通的城市 与租房管家一致
//推广计划
$config['personal_pay']['promo_open_city'] = array(
    Const_MultiCity::CITY_ID_SHANGHAI
);


$config['personal_pay']['promo_service'] = array(
1 => array(
    'days' => 3,        //推广天数
    'saleprice' => 0.01,    //销售价格
    'is_default' => true,    //是否默认选中
    'realprice' => 30,    //原价
    'level'=>1
 ),
2 => array(
    'days' => 7,
    'saleprice' => 60,
    'is_default' => false,
    'realprice' => 70,
    'level'=>1
 ),
3 => array(
    'days' => 10,
    'saleprice' => 80,
    'is_default' => false,
    'realprice' => 100,
    'level'=>1
 ),
4 => array(
    'days' => 7,
    'saleprice' => 0.01,
    'is_default' => true,
    'realprice' => 210,
    'level'=>2
 ),
5 => array(
    'days' => 10,
    'saleprice' => 200,
    'is_default' => false,
    'realprice' => 300,
    'level'=>2
 ),
6 => array(
    'days' => 15,
    'saleprice' => 260,
    'is_default' => false,
    'realprice' => 450,
    'level'=>2
 )
);
//城市个人付费对应的价格分界线
$config['personal_pay']['city_division'] = array(
    Const_MultiCity::CITY_ID_SHANGHAI => 8000
);

$config['personal_pay']['promo_level'] = array(
    Const_MultiCity::CITY_ID_SHANGHAI=>array(//上海的付费级别
        1 => array(	//8000以下的推广计划
             1,2,3
        ),
        2 => array(	//8000以上的推广计划
             4,5,6
        )
    )
);
?>
