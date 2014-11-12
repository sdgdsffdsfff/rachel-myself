<?php
$config['user_slave'] = array(
    'dsn'=>'mysql:host=192.168.1.103;dbname=user_db',
    'username' => 'caixh',
    'password' => 'caixh123',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['user_master'] = array(
    'dsn'=>'mysql:host=192.168.1.103;dbname=user_db',
    'username' => 'caixh',
    'password' => 'caixh123',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['nhmaster'] = array(
        'dsn' => 'mysql:host=dev.aifang.com;dbname=newhome_db',
        'username' => 'new_home',
        'password' => '123456',

        'init_attributes' => array(),
        'init_statements' => array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),

        'default_fetch_mode' => $default_fetch_mode
);

$config['nhslave'] = array(
        'dsn' => 'mysql:host=dev.aifang.com;dbname=newhome_db',
        'username' => 'readonly',
        'password' => '123456',

        'init_attributes' => array(),
        'init_statements' => array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),

        'default_fetch_mode' => $default_fetch_mode
);


$config['wechat_db_slave'] = array(
    'dsn'=>'mysql:host=192.168.1.24;dbname=wechat_db',
    'username' => 'readonly',
    'password' => '123456',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['wechat_db_master'] = array(
    'dsn'=>'mysql:host=192.168.1.24;dbname=wechat_db',
    'username' => 'new_home',
    'password' => '123456',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

