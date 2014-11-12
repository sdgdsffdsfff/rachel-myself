<?php
$config['mss'] = array(
    'client' => array('tcp://10.10.3.46:6000')
);

$config['trigger'] = 'zmq'; // 开关变量名
$config[$config['trigger']] = true; // 默认关闭ZMQ
