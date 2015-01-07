define(['zepto', 'ajax'], function($, ajax) {
	//立即预约,后台跳转
	function orderAjax(opts) {
		ajax({
			type: 'POST',
			url: '/api/inventories/' + opts.propertyId + '/reserving-schedules',
			data: opts.data,
			success: opts.successCb,
			error: opts.errorCb
		});
	}
	
	return {
		orderAjax: orderAjax
	}
});