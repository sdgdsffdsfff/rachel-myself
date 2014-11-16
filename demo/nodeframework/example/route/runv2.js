var fw = require('../../'),
    app = new fw.App();

// app.get('/about', function(req, res) {
// 	res.end('I am a route:  /about');
// });

// app.get('/contact', function(req, res) {
// 	res.end('I am a route:  /contact');
// });

var static = fw.static;
app.use(static(__dirname + '/public'));

//因为/public/about.html存在，所以当localhost:3000/about.html请求时，
//App.js中处理完中间件static之后，就直接return了，便不会用get方式去处理。所以只会返回about.html文件中的内容
app.get('/about.html', function(req, res) {
	res.end('I am get method deal!!!');
});

app.listen(3000);
console.log('Application is listening at port: 3000');