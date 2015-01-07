/**
 *
 * Ajax function,
 *  dependant on: $.ajax
 *
 *  Code Examples:
 *   ajax({
 *       type: 'GET',
 *       url: '',
 *       url: '/api',
 *       data: {name: 'abc'},
 *       success: function(data, status, xhr) {},
 *       error: function(data, errorType, errorMsg, xhr) {}
 *   });
 *
 * @return $.ajax
 *
 */
define('ajax', ['zeptoPlugins'], function() {

    function ajax(options) {

        // default configurations.
        var defaultOptions = {
            dataType: 'json'
        }, callback = {
            success: options.success,
            error: options.error
        };

        options = $.extend(defaultOptions, options);

        //TODO::format request URL here.


        options.success = function(data, status, xhr) {
            (callback.success) ? callback.success(data, status, xhr) : null;
        };
        options.error = function(xhr, errorType, error) {
            var dataType = options.dataType,
                result = xhr.responseText;
            if (dataType === 'json') {
                result = $.parseJSON(result);
                error = result.msg;
            } else if (dataType === 'xml') {
                result = xhr.responseXML;
            }

            (callback.error) ? callback.error(result, errorType, error, xhr) : null;
        };


        return $.ajax(options);
    }

    return ajax;
});