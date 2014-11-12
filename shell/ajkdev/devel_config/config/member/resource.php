<?php
if (defined("RELEASE_VERSION")){
    $config['version'] = str_replace("_", "", RELEASE_VERSION);
}
$config['cdn_host'] = "include.".DEV_NAME.".dev.anjuke.com";
$config['cdn_path'] = "/".APP_NAME;
$config['cdn_boundable_host'] = "include.".DEV_NAME.".dev.anjuke.com";
$config['cdn_boundable_path'] = "/".APP_NAME;
$config['cdn_pure_static_host'] = "pages.".DEV_NAME.".dev.anjuke.com";
$config['cdn_pure_static_path'] = "/";
$config['boundable_resources'] = true;
$config['prefix_uri'] = '/res';
$config['resource_type_single'] = 's';
$config['resource_type_boundable'] = 'b';
$config['enabled_inline_styles'] = false;
$config['css_use_same_host'] = false;

