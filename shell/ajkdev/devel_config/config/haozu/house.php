<?php
//apf_require_class("Const_MultiCity");
// 付款类型
$config['paytype'] = array(
    "2" => "付3押1",
    "3" => "付1押1",
    "4" => "付2押1",
    "5" => "付1押2",
    "8" => "年付押1",// 8,9 只用于大连 西安 成都经纪人
    "9" => "半年付押1",
    "6" => "年付不押",
    "7" => "半年付不押",
    "1" => "面议",
);

//抓取房源付款类型
$config['spider_paytype'] = array(
    "2" => "押一付三",
    "3" => "押一付一",
    "4" => "押一付二",
    "5" => "押二付一",
    "6" => "年付不押",
    "7" => "半年付不押",
    "1" => "面议",
);
// 列表装修配置
$config['list_fit'] = array(
    "1" => "毛坯",
    "2" => "普通装修",
    "3" => "精装修",
    "4" => "豪华装修",
    "5"    => "其他"
);
// 装修
$config['fitment'] = array(
    "1" => "毛坯",
    "2" => "普通装修",
    "3" => "精装修",
    "4" => "豪华装修"
);
//朝向
$config['toward'] = array(
    "1" => "东",
    "2" => "南",
    "3" => "西",
    "4" => "北",
    "5" => "南北",
    "6" => "东西",
    "7" => "东南",
    "8" => "西南",
    "9" => "东北",
    "10"=> "西北",
    "11"=> "不知道朝向"
);
// 房屋配置
$config['deployment'] = array(
    "3" => "床",
    "4" => "电视",
    "6" => "空调",
    "5" => "冰箱",
    "9" => "洗衣机",
    "8" => "热水器",
    "1" => "宽带",
    //"2" => "电话",
    "11"=> "可做饭",
    "10"=> "独立卫生间",
    "7" => "阳台"
);


// 二房东房屋配置
$config['g_deployment'] = array(
    "wholerent"=>array(
        "1" => "床",
        "2" => "电视",
        "3" => "空调",
        "4" => "冰箱",
        "5" => "洗衣机",
        "6" => "热水器",
        "7" => "宽带"
        ),

    "sharerent"=>array(
        "1" => "床",
        "2" => "电视",
        "3" => "空调",
        "4" => "冰箱",
        "5" => "洗衣机",
        "6" => "热水器",
        "7" => "宽带",
        "8" => "可做饭",
        "9" => "独立卫生间",
        "10" => "阳台"
        )
);


// 好租中介
$config['b_deployment'] = array(
    //"1"    => '水',
    //"2"    => '电',
    //"3"    => '煤气',
    "4"        => '床',
    "9"        => '电视',
    "6"        => '空调',
    "10"    => '冰箱',
    "11"    => '洗衣机',
    "12"    => '热水器',
    "7"        => '宽带',
    //"5"        => '暖气',
    //"8"        => '有线电视',
    //'13'    => '微波炉',
    //'14'    => '电话',
    '15'    => '可做饭',
    '16'    => '独立卫生间',
    '17'    => '阳台'
);
// 卧室数量
$config['bedroom'] = array(
    "1" => "一室",
    "2" => "二室",
    "3" => "三室",
    "4" => "四室",
    "5" => "五室及以上"
);
// 租赁方式
$config['renttype'] = array(
    "1" => "整租",
    "2" => "合租"
);
// 来源
$config['source'] = array(
    1 => "置业顾问",
    2 => "个人"
);
// 发布时间
$config['postdate'] = array(
    "1" => "1天内",
    "3" => "3天内"
);
$config['ajk_postdate'] = array(
    "3" => "3天内",
    "7" => "7天内",
    "30" => "30天内"
);
$config['all_postdate'] = array(
    "1" => "1天内",
    "3" => "3天内",
    "7" => "7天内"
);


$config['bedroom_ajk'] = array(
    "1" => "一室",
    "2" => "二室",
    "3" => "三室",
    "4" => "四室",
    "5" => "五室以上"
);
// 合租方式
$config['sharetype'] = array(
    //"1" => "主卧",
    //"4" => "次卧",
    "5" => "单间",
    "3" => "隔断间",
    "2" => "床位"

);
// 合租类别
$config['sharesort'] = array(
    "1" => "主卧",
    "2" => "次卧",
    "3" => "隔断间"
);

// 合租类别
$config['g_sharesort'] = array(
    "1" => "单间",
    "2" => "床位",
    "3" => "隔断间"
);
// 合租性别
$config['sharesex'] = array(
    "0" => "男女不限",
    "1" => "限男生",
    "2" => "限女生"
);
// 合租年龄
$config['shareage'] = array(
    "0" => "年龄不限",
    "1" => "70后",
    "2" => "75后",
    "3" => "80后",
    "4" => "85后",
    "5" => "90后"
);
// 合租职业
$config['sharework'] = array(
    "0" => "职业不限",
    "1" => "学生",
    "2" => "白领",
    "3" => "自由职业者"
);
// 房东性别
$config['hostsex'] = array(
    1 => '男',
    2 => '女',
    3 => '保密'
);
// 房东星座
$config['hostconstellation'] = array(
    1  => '白羊座',
    2  => '金牛座',
    3  => '双子座',
    4  => '巨蟹座',
    5  => '狮子座',
    6  => '处女座',
    7  => '天枰座',
    8  => '天蝎座',
    9  => '射手座',
    10 => '摩羯座',
    11 => '水瓶座',
    12 => '双鱼座',
    13 => '保密'
);
// 房东年龄
$config['hostage'] = array(
    1 => '70后',
    2 => '75后',
    3 => '80后',
    4 => '85后',
    5 => '90后',
    6 => '保密'
);
// 房东职业
$config['hostwork'] = array(
    1 => '白领',
    2 => '学生',
    3 => '自由职业者',
    4 => '保密'
);
//已经入住人数－合租频道
$config['livenum'] = array(
    1 => '0',
    2 => '1',
    3 => '2',
    4 => '3',
    5 => '3个以上'
);

// 房屋类型
$config['protype'] = array(
    '1' => '公寓',
    '2' => '老公房',
    '3' => '新里洋房',
    '4' => '别墅',
    '5'    => '其他'
);
/**
 * 房屋类型 new
 *     '1' => '公寓',
    '2' => '老公房',
    '3' => '新里洋房',
    '4' => '别墅',
    '5'    => '其他'
    '6' => '酒店公寓',
    '7' => '四合院',
    '8' => '普通住宅'
 */
$config['housetype'] = array(
    0 => array(
        '1' => '公寓',
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_SHANGHAI => array(
        '1' => '公寓',
        '2' => '老公房',
        '3' => '新里洋房',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_BEIJING => array(
        '7' => '四合院',
        '1' => '公寓',
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_SHIJIAZHUANG => array(
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_SHENYANG => array(
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_QINGDAO => array(
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_CHANGSHA => array(
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_FUZHOU => array(
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_XIAN => array(
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_NINGBO => array(
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    ),
    Const_MultiCity::CITY_ID_KUNMING => array(
        '8' => '普通住宅',
        '4' => '别墅',
        '6' => '酒店公寓',
        '5'    => '其他'
    )
);
/**
 * 房屋类型新旧对应关系
 */
$config['housetype_mapping'] = array(
    0 => array(
        '2' => '8',
        '3' => '4'
    ),
    Const_MultiCity::CITY_ID_SHANGHAI => array(

    ),
    Const_MultiCity::CITY_ID_BEIJING => array(
        '2' => '8',
        '3' => '4'
    ),
    Const_MultiCity::CITY_ID_SHIJIAZHUANG => array(
        '1' => '8',
        '2' => '8',
        '3' => '4'
    ),
    Const_MultiCity::CITY_ID_SHENYANG => array(
        '1' => '8',
        '2' => '8',
        '3' => '4'
    ),
    Const_MultiCity::CITY_ID_QINGDAO => array(
        '1' => '8',
        '2' => '8',
        '3' => '4'
    ),
    Const_MultiCity::CITY_ID_CHANGSHA => array(
        '1' => '8',
        '2' => '8',
        '3' => '4'
    ),
    Const_MultiCity::CITY_ID_FUZHOU => array(
        '1' => '8',
        '2' => '8',
        '3' => '4'
    ),
    Const_MultiCity::CITY_ID_XIAN => array(
        '1' => '8',
        '2' => '8',
        '3' => '4'
    ),
    Const_MultiCity::CITY_ID_NINGBO => array(
        '1' => '8',
        '2' => '8',
        '3' => '4'
    ),
    Const_MultiCity::CITY_ID_KUNMING => array(
        '1' => '8',
        '2' => '8',
        '3' => '4'
    )
);
// 价格限制城市
$config['arrange_cityid'] = array(
    array(
        Const_MultiCity::CITY_ID_SHANGHAI,
        Const_MultiCity::CITY_ID_GUANGZHOU,
        Const_MultiCity::CITY_ID_SHENZHEN,
        Const_MultiCity::CITY_ID_BEIJING,
        Const_MultiCity::CITY_ID_HANGZHOU,
    ),
    array(
        Const_MultiCity::CITY_ID_CHENGDU,
        Const_MultiCity::CITY_ID_NANJING,
        Const_MultiCity::CITY_ID_TIANJIN,
        Const_MultiCity::CITY_ID_SUZHOU,
        Const_MultiCity::CITY_ID_CHONGQING,
        Const_MultiCity::CITY_ID_DALIAN,
        Const_MultiCity::CITY_ID_WUHAN,
        Const_MultiCity::CITY_ID_JINAN,
        Const_MultiCity::CITY_ID_FOSHAN,
        Const_MultiCity::CITY_ID_WUXI,
        Const_MultiCity::CITY_ID_ZHENGZHOU,
        Const_MultiCity::CITY_ID_QINGDAO,
        Const_MultiCity::CITY_ID_XIAN
    )
);

// 价格限制
$config['arrange_price'] = array(
    array(
        'lower' => 150,
        'upper' => 100000
    ),
    array(
        'lower' => 150,
        'upper' => 50000
    )
);

$config['ajk_fitment'] = array(
    Const_MultiCity::CITY_ID_SHANGHAI => array(
        "1" => "毛坯",
        "2" => "普通装修",
        "3" => "精装修",
        "4" => "豪华装修",
    ),
    Const_MultiCity::CITY_ID_GUANGZHOU => array(
        "15" => "毛坯",
        "16" => "普通装修",
        "17" => "精装修",
        "18" => "豪华装修",
        "19" => "其他"
    ),
    Const_MultiCity::CITY_ID_SHENZHEN => array(
        "10" => "毛坯",
        "11" => "普通装修",
        "12" => "精装修",
        "13" => "豪华装修",
        "14" => "其他"
    ),
    Const_MultiCity::CITY_ID_BEIJING => array(
        "5" => "毛坯",
        "6" => "普通装修",
        "7" => "精装修",
        "8" => "豪华装修",
        "9" => "其他"
    ),
    Const_MultiCity::CITY_ID_CHENGDU => array(
        "20" => "毛坯",
        "21" => "普通装修",
        "22" => "精装修",
        "23" => "豪华装修",
        "24" => "其他"
    ),
    Const_MultiCity::CITY_ID_NANJING => array(
        "25" => "毛坯",
        "26" => "普通装修",
        "27" => "精装修",
        "28" => "豪华装修",
        "29" => "其他"
    ),
    Const_MultiCity::CITY_ID_TIANJIN => array(
        "40" => "毛坯",
        "41" => "普通装修",
        "42" => "精装修",
        "43" => "豪华装修",
        "44" => "其他"
    ),
    Const_MultiCity::CITY_ID_HANGZHOU => array(
        "30" => "毛坯",
        "31" => "普通装修",
        "32" => "精装修",
        "33" => "豪华装修",
        "34" => "其他"
    ),
    Const_MultiCity::CITY_ID_SUZHOU => array(
        "35" => "毛坯",
        "36" => "普通装修",
        "37" => "精装修",
        "38" => "豪华装修",
        "39" => "其他"
    ),
    Const_MultiCity::CITY_ID_CHONGQING => array(
        "45" => "毛坯",
        "46" => "普通装修",
        "47" => "精装修",
        "48" => "豪华装修",
        "49" => "其他"
    ),
    Const_MultiCity::CITY_ID_DALIAN => array(
        "50" => "毛坯",
        "51" => "普通装修",
        "52" => "精装修",
        "53" => "豪华装修",
        "54" => "其他"
    ),
    Const_MultiCity::CITY_ID_WUHAN => array(
        "55" => "毛坯",
        "56" => "普通装修",
        "57" => "精装修",
        "58" => "豪华装修",
        "59" => "其他"
    ),
    Const_MultiCity::CITY_ID_JINAN => array(
        "60" => "毛坯",
        "61" => "普通装修",
        "62" => "精装修",
        "63" => "豪华装修",
        "64" => "其他"
    ),
    Const_MultiCity::CITY_ID_FOSHAN => array(
        "65" => "毛坯",
        "66" => "普通装修",
        "67" => "精装修",
        "68" => "豪华装修",
        "69" => "其他"
    ),
    Const_MultiCity::CITY_ID_WUXI => array(
        "70" => "毛坯",
        "71" => "普通装修",
        "72" => "精装修",
        "73" => "豪华装修",
        "74" => "其他"
    ),
    Const_MultiCity::CITY_ID_ZHENGZHOU => array(
        "75" => "毛坯",
        "76" => "普通装修",
        "77" => "精装修",
        "78" => "豪华装修",
        "79" => "其他"
    ),
    Const_MultiCity::CITY_ID_CHANGSHA => array(
        "80" => "毛坯",
        "81" => "普通装修",
        "82" => "精装修",
        "83" => "豪华装修",
        "84" => "其他"
    ),
    Const_MultiCity::CITY_ID_SHIJIAZHUANG => array(
        "85" => "毛坯",
        "86" => "普通装修",
        "87" => "精装修",
        "88" => "豪华装修",
        "89" => "其他"
    ),
    Const_MultiCity::CITY_ID_QINGDAO => array(
        "95" => "毛坯",
        "96" => "普通装修",
        "97" => "精装修",
        "98" => "豪华装修"
    ),
    Const_MultiCity::CITY_ID_XIAN => array(
        "99" => "毛坯",
        "100" => "普通装修",
        "101" => "精装修",
        "102" => "豪华装修",
    ),

    Const_MultiCity::CITY_ID_NINGBO => array(
        "111" => "毛坯",
        "112" => "普通装修",
        "113" => "精装修",
        "114" => "豪华装修"
    ),

    Const_MultiCity::CITY_ID_HEFEI => array(
        "1" => "毛坯",
        "2" => "普通装修",
        "3" => "精装修",
        "4" => "豪华装修"
    ),
    Const_MultiCity::CITY_ID_DONGGUAN => array(
        "1" => "毛坯",
        "2" => "普通装修",
        "3" => "精装修",
        "4" => "豪华装修"
    ),

    Const_MultiCity::CITY_ID_FUZHOU => array(
        "115" => "毛坯",
        "116" => "普通装修",
        "117" => "精装修",
        "118" => "豪华装修"
    ),

    Const_MultiCity::CITY_ID_KUNMING => array(
        "119" => "毛坯",
        "120" => "普通装修",
        "121" => "精装修",
        "122" => "豪华装修"
    ),

    Const_MultiCity::CITY_ID_GUIYANG => array(
        "1" => "毛坯",
        "2" => "普通装修",
        "3" => "精装修",
        "4" => "豪华装修"
    ),
    Const_MultiCity::CITY_ID_TAIYUAN => array(
        "1" => "毛坯",
        "2" => "普通装修",
        "3" => "精装修",
        "4" => "豪华装修"
    ),

    Const_MultiCity::CITY_ID_SHENYANG => array(
        "103" => "毛坯",
        "104" => "普通装修",
        "105" => "精装修",
        "106" => "豪华装修",
    ),

    Const_MultiCity::CITY_ID_KUNSHAN => array(
        "90" => "毛坯",
        "91" => "普通装修",
        "92" => "精装修",
        "93" => "豪华装修",
        "94" => "其他"
    ),
    Const_MultiCity::CITY_ID_NANCHANG => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修"
    ),
    Const_MultiCity::CITY_ID_ZHUHAI => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),

    Const_MultiCity::CITY_ID_CHANGZHOU => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_ZHONGSHAN => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_JIAXING => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_XIAMEN => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_YANTAI => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_HAERBIN => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_HAIKOU => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_SANYA => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_HUIZHOU => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_BAODING => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_GUILIN => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_HANDAN => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_HUHEHAOTE => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_JILIN => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_LANZHOU => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_LANGFANG => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_LUOYANG => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_MIANYANG => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_NANNING => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_NANTONG => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_QINHUANGDAO => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_QUANZHOU => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_SHAOXING => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_TAIZHOU => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_TANGSHAN => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_WEIHAI => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_WEIFANG => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_XUZHOU => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_YANGZHOU => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_YICHANG => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_YINCHUAN => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),
    Const_MultiCity::CITY_ID_ZHENJIANG => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修"
    ),



    Const_MultiCity::CITY_ID_CHANGCHUN => array(
        "1"=>"毛坯",
        "2"=>"普通装修",
        "3"=>"精装修",
        "4"=>"豪华装修",
        "94"=> "其他"
    ),



);
// 合租类型、室友类型加入solr的tags字段
// 主卧次卧合并为单间 统一Tag D001
$config['solr_tags'] = array(
    'sharetype' => array(
        1 => 'D001', // 主卧
        2 => 'D002', // 床位
        3 => 'D003', // 隔断间
        4 => 'D004', // 次卧
        5 => 'D001'  // 单间
    ),
    'sharesex'  => array(
        0 => 'E000', // 男女不限
        1 => 'E001', // 仅限男
        2 => 'E002'  // 仅限女
    ),
    'towards'    => array(
        1 => 'F001',//"东",
        2 => 'F002',//"南",
        3 => 'F003',//"西",
        4 => 'F004',//"北",
        5 => 'F005',//"南北",
        6 => 'F006',//"东西",
        7 => 'F007',//"东南",
        8 => 'F008',//"西南",
        9 => 'F009',//"东北",
        10=> 'F010',//"西北",
        11=> 'F011'//"不知道朝向"
    ),
    'deployment'=>array(
        1 => '独立卫生间', //独立卫生间
        3 => '阳台',  //阳台
        12=> '(独立卫生间 AND 阳台)'
    ),
    'imgtag' => array( // 没有房源图片并且没有小区图片的房源都算作无图房源
        0 => 'I000', // 没有图片
        1 => 'I001'  // 有图片
    )
);
?>
