<?php
/**
 *
 * 分词服务X
 * @var unknown_type
 */
$config['mms_rpc_endpoint'] = array(
"tcp://10.10.3.46:6000",
//        "tcp://*:6000",
);

/***
 * 控制请求头信息扩展开关
 */
$config['endpoint_config'] = array(
'mms_rpc_endpoint'=>array('enable_extend_header'=>false),
);