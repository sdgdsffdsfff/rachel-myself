<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function() {
    return Redirect::to('/seller/commission');
});

Route::get('readme', function() {
    if (App::environment('production')) {
        App::abort(403);
    }

    return Parsedown::instance()
        ->text(file_get_contents(base_path() . '/README.md'));
});


// TODO::REMOVE
Route::get('/home', 'Aifang\Web\HomeController@index');
//Route::get('/test', function(){return View::make('touchweb.entrust');});

// User
Route::get('/verify/phone', ['as' => 'user.login','uses' => 'Aifang\Web\UserController@verifyPhone']);
Route::get('/commission/verify/after',['as' => 'commission.login.after','uses' => 'Aifang\Web\SellerController@afterVerify']);
Route::get('/check/wechat','Aifang\Web\UserController@checkWechat');

// landlord => seller, entrust => commission
//Route::get('/landlord/my', ['as' => 'landlord.my', 'before' => 'landlord.my', 'uses' => 'Aifang\Web\LandlordController@myProperty']);//TODO::remove
//Route::get('/landlord/entrust', ['as' => 'landlord.publish','uses' => 'Aifang\Web\LandlordController@entrust']);//TODO::remove
Route::get('/seller/my', ['as' => 'landlord.my', 'before' => 'landlord.my', 'uses' => 'Aifang\Web\SellerController@myProperty']);
Route::get('/seller/commission', ['as' => 'landlord.publish','uses' => 'Aifang\Web\SellerController@commission']);
//Route::get('/buyer/reserve', 'Aifang\Web\BuyerController@reserve');//TODO::REMOVE

Route::get('/schedule/history', 'Aifang\Web\UserController@scheduleHistory');
#Route::get('/schedule', ['as' => 'buyer.schedule', 'uses' => 'Aifang\Web\BuyerController@schedule']);
Route::get('/buyer/order/{id}', 'Aifang\Web\BuyerController@order');
Route::get('/buyer/scheduleDetail/{id}', 'Aifang\Web\BuyerController@scheduleDetail');
Route::get('/userCenter', ['as' => 'user.center','before' => 'user.center','uses' => 'Aifang\Web\UserController@index']);

//Route::get('/landlord/comment', 'Aifang\Web\LandlordController@comment');//TODO::remove
Route::get('/seller/comment', 'Aifang\Web\SellerController@comment');
Route::get('/broker/detail/{id}', 'Aifang\Web\BrokerController@detail');

// Inventory(Property)
Route::get('/inventory/list', ['as' => 'property.buy' , 'uses' => 'Aifang\Web\InventoryController@propertyList']);
Route::get('/inventory/list/{id}', 'Aifang\Web\InventoryController@detail');

// wishlist
Route::get('/wishlist', ['as' => 'property.wishlist' , 'uses' => 'Aifang\Web\InventoryController@wishlist']);
Route::put('/api/inventories/{id}/wishlist/add', ['as' => 'property.wishlist.add' , 'uses' => 'Aifang\Web\InventoryController@addWishlist']);
Route::put('/api/inventories/{id}/wishlist/remove', ['Aifang\Web\InventoryController@removeWishlist']);

// --------------------
// Test Cases
// --------------------
Route::get('/test/validate', 'Aifang\Web\TestController@form_validate');


// Schedule
Route::get('/inventories/{id}/reserving-schedules', ['as' => 'schedule.getphone' , 'uses' => 'Aifang\Web\ScheduleController@getUserPhone']);
Route::post('/api/inventories/{id}/reserving-schedules', ['as' => 'schedule.reserving' , 'uses' => 'Aifang\Web\ScheduleController@reserving']);
Route::get('/api/reserving-schedules/{id}/active', ['as' => 'schedule.active' , 'uses' => 'Aifang\Web\ScheduleController@activeVisit']);
Route::get('/schedules', ['as' => 'schedule.getall' ,'before' => 'schedule.getall', 'uses' => 'Aifang\Web\ScheduleController@listSchedules']);
Route::get('/api/schedules', ['as' => 'api.schedule.getall' , 'uses' => 'Aifang\Web\ScheduleController@listSchedules']);
Route::get('/schedules/{id}', ['as' => 'schedule.get' , 'before' => 'schedule.get', 'uses' => 'Aifang\Web\ScheduleController@detail']);
Route::post('/api/schedules/{id}/review', ['as' => 'schedule.review' , 'uses' => 'Aifang\Web\ScheduleController@review']);
Route::put('/api/schedules/{id}/cancel', ['as' => 'schedule.cancel' , 'uses' => 'Aifang\Web\ScheduleController@cancel']);
Route::put('/api/schedules/{id}/complete', ['as' => 'schedule.complete' , 'uses' => 'Aifang\Web\ScheduleController@complete']);
Route::get('/completed-schedules', ['as' => 'completed-schedule.list' , 'before' => 'completed-schedule.list', 'uses' => 'Aifang\Web\ScheduleController@listSchedules']);
Route::get('/api/completed-schedules', ['as' => 'completed-schedule.list' , 'uses' => 'Aifang\Web\ScheduleController@listSchedules']);


// --------------
// Web Service
// --------------
// -------------------------
// Web Service (api) level URLs
// -------------------------
Route::get('/api', function(){return Response::json( array('code' => 8000,'msg' => "We didn't like your input!"), 400 );});//TODO::remove
Route::get('/api/property', 'Aifang\Web\Api\PropertyController@index');
Route::post('/api/property/{id}/actions/makeview', ['as' => 'property.makeView','uses' => 'Aifang\Web\Api\PropertyController@makeView']);
Route::post('/api/commission/publish','Aifang\Web\Api\StoreController@publish');
Route::post('/api/verifyPhone','Aifang\Web\Api\VerifyPhoneController@verifyPhone');
Route::get('/api/sendPhoneCode','Aifang\Web\Api\PhoneCodeController@sentCode');
Route::get('/api/community','Aifang\Web\Api\CommunityController@index');
Route::get('api/user/commission/{comission_ids}','Aifang\Web\Api\CommissionController@index');
Route::put('api/user/commission/{comission_id}','Aifang\Web\Api\CommissionController@store');
Route::put('/api/inventories/{id}/wishlist/add', 'Aifang\Web\InventoryController@addWishlist');
Route::put('/api/inventories/{id}/wishlist/remove', 'Aifang\Web\InventoryController@removeWishlist');

