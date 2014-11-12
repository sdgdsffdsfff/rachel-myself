<?php

$apf = APF::get_instance();
$apf->set_response_class('APF_Response');
$apf->set_request_class('Chat_Web_Request');
$apf->run();
