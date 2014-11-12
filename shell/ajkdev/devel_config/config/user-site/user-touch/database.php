<?php
$default_fetch_mode = PDO::FETCH_ASSOC;

$config['slave'] = array (
    'dsn'=>'mysql:host=10.20.3.80;dbname=anjuke_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['anjuke_db_5_master'] = array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=anjuke_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',
    'password' => 'aNjuKe9dx1Pdw',

    'default_fetch_mode' => $default_fetch_mode,
    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8', 'SET NAMES utf8')
);

$config['anjuke_db_5_slave'] = array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=anjuke_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'default_fetch_mode' => $default_fetch_mode,
    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8', 'SET NAMES utf8')
);

$config['slave_for_update'] = array (
    'dsn'=>'mysql:host=10.20.3.80;dbname=anjuke_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);
$config['prop_shanghai_slave']=array(
        'dsn'=>'mysql:host=10.20.3.80;dbname=propertys_sh_db',
        'username'=>'readonly',
        'password'=>'aN2jU3ke',
        'init_attributes'=>array(),
        'init_statements'=>array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),
        'default_fetch_mode'=>$default_fetch_mode
);

$config['prop_shanghai_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=propertys_sh_db',
    'username'=>'anjuke_triger',
    'password'=>'anjuke_triger',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['prop_shanghai_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=propertys_sh_db',
    'username'=>'readonly_v2',
    'password'=>'aNjuKe9dx1Pdw',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['prop_beijing_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=propertys_db',
    'username'=>'readonly',
    'password'=>'aN2jU3ke',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['prop_other_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=propertys_other_db',
    'username'=>'readonly',
    'password'=>'aN2jU3ke',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['prop_other_04_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=propertys_db_04',
    'username'=>'readonly',
    'password'=>'aN2jU3ke',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['ppc_slave'] = array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=ppc_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['ppc_master']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=ppc_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['slave_for_update'] = array (
    'dsn'=>'mysql:host=10.20.3.80;dbname=anjuke_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['ark_slave'] = array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=ark_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['dw_stats'] = array (
    'dsn'=>'mysql:host=10.20.3.80;dbname=ajk_dw_stats',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['imagedb'] = array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=image_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),
    'default_fetch_mode' => $default_fetch_mode
);

$config['stats'] = array (
    'dsn'=>'mysql:host=10.20.3.80;dbname=stats_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['slave_action_feed'] = array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=action_feed',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['action_slave'] = array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=action_db',
    'username' => 'readonly',
    'password' => 'aN2jU3ke',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);


$config['master']=array(
        'dsn'=>'mysql:host=10.20.3.80;dbname=anjuke_db',
        'username'=>'anjuke_triger',
        'password'=>'anjuke_triger',
        'init_attributes'=>array(),
        'init_statements'=>array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),
        'default_fetch_mode'=>$default_fetch_mode
);
// user_activity db read/write
$config['user_activity_master'] = array (
    'dsn'=>'mysql:host=10.20.3.80;dbname=user_activity',
    'username' => 'anjuke_triger',
    'password' => 'anjuke_triger',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8')
);

// readonly
$config['user_activity_slave'] = array (
    'dsn'=>'mysql:host=10.20.3.80;dbname=user_activity',
    'username' => 'readonly_v2',
    'password' => 'aNjuKe9dx1Pdw',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8')
);

$config['user_prop_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=user_prop_db',
    'username' => 'anjuke_triger',
    'password' => 'anjuke_triger',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['user_prop_master']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=user_prop_db',
    'username' => 'anjuke_triger',
    'password' => 'anjuke_triger',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['queue_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=queue_db',
    'username'=>'anjuke_triger',
    'password'=>'anjuke_triger',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['seo_db_master']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=seo_db',
    'username'=>'anjuke_triger',
    'password'=>'anjuke_triger',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['seo_db_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;dbname=seo_db',
    'username'=>'anjuke_triger',
    'password'=>'anjuke_triger',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode
);

$config['mobile_db_master'] = array (
    'dsn'=>'mysql:host=10.20.3.80;dbname=mobile_db',
    'username' => 'anjuke_triger',
    'password' => 'anjuke_triger',

    'init_attributes' => array(),
    'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

    'default_fetch_mode' => $default_fetch_mode
);

$config['daoinfo_slave'] = $config['daoinfo_master'] = array(
        'dsn' => 'mysql:host=192.168.1.24;dbname=daoinfo_db',

        'username' => 'new_home',
        'password' => '123456',

        'init_attributes' => array(),
        'init_statements' => array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),

        'default_fetch_mode' => PDO::FETCH_ASSOC
);

$config['mobile_db_master'] = $config['mobile_db_slave'] = array(
    'dsn' => 'mysql:host=10.20.3.80;dbname=mobile_db',
    'username' => 'readonly_v2',
    'password' => 'aNjuKe9dx1Pdw',

    'init_attributes' => array(),
    'init_statements' => array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode' => $default_fetch_mode
);

$config['mobile_api_db_slave'] = $config['mobile_api_db_master'] = array(
    'dsn' => 'mysql:host=10.20.3.80;dbname=mobile_api_db',
    'username' => 'readonly_v2',
    'password' => 'aNjuKe9dx1Pdw',
    'init_attributes' => array(),
    'init_statements' => array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode' => $default_fetch_mode
);

