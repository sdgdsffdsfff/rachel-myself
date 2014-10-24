/*
  文件上传，直接使用new fileUpload(opts)
*/
;(function($) {
	lib.namespace('lib.fileUpload');
	lib.fileUpload = fileUpload;
	function fileUpload(opts) {
		/*
		  @ fileUrl [String] 文件上传到的服务器的url
		  @ retUrl [String] 后端返回结果的url
		  @ retKey [String] 文件服务器重定向到后端接收参数的key值
		  @ fileEleId [String] 上传文件的input type＝‘file’的元素id
		  @ dataType [String] 后端返回值的类型
		*/
		var defOP = {
			fileUrl: '',
			retUrl: '',
			retKey: 'rt',
			fileEleId: '',
			dataType: 'json', 
			onSuccess: {},
			onFail: {},
			onComplete: {}
		};

		init();

 		function init() {
			//继承base.js中自定义事件
        	lib.inherit(self, lib.customEvent);
			var options = $.extend({}, defOP, opts);
			var t = +new Date().getTime();
			var $body = $(document.body || document.getElementsByTagName('body')[0]);
			var iframeId = 'Iframe_' + t;
			var $iframe = createIframe(iframeId, $body);
			var formId = 'Form_' + t;
			var $form = createForm(formId, options.fileEleId, $body, options.fileUrl, iframeId);
			if (options.retUrl) {
				$form.append('<input type="hidden" name="' + options.retKey + '" value="' + options.retUrl + '">');
			}
			//需要编码才能文件上传成功
			if ($form[0].encoding) {
				$form.attr('encoding', 'multipart/form-data');
			} else {
				$form.attr('enctype', 'multipart/form-data');
			}
			$form[0].submit();
			//拿请求的结果
			$iframe.load(function() {
				processIframeData();
				destoryElements();
			});
			//回来的数据会自动放置在iframe中，直接从iframe中取即可
			function processIframeData() {
				var $ifrm = $('#' + iframeId);
				var data;
				if ($ifrm.contentWindow) {
					var body = $ifrm.contentWindow.document.body;
					data = body ? body.innerHTML : '';
					data = analyzeData(data, options.dataType);
				}
				if (data) {
					options.onSuccess(data);
				} else {
					options.onFail();
				}
				//不论成功与否都需要执行
				options.onComplete(data);
			}

			//删除创建的iframe和form
			function destoryElements() {
				setTimeout(function() {
					$('#' + iframeId).remove();
					$('#' + formId).remove();
				}, 100);
			}
		}

		/*
		  解析传过来的数据，可用于以后数据格式的扩充
		*/
		function analyzeData(data, type) {
			switch(type) {
				case 'json':
					data = eval('(data=' + data + ')');
					break;
				default:

			}
			return data;
		}

		/*
		  说明：是需要将input type＝'file'进行copy
		  @return 返回的是jquery元素
		*/
		function createForm(formId, fileId, $body, action, ifrId) {
			var formHtml = '<form id="' + formId + '" style="position: absolute; left: -2000px; top: -2000px;" action="' + action + '" target="' + ifrId + '" method="POST"></form>';
			var $oldFile = $('#' + fileId);
			var $newFile = $oldFile.clone(true);
			//此处如果是直接把copy的newfile放入form中，$newfile的value是空的,提交拿不到正确的value值
			$newFile.insertBefore($oldFile);
			$oldFile.attr('id', 'upload' + fileId);
			$body.append(formHtml);
			$oldFile.appendTo($('#' + formId));
			return $('#' + formId);
		}

		/*
		  @return  返回的是jquery元素
		*/
		function createIframe(iframeId, $body) {
			var htmCon = '<iframe name="' + iframeId + '" id="' + iframeId + '"></iframe>';
			$body.append(htmCon);
			return $('#' + iframeId);
		}

	}
})(jQuery);