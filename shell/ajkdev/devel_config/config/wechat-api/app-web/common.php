<?php
$config['wx_base_domain'] = LOAD_PATH . ".dev.anjuke.com";

$config['index_domain'] = "http://wx.{$config['wx_base_domain']}";//首页
$config['dialog_domain'] = "http://wx.{$config['wx_base_domain']}/simu/";//dialog页面

//api url
//$config['wx_api_url'] = "http://api.kakie.dev.aifang.com/mobile/5.0/wechat/";
$config['wx_api_url'] = "http://api." . LOAD_PATH . ".dev.anjuke.com/wechat/proto/";
