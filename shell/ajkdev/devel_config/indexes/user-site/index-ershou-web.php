<?php
$G_LOAD_PATH = array_merge(array(
        APP_PATH . "../app-user-component/"
), $G_LOAD_PATH);

$apf = APF::get_instance();
$apf->set_response_class('APF_Response');
$apf->set_request_class('Ershou_Web_Request');
$apf->run();