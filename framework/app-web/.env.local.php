<?php
return [
    'elasticsearch' => [
        'hosts' => '192.168.194.56:9200',
    ],
    'database'=>[
        'default'=>[
            'write'=>[
                'host'=>'db.dev.angejia.com',
                'port'=>'3306',
                'username'=>'root',
                'password'=>'1234',
            ],
            'read'=>[
                'host'=>'db.dev.angejia.com',
                'port'=>'3306',
                'username'=>'root',
                'password'=>'1234',
            ],
        ],
    ], 
    'redis'=>[
        'default'=>[
            'host'=>'db.dev.angejia.com',
            'port'=>'6379',
            'database'=>0,
        ],
    ],
    'storage' => [
        'qiniu' => [
            'access_key'   => 'A84iHgfsHI7xfY3HnR56gnEVK_ek6237WNZjIEZ-',
            'secret_key'   => 'dy_feG5YyzdI9voi8HVrjK7GejfbNh0F6m-7QYii',
            'callback_url' => 'http://pub.dev.angejia.com/storage-infos',
            'default_bucket' => 'aifang-dev',
        ],
    ],
    'push' => [
        'getui' => [
            'broker' => [
                'master_key' => 'F4WeDoIhEBA5Wj0sch4JK8',
                'app_key'    => 'zv0h32TuJEAec6sLLjqmu3',
                'app_id'     => 'jM5HPtHheNA0Wt3yKjRZn4',
            ],
        ],
    ],
     'wechat' => [
        'base_url' => 'http://wechat.develop.dev.angejia.com',
        'tw_base_url' => 'http://web.touchweb.dev.angejia.com',
        'login_name' => '1536524659@qq.com',
        'app_account' => 'gh_66e09c5d35bd',
        'app_id' => 'wxeafdf8a8051cff81',
        'app_key' => 'be968f7c67f853dff5cfd819f85a483f',
        'app_token' => 'Niubi_wechat_1234',
    ],
];