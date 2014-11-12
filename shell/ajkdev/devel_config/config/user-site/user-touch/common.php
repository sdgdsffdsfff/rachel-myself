<?php
#$config['base_domain'] = 'anjuke.com';
$config['base_domain'] = DEV_NAME.'.dev.anjuke.com';

$config['base_touch_domain'] = 'm.'.$config['base_domain'];

$config['cookie_service'] = 'http://api.anjuke.com/common/cookie';

$config['cookie_domain'] = 'anjuke.com';

$config['base_www_domain'] = 'www.'.$config['base_domain'];
$config['base_www_domain'] = 'www.anjuke.com';//线下无API数据，因此调用线上

//$config['base_api_domain'] = 'api.'.$config['base_domain'];
$config['base_api_domain'] = 'api.anjuke.com';//线下无API数据，因此调用线上
$config['performance_rate'] = 1;

$config['touch_mobile_base_domain'] = 'm.'.$config['base_domain'];
