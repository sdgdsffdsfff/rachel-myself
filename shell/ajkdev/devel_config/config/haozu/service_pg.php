<?php
$config['luceneRentUri']   = "http://vip10-001.a.ajkdns.com:8998/haozu/select/?";
$config['anjukeMessage']   = "http://app02-004-haozu.a.ajkdns.com:7777/sendsms?";
$config['ajk_luceneUri'] = "http://vip10-001.a.ajkdns.com:8999/property/select?";
$config['ajk_city_lucene']    = "http://vip10-001.a.ajkdns.com:9001/property/";
$config['communities_list']  = 'http://10.10.6.51:8983/hz-community/select?';
$config['allLuceneRentUri'] = "http://vip10-001.a.ajkdns.com:8999/property/";
$config['allLuceneRentUri_new'] = "http://solr.anjuke.test:8983/hz-property-";
$config['segment_uri']      = "http://app10-005.hz.a.ajkdns.com:1985?";
$config['busLuceneUri']  = "http://solr.anjuke.test:8983/haozu-traffic/select?";
$config['googleGClientGeocoder'] = "http://ditu.google.cn.a.haozu.com/maps/geo?";
$config['ajk_props'] = "http://solr.anjuke.test:8983/haozu-property-ajk/select/?";
$config['dw_url'] = 'http://analytics.haozu.com/cf?';

$config['allLuceneRentUriListV2']  =  array(
        11      => "http://solr.anjuke.test:8983/hz-list-11/select?",
        14      => "http://solr.anjuke.test:8983/hz-list-14/select?",
        "other" => "http://solr.anjuke.test:8983/hz-list-03/select?",
        "four"  => "http://solr.anjuke.test:8983/hz-list-04/select?"
);

$config['allLuceneRentUriListV2_Demo'] = $config['allLuceneRentUriListV2'];

$config['allLuceneRentUriList'] = $config['allLuceneRentUriListV2'];

$config['ajk_community_api'] = "http://api.anjuke.com/1.0/";  //  线上环境地址
$config['ajk_api_key_sign'] = "apikey=cf6a9a03f0344aa5badfecad2f93cec2&sign=e5d0f725b29b8efc323587adfe1101ec";
