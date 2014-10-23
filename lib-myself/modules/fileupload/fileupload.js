/*
  文件上传，直接使用new fileUpload(opts)
*/
;(function($) {
	lib.namespace('lib.fileUpload');

	function fileUpload(opts) {
		/*
		  @ fileUrl [String] 文件上传到的服务器的url
		  @ retUrl [String] 后端返回结果的url
		  @ fileEleId [String] 上传文件的input type＝‘file’的元素id
		  @ dataType [String] 后端返回值的类型
		*/
		var defOP = {
			fileUrl: '',
			retUrl: '',
			fileEleId: '',
			dataType: 'json', 
			onSuccess: {},
			onError: {}
		};

		init();

｀		function init() {
			//继承base.js中自定义事件
        	lib.inherit(self, lib.customEvent);
			var options = $.extend({}, defOP, opts);
			var iframeId = 'Iframe_' + (+new Date().getTime());
			var iframe = createIframe(iframeId);
		}

		/*
		  说明：是需要将input type＝'file'进行copy
		  @return 返回的是jquery元素
		*/
		function createForm(formId, fileId, head) {
			var 
		}

		/*
		  @return  返回的是jquery元素
		*/
		function createIframe(iframeId, head) {
			var htmCon = '<iframe name="' + iframeId + '" id="' + iframeId + '"></iframe>';
			head.appendChild(htmCon);
			return $('#' + iframeId);
		}

	}
})(jQuery);