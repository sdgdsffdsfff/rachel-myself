<?php
$default_fetch_mode = PDO::FETCH_ASSOC;
$config['jinpu_db_master']=array(
    'dsn'=>'mysql:host=10.20.3.80;port=3307;dbname=jinpu_db',
    'username'=>'readonly_v2',
    'password'=>'aNjuKe9dx1Pdw',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode,
    'extends_object' => 'DB_AnjukeStatsObject'
);

$config['jinpu_db_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;port=3307;dbname=jinpu_db',
    'username'=>'readonly_v2',
    'password' => 'aNjuKe9dx1Pdw',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode,
    'extends_object' => 'DB_AnjukeStatsObject'
);


$config['jinpu_log_master']=array(
    'dsn'=>'mysql:host=10.20.3.80;port=3307;dbname=jinpu_log',
    'username'=>'readonly_v2',
    'password'=>'aNjuKe9dx1Pdw',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode,
    'extends_object' => 'DB_AnjukeStatsObject'
);

$config['jinpu_log_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;port=3307;dbname=jinpu_log',
    'username'=>'readonly_v2',
    'password'=>'aNjuKe9dx1Pdw',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode,
    'extends_object' => 'DB_AnjukeStatsObject'
);

$config['jinpu_stats_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;port=3306;dbname=jp_dw_stats',
    'username'=>'readonly_v2',
    'password'=>'aNjuKe9dx1Pdw',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode,
    'extends_object' => 'DB_AnjukeStatsObject'
);

$config['jinpu_report']=array(
    'dsn'=>'mysql:host=10.20.3.80;port=3307;dbname=jinpu_report',
    'username'=>'readonly_v2',
    'password'=>'aNjuKe9dx1Pdw',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode,
    'extends_object' => 'DB_AnjukeStatsObject'
);

$config['jinpu_analysis_slave']=array(
    'dsn'=>'mysql:host=10.20.3.80;port=3307;dbname=jinpu_db',
    'username'=>'readonly_v2',
    'password'=>'aNjuKe9dx1Pdw',
    'init_attributes'=>array(),
    'init_statements'=>array(
        'SET CHARACTER SET utf8',
        'SET NAMES utf8'
    ),
    'default_fetch_mode'=>$default_fetch_mode,
    'extends_object' => 'DB_AnjukeStatsObject'
);


// read/write
$config['anjuke_db_master']=array(
        'dsn'=>'mysql:host=10.20.3.80;dbname=anjuke_db',
        'username'=>'readonly_v2',
        'password'=>'aNjuKe9dx1Pdw',
        'init_attributes'=>array(),
        'init_statements'=>array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),
        'default_fetch_mode'=>$default_fetch_mode,
        'extends_object' => 'DB_AnjukeObject'
);

// readonly
$config['anjuke_db_slave']=array(
        'dsn'=>'mysql:host=10.20.3.80;dbname=anjuke_db',
        'username'=>'readonly_v2',
        'password'=>'aNjuKe9dx1Pdw',
        'init_attributes'=>array(),
        'init_statements'=>array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),
        'default_fetch_mode'=>$default_fetch_mode,
        'extends_object' => 'DB_AnjukeObject'
);


$config['anjuke_stats_slave']=array(
        'dsn'=>'mysql:host=10.20.3.80;dbname=ajk_dw_stats',
        'username'=>'readonly_v2',
        'password'=>'aNjuKe9dx1Pdw',
        'init_attributes'=>array(),
        'init_statements'=>array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),
        'default_fetch_mode'=>$default_fetch_mode,
        'extends_object' => 'DB_AnjukeStatsObject'
);


// read/write
$config['action_db_master']=array(
        'dsn'=>'mysql:host=10.20.3.80;dbname=action_db',
        'username'=>'readonly_v2',
        'password'=>'aNjuKe9dx1Pdw',
        'init_attributes'=>array(),
        'init_statements'=>array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),
        'default_fetch_mode'=>$default_fetch_mode,
        'extends_object' => 'DB_ActionObject'
);

// readonly
$config['action_db_slave']=array(
        'dsn'=>'mysql:host=10.20.3.80;dbname=action_db',
        'username'=>'readonly_v2',
        'password'=>'aNjuKe9dx1Pdw',
        'init_attributes'=>array(),
        'init_statements'=>array(
                'SET CHARACTER SET utf8',
                'SET NAMES utf8'
        ),
        'default_fetch_mode'=>$default_fetch_mode,
        'extends_object' => 'DB_ActionObject'
);

// readonly bbs_db
$config['bbs_db_slave']=array(
        'dsn'=>'mysql:host=10.20.3.80;dbname=bbs_db',
        'username' => 'readonly_v2',
            'password' => 'aNjuKe9dx1Pdw',

        'init_attributes' => array(),
        'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

        'default_fetch_mode' => $default_fetch_mode,
        'extends_object' => 'DB_BBSDataObject'
);

// write bbs_db
$config['bbs_db_master']=array(
        'dsn'=>'mysql:host=10.20.3.80;dbname=bbs_db',
        'username' => 'readonly_v2',
        'password' => 'aNjuKe9dx1Pdw',

        'init_attributes' => array(),
        'init_statements' => array('SET CHARACTER SET utf8','SET NAMES utf8'),

        'default_fetch_mode' => $default_fetch_mode,
        'extends_object' => 'DB_BBSDataObject'
);


// read/write
$config['queue_db_master'] = array (
    'dsn'				 => 'mysql:host=10.20.3.80;dbname=queue_db',
    'username' 			 => 'readonly_v2',
    'password' 			 => 'aNjuKe9dx1Pdw',
    'init_attributes' 	 => array(),
    'init_statements' 	 => array('SET CHARACTER SET utf8','SET NAMES utf8'),
    'default_fetch_mode' => $default_fetch_mode
);

