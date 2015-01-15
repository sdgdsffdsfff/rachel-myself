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

var list = [
    'name----11111',
    'name----22222',
    'name----33333',
    'name----44444',
    'name----55555',
    'name----66666',
    'name----77777',
    'name----88888',
    'name----99999',
    'name----AAAAA',
    'name----BBBBB',
    'name----CCCCC',
    'name----DDDDD',
    'name----EEEEE',
    'name----FFFFF'

];

//route
//备注：：(没有做容错处理)
app.get('/list', function(req, res, next) {
    var params = req.url.split('?')[1];
    var page = params && params.split('=')[1];
    var items = [];
    if (page && page == 2) {
        items = list.slice(0, 11);
    } else {
        items = list.slice(0, 6);
    }
    res.render('index', {items: items});
});

app.get('/detail', function(req, res, next) {
    res.render('detail');
});

app.get('/getMore', function(req, res, next) {
    res.send({
        items: list.slice(6, 11)
    })
});

var server = http.createServer(app).listen(3000);

console.log('serve is listening in 3000.');