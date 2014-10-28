<?php
$num = $_REQUEST['num'];
$callback = $_REQUEST['callback'];
$ret = array('code' => 0, 'msg' => rand(0, 5000));
var_dump($ret);
echo $callback . '(' . json_encode($ret) . ')';