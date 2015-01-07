(function() {
	var fs = require('fs');
	var path = require('path');
	var filePath = path.normalize(__dirname + '/../../app/config/local/page.php');

	changeConfig(filePath);
	/** 
     *  更改配置 
	 *	@file 文件名称
	 *	@return  更改后的内容重新写入该文件
     */
    function changeConfig(file) {
    	var content = fs.readFileSync(file, 'utf-8');
    	var reghost = /\'host\'\s*\=\>\s*\'(\S*)\'\,/;
    	var regdebug = /\'debug\'\s*\=\>\s*(\S*)\,/;

    	content = replaceContent(reghost, content, "'host' => '/www-built'");
    	content = replaceContent(regdebug, content, "'debug' => false");
   		writeToFile(file, content);
    }

    /**
     *  用正则表达式，替换文件内容
	 *  @param reg 正则表达式
	 *  @content 需要替换的内容 string
	 *  @replace  替换成该字符
	 *  @return 返回替换后的字符
    */
    function replaceContent(reg, content, replace) {
    	var ret = content.replace(reg, function(allMatch, bracketsMatch) {
    		return replace;
    	});
    	return ret;
    }

    /** 将内容写入到文件中
     *  @param file 写入的文件名
     *  @param content  需要写入文件的内容
     */
    function writeToFile(file, content) {
    	fs.writeFile(file, content, function(err) {
    		if (err) {
    			console.log('更新config文件出错!!');
    		}
    		console.log('更新config文件成功~~');
    	});
    }

})();