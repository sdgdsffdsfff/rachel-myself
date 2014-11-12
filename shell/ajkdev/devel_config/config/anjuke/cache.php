<?php
//房源
$config['prop_search_mem_servers'] = array (
    array('host'=>'192.168.1.97', 'port'=>'11211' , 'persistent' => true)
);
$config['servers'] = array (
    array('host'=>'192.168.1.97', 'port'=>'11211' , 'persistent' => true)
);
//ppc防作弊
$config['ppc'] = array (
    array('host'=>'10.20.6.102', 'port'=>'11211' , 'persistent' => true)
);

$config['redis'] = array();

$config['redis_vppv_queue'] = array(
    'host'       => '192.168.1.24',
    'port'       => '6379',
    'timeout'    => 0,
    'persistent' => TRUE
);
//首页cache
$config['service_home_page_cache'] = array(
    array(
        'host' => '192.168.1.24',
        'port' => 11211,
        'persistent' => true
    )
);
