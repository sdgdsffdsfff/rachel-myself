<?php Aifang\Web\Resource::addJS(array('app/my-property'));?>
<?php Aifang\Web\Resource::addCSS(array('css/my-property'));?>

@extends('layouts.touch')

@section('content')
@if(!empty($commissions))
@foreach($commissions as $commission)
<div class="house-info" commissionId="{{$commission['commission_id']}}">
    <div class="house-detail h3" propertyUrl='@if($commission['status'] == 4 && $commission['property']['commission_status'])/inventory/list/{{$commission['inventory_id']}}@endif'>
        <p class="info-title light-font">房源信息</p>
        <div class="info-content content-mid">
            <p class="info-comm">{{$commission['property']['community_name']}}
            <span id='isAuthen' class="is-authen" @if($commission['property']['certified'] == 0) style="display: none;" @endif>已认证</span>
            </p>
            <p class="info-desc"><span>{{$commission['property']['bedrooms']}}室{{$commission['property']['living_rooms']}}厅</span><span>{{$commission['property']['price']}}万</span></p>
        </div>

        <i @if(!($commission['status'] == 4 && $commission['property']['commission_status'])) style="display: none" isshow="false" @else isshow="true" @endif class="iconfont icon-arrow icon-property-info">&#xe610;</i>

    </div>
    <!-- 我的房子－－经纪人未抢 -->
    @if($commission['status'] == 1)
    <div class="house-noselected">
        <img src="<?=$host; ?>/image/loading-broker.gif" >
        <p class="noselected-desc h3 txt-warning">您的房子在经纪人圈内引起了骚动</p>
        <p class="noselected-desc h3 txt-warning">下一步，挑选经纪人</p>
    </div>
    @elseif ($commission['status'] == 2)
    <!-- 我的房子－－经纪人已抢 -->
    <div class="house-selecting">
        <p class="selecting-title">请选择您的专属经纪人</p>
        <ul class="selecting-content">
            @foreach($commission['broker'] as $broker)
                <li class="list-item">
                    <a href="/broker/detail/{{$broker['broker_uid']}}"><img src="{{$broker['broker_photo']}}" class="item-img"></a>
                    <div class="item-detail">
                        <p class="name">{{$broker['broker_name']}}</p>
                        <p class="info light-font"><span>带看{{$broker['achievement']}}</span><span>评价{{$broker['total_comments']}}</span></p>
                    </div>
                    <a brokerId='{{$broker['broker_uid']}}' href="javascript:void(0);" class="com-btn btn-big btn-succ btn-select">选择他</a>
                </li>
            @endforeach
        </ul>
    </div>
    @elseif(($commission['status'] == 4) || ($commission['status'] == 3))
    <!-- 我的房子－－经纪人已抢 -->
    <div class="house-selected mid-font">
        @if($commission['status'] == 4)
        <a class="list-item" href="/schedules">
            <p class="item-title light-font mid">未看日程</p>
            <p class="day-num content-mid mid">{{$commission['schedule_count']}}条</p>
            <i class="iconfont icon-arrow">&#xe610;</i>
        </a>
        <a class="list-item" href="/completed-schedules">
            <p class="item-title light-font mid">带看反馈</p>
            <p class="feedback-num content-mid mid">{{$commission['feedback']['total']}}条</p>
            @if($commission['feedback']['unread'])
                <p class="item-right"><span class='unread-msg'>{{$commission['feedback']['unread']}}条新</span><i class="iconfont icon-arrow">&#xe610;</i></p>
            @endif
        </a>
        <div class="list-item">
            <p class="item-title light-font">看房时间</p>
            <div class="see-time content-mid">
                @foreach($commission['schedule']['free_time'] as $free_time)
                <p class="time-detail">{{$free_time}}</p>
                @endforeach
            </div>
        </div>
        @endif
        <!-- 以上展示为已开盘，不展示为未开盘 -->
        <a class="house-selected" href="tel:{{$commission['seller_broker']['phone']}}">
            <div class="list-item">
                <p class="item-title light-font">专属经纪人</p>
                <div class="broker-detail content-mid">
                    <p class="name">{{$commission['seller_broker']['broker_name']}}</p>
                    <p class="desc">改价调时间，请联系我</p>
                </div>
                <i class="iconfont icon-phone">&#xe611;</i>
            </div>
        </a>
    </div>
    @endif
</div>
@endforeach
<a href="/seller/commission" class="entry-item mid-font">
    <p class="item-title content-mid">再卖一套，有钱任性</p>
    <i class="iconfont icon-arrow">&#xe610;</i>
</a>
@else
<!-- 没有委托房源 -->
<div class="result-container">
<div class="no-result">
    <i class="iconfont icon-no">&#xe60a;</i>
    <p class="no-tip">目前还没有委托的房源哦~</p>
    <a href="/seller/commission" class="com-btn btn-big btn-succ btn-order">马上去委托房源</a>
</div>
</div>
@endif
<script type="text/html" id='status2'>
    <p class="selecting-title">请选择您的专属经纪人</p>
    <ul class="selecting-content">
        <% for (var i = 0; i < brokers.length; i++) { %>
        <li class="list-item">
            <a href="/broker/detail/<%=brokers[i].broker_uid%>"><img src="<%=brokers[i].img%>" class="item-img"></a>
            <div class="item-detail">
                <p class="name"><%=brokers[i].broker_name%></p>
                <p class="info light-font"><span>带看<%=brokers[i].achievement%></span><span>评价<%=brokers[i].total_comments%></span></p>
            </div>
            <a brokerId="<%=brokers[i].broker_uid%>" href="javascript:void(0);" class="com-btn btn-big btn-succ btn-select" >选择他</a>
        </li>
        <% } %>
    </ul>
</script>
<script type="text/html" id='status3'>
     <div class="house-selected">
         <!-- 状态４ -->
        <% if (ret.status == 4) { %>
        <a class="list-item" href="/schedules">
            <p class="item-title light-font">未看日程</p>
            <p class="day-num content-mid"><%=ret.schedule_count%>条</p>
            <i class="iconfont icon-arrow">&#xe610;</i>
        </a>
        <a class="list-item" href="/completed-schedules">
            <p class="item-title light-font">带看反馈</p>
            <p class="feedback-num content-mid"><%=ret.feedback.total%>条</p>
            <p class="item-right">
                <% if (ret.feedback.unread * 1 > 0) { %>
                <span class="unread-msg"><%=ret.feedback.unread%>条新</span>
                <% } %>
                <i class="iconfont icon-arrow">&#xe610;</i>
            </p>
        </a>
        <div class="list-item">
            <p class="item-title light-font">看房时间</p>
            <div class="see-time content-mid">
                <% for(var i = 0; i < ret.schedule.free_time.length; i++) { %>
                <p class="time-detail"><%=ret.schedule.free_time[i]%></p>
                <% } %>
            </div>
        </div>
        <% } %>
        <!-- 以上展示为已开盘，不展示为未开盘 -->
        <a href="tel:<%=ret.seller_broker.phone%>" class="list-item">
            <p class="item-title light-font">专属经纪人</p>
            <div class="broker-detail content-mid">
                <p class="name"><%=ret.seller_broker.broker_name%></p>
                <p class="desc">改价调时间，请联系我</p>
            </div>
            <i class="iconfont icon-phone">&#xe611;</i>
        </a>
    </div>
</script>
@endsection

