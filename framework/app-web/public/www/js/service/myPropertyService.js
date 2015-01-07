define(['zepto', 'ajax'], function($, ajax) {
	// 获取专属经纪人
	function getExclusiveBroker(opts) {
		ajax({
			type: 'GET',
			url: '/api/user/commission/' + opts.commissionIds,
			dataType: 'json',
			success: opts.successCb
		});
	}

	// 选择经纪人
	function selectBroker(opts) {
		ajax({
			type: 'PUT',
			url: '/api/user/commission/' + opts.commissionId,
			data: opts.data,
			dataType: 'json',
			success: opts.successCb
		})
	}

	return {
		getExclusiveBroker: getExclusiveBroker,
		selectBroker: selectBroker
	}
});