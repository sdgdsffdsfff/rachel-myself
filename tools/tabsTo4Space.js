/**
    该脚本的使用方法: node tabsTo4Space.js 需要解析的目录名（或者文件名，全路径或者相对于当前该js文件的相对路径）
*/

;(function() {
    var fs = require('fs');
    var path = require('path');

    var dirname = '/Users/benlinhuo/workspace/aifang/app-web/public/www/js/buyer-schedule.js';//测试，可以写死一个目录，或者是文件
    var arguments = process.argv.splice(2);

    dirname = (!!arguments.length) ? arguments[0] : '';

    operateDir(dirname);

    function operateDir(dirname) {
        dirname = getPath(dirname);
        if (!fs.existsSync(dirname)) {
            return null;
        }
        var stat = fs.lstatSync(dirname);
        if (stat.isDirectory()) {
            //目录
            var files = fs.readdirSync(dirname);
            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var childFile = path.normalize(dirname + '/' + files[i]);
                    var childStat = fs.lstatSync(childFile);
                    if (childStat.isDirectory()) {
                        operateDir(childFile);
                    } else {
                        translateTabTo4Space(path.normalize(dirname + '/' + files[i]));
                    }
                }
            }

        } else {
            //文件
            translateTabTo4Space(dirname);
        }
    }

    //将一个文件的所有tab转化为4个空格
    function translateTabTo4Space(filename) {
        var content = fs.readFileSync(filename, 'utf-8');
        if (/\t/.test(content)) {
            content = content.replace(/\t/g, '    ');//替换的字符是四个手打的空格
            writeToFile(filename, content);
        }
    }

    /** 将内容写入到文件中
     *  @param file 写入的文件名
     *  @param content  需要写入文件的内容
     */
    function writeToFile(file, content) {
        fs.writeFile(file, content, function(err) {
            if (err) {
                console.log(file + '    写入文件出错!!');
            }
            console.log(file + '    写入文件成功~~');
        });
    }


    //判断是否是相对路径
    function getPath(dirname) {
        var reg = /^///;
        if (!reg.test(dirname)) {
            return path.normalize(__dirname + '/' + dirname);
        }
        return dirname;
    }


})();