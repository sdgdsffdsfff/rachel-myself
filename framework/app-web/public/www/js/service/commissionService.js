define(['zepto', 'ajax'], function ($, ajax) {
    'use strict';

    // 获取小区列表
    function getCommunityList (options) {
        var d = options.data;
        
        ajax({
            type: 'GET',
            url: '/api/community',
            data: {
                keyword: d.keyword
            },
            dataType: 'json',
            success: options.sucFn,
            error: options.errFn
        });
    }

    function saveCommission (options) {
        var d = options.data;
        ajax({
            type: 'POST',
            url: '/api/commission/publish',
            data: d,
            dataType: 'json',
            success: options.sucFn,
            error: options.errFn
        });

        
    }
    
    return {
        getCommunityList: getCommunityList,
        saveCommission: saveCommission
    }
});
