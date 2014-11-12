<?php
$config['cache_control'][]=array(
        'url'=>'^/$',
        'smaxage'=>2592000
        );
$config['cache_control'][]=array(
        'url'=>'^/community/',
        'smaxage'=>3600
);

$config['cache_control'][]=array(
            'url'=>'^/rental/landlord/',
            'smaxage'=>259200
        );

$config['cache_control'][]=array(
        'url'=>'^/rental/[0-9]+\-[0-9]+$',
        'smaxage'=>259200
);

$config['cache_control'][]=array(
        'url'=>'^/rental/broker/n',
        'smaxage'=>7200
);

$config['cache_control'][]=array(
        'url'=>'^/rental/broker/[0-9]+',
        'smaxage'=>7200
);

$config['cache_control'][]=array(
        'url'=>'^/rental/sublessor/',
        'smaxage'=>259200
);

$config['cache_control'][]=array(
        'url'=>'^/compound/[0-9]+/?',
        'smaxage'=>259200
);

$config['cache_control'][]=array(
        'url'=>'^/compound/photos/[0-9]+',
        'smaxage'=>259200
);

//列表页缓存
$config['cache_control'][]=array(
        'url'=>'^/metro$',
        'smaxage'=>30
);
$config['cache_control'][]=array(
        'url'=>'^/metro/(.*)',
        'smaxage'=>30
);
$config['cache_control'][]=array(
        'url'=>'^/bus/(.*)',
        'smaxage'=>30
);
$config['cache_control'][]=array(
        'url'=>'^/listing/landlord/$',
        'smaxage'=>30
);
$config['cache_control'][]=array(
        'url'=>'^/listing/broker/$',
        'smaxage'=>30
);
$config['cache_control'][]=array(
        'url'=>'^/listing/([a-zA-Z0-9]+)/([a-zA-Z0-9\-]+)/?',
        'smaxage'=>30
);
$config['cache_control'][]=array(
        'url'=>'^/listing/(.*)/?',
        'smaxage'=>30
);
$config['cache_control'][]=array(
        'url'=>'^/hezu/([a-zA-Z0-9]+)/([a-zA-Z0-9\-]+)/?',
        'smaxage'=>30
);
$config['cache_control'][]=array(
        'url'=>'^/hezu/(.*)/?',
        'smaxage'=>30
);

// end of this file
