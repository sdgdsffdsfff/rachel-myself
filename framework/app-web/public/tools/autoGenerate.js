var fs = require("fs");


var dependencies = [];
function getDependence(file) {

//    fs.readFile(file, 'utf-8', function (err, data) {
//        if (err) throw err;
//
//        //dependencies.push(parseFile(data));
//        console.log(parseFile(data));
//
//    });
    // read sync.
    var content = fs.readFileSync(file, 'utf-8');
    var dependence = parseFile(content);
    return dependence;
}


function parseFile(content) {
    var results = content.match(/\[(.*?)\]/g);
    return results ? results[1] : '[]';
}


/**
 *  {
        //module names are relative to baseUrl/paths config
        name: '../example-home',
        include: ['ui.calendar','app/example-home'],
        exclude: ['../common']
    },

 * @param dir
 */
function parseDir(dir) {
    var files = fs.readdirSync(dir),
        dependencies = '';

    var file, filename, content;
    for (var i = 0,len = files.length; i < len; i++) {
        file = files[i];
        if (file != 'common.js' && /\.js/.test(file)) {
            filename = file.substr(0, file.length - 3);
            content = _buildTemplate(filename, getDependence(dir + '/' + file)) + ((i < len-1) ? ',\n' : '');
            //console.log(content);
            dependencies += content;
        }
    }

    return dependencies;
}



function _buildTemplate(file, dependencies) {
    return '        {\n' +
        '           name: "../' + file + '",\n' +
        '           include: ' + dependencies + ',\n' +
        '           exclude: ["../common"]\n' +
        '        }';
}

(function (dir) {
    var dependenciesContent = parseDir(dir);

    fs.writeFile('./tools/dependencies.txt', dependenciesContent,function(err){
        if (err) {
            throw err;
        }
        console.log('It\'s done.');
    });
})('./www');