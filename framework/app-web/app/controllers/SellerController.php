<?php namespace Aifang\Web;

use Aifang\Model\Commission;
use Controller;
use Input;
use Redirect;
use Route;
use URL;
use View;
use Aifang\Web\BaseController;
use Aifang\Web\UserController;
use Aifang\Service\User\UserService;
use Aifang\Service\Commission\CommissionService;
use Aifang\Service\Wechat\Member\UserInfo;
use Aifang\Service\Inventory\InventoryService;
use Resource;



class SellerController extends UserController {
    /**
     * The layout that should be used for responses.
     */

    /**
     * Show the index.
     */
    public function commission()
    {
        $this->file_css = 'commission';
        $this->file_js = 'commission';
        $this->title = '委托房源';
        return $this->view('touch.user.seller.commission');
    }

    public function myProperty() {
        $user_id = $this->getUserId();
        $page = 1;
        $commissions = CommissionService::getInstance()->getLandlordHouses($user_id,$page);
        if (!empty($commissions)) {//拼接未带看反馈总数
            foreach($commissions as $commision_key => $commision) {
                if (($commision['status'] == 4) && isset($commision['inventory_id'])) {
                    $unreadAction = Resource::make('Visit\LastView\CountAction', ['inventory_id' => $commision['inventory_id']]);
                    $commision['feedback']['unread'] = $unreadAction->run();
                }
                $commissions[$commision_key] = $commision;
            }
        }
        $this->file_css = 'my-property';
        $this->file_js = 'my-property';
        $this->title = '我的房子';
        return $this->view('touch.user.seller.myProperty',['commissions' => $commissions]);
    }

    public function comment() {
        $this->file_css = 'comment';
        $this->file_js = 'comment';
        $this->title = '服务评价';
        return $this->view('touch.user.seller.comment');
    }

    public function afterVerify()
    {
        $params = Input::all();
        $user_id = $this->getUserId();
        $params = array_merge($params,array('user_id'=>$user_id));
        CommissionService::getInstance()->afterVerify($params);
        $redirect = URL::route('landlord.my');
        return Redirect::to($redirect);
    }
}
