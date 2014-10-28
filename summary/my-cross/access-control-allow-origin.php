<?php
//特别注意的是，该Access-Control-Allow-Origin后面跟的头是需要请求该文件的域名
header('Access-Control-Allow-Origin: http://localhost');
// header('Access-Control-Allow-Origin: *');
$ret = array('code'=>0, 'msg'=>rand(0, 500));
echo json_encode($ret);