(function() {
    var dirname = __dirname; ///Users/quentin/Desktop/workspace/project/planb/aifang/app-web/public/tools
    var autoGenerate = require(dirname + '/src/autoGenerate.js').autoGenerate;//TODO::Find out why.

    // auto generating build source file.
    autoGenerate.updateScript({
        dir: dirname + '/../www',
        output: dirname + '/build.js'
    });
})();









