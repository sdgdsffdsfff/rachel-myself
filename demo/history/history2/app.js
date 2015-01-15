var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

//环境变量
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// 开发模式
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var arrTitles = [
    '111111111111111111111',
    '222222222222222222222',
    '333333333333333333333',
    '444444444444444444444',
    '555555555555555555555'
];

//route
//备注：：(没有做容错处理)
app.get('/index', function(req, res, next) {
    var params = req.url.split('?')[1];
    var num = params ? params.split('=')[1] : 1;
    var title = '', data = [1, 2, 3, 4, 5];
    res.render('index', {
        title: arrTitles[num - 1],
        selectedNum: num,
        items: data
    });
});

//api 请求
app.get('/api/test', function(req, res, next) {
    var num = req.url.split('?')[1].split('=')[1];
    res.send({
        title: arrTitles[num - 1]
    });
});



var server = http.createServer(app).listen(3000);

console.log('serve is listening in 3000.');