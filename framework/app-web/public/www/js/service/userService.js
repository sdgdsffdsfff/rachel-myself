define('userService', ['zepto', 'ajax'], function ($, ajax) {
    //var c1 = new controller('Controller 1');
    //return c1;
    function vote(options) {
        var d = options.data;
        ajax({
            type: 'POST',
            url: '/api/schedules/'+d.scheid+'/review',
            data: {
                level: d.level,
                content: d.content
            },
            dataType: 'json',
            success: options.sucFn,
            error: options.errFn
        });
        // setTimeout(function () {
        //     options.sucFn({
        //         'comment_id': '12345',
        //         'score': 3,
        //         'description': 'hello'
        //     });
        // }, 1000)
    }

    // 想买
    function addFavorite (options) {
        var d = options.data;

        ajax({
            type: 'PUT',
            url: '/api/inventories/' + d.property_id + '/wishlist/add',
            data: {
                url: window.location.href
            },
            dataType: 'json',
            success: options.sucFn,
            error: options.errFn
        });
    }

    // 不想买
    function cancelFavorite (options) {
        var d = options.data;
        
        ajax({
            type: 'PUT',
            url: '/api/inventories/' + d.property_id + '/wishlist/remove',
            dataType: 'json',
            success: options.sucFn,
            error: options.errFn
        });

        // options.sucFn({code: 200});
    }

    // 确定已看房
    function completeSchedule (options) {
        var d = options.data;

        ajax({
            type: 'PUT',
            url: '/api/schedules/' + d.id + '/complete',
            dataType: 'json',
            success: options.sucFn,
            error: options.errFn
        });
    }

    // 确定未看房
    function cancelSchedule (options) {
        var d = options.data;

        ajax({
            type: 'PUT',
            url: '/api/schedules/' + d.id + '/cancel',
            data: {
                reason_type: d.reason_type
            },
            dataType: 'json',
            success: options.sucFn,
            error: options.errFn
        });
    }

    //房源列表查看更多
    function getMoreProperty(options) {
        ajax({
            type: 'GET',
            url: '/api/property',
            data: options.pageInfo,
            dataType: 'json',
            success: options.sucFn
        });
    }

    return {
        vote: vote,
        addFavorite: addFavorite,
        cancelFavorite: cancelFavorite,
        cancelSchedule: cancelSchedule,
        completeSchedule: completeSchedule,
        getMoreProperty: getMoreProperty
    };
});
