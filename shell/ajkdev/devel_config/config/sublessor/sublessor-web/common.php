<?php
$config['base_domain'] = DEV_NAME.'.dev.anjuke.com';

$config['performance_rate'] = 1;

$config['if_dev'] = true;//开发环境

$config['payment_callback_url'] = 'http://' . $config['base_sublessor_domain'] . '/pay/callback/';

function pr($data){
    echo '<pre>';
    var_dump($data);
    echo '</pre>';
}
