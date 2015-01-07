<?php Aifang\Web\Resource::addJS(array('app/commission'));?>
<?php Aifang\Web\Resource::addCSS(array('css/commission'));?>

@extends('layouts.touch')

@section('content')
<section id="entrust_wrap" class="entrust-wrap"> 
    <ul class="listview entrust-box">
        <li class="icon-both">
            <a href="javascript:;" class="lv-btn">
                <i class="iconfont item-icon icon-label">&#xe600;</i>
                <i class="iconfont item-link icon-arrow">&#xe610;</i>
                <input type="text" class="fi-text fi-max" id="search_input" placeholder="请输入小区名称" data-userid={{isset($params['user_id'])?$params['user_id']:''}}>
                <input type="hidden" id="hidden_id">
                <input type="hidden" id="hidden_cityid">
            </a>
        </li>
        <li class="icon-both">
            <a href="javascript:;" class="lv-btn">
                <i class="iconfont item-icon icon-label">&#xe600;</i>
                <input name="room" id="room" class="fi-text fi-max room" type="tel" maxlength="1" value="2">
                室
                <input name="hall" id="hall" class="fi-text fi-max hall" type="tel" maxlength="1" value="1">
                厅
            </a>
        </li>
        <li class="icon-l">
            <a href="javascript:;" class="lv-btn">
                <i class="iconfont item-icon icon-label">&#xe602;</i>
                <span class="placeholder">请输入期望售价（万）</span>
                <input type="number" id="price" class="fi-text fi-max sale" max="400000">
            </a>
        </li>
        <li class="icon-l">
            <a href="javascript:;" class="lv-btn">
                <i class="iconfont item-icon icon-label">&#xe603;</i>
                <input type="tel" id="phone" class="fi-text fi-max tele" maxlength="11" placeholder="请填写您的手机号">
            </a>
        </li>
    </ul>
    <p class="error-msg txt-error h4"></p>
    <footer class="entrust-footer">
        <a href="javascript:;" class="com-btn btn-large btn-succ" id="btn_entrust">委托房源</a>
    </footer>
</section>

<section id="auto-wrap" style="display:none;">
    @include('partials.autocomplete')
</section>
@endsection

