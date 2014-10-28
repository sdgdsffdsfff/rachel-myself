<?php
$num = $_REQUEST['num'];
$ret = array('code' => 0, 'msg' => rand(0, 5000));
echo json_encode($ret);