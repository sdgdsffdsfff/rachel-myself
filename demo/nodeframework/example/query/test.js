var fw = require('../../'),
	app = new fw.App(),
	query = fw.query;

//先注册，等有请求过来的时候，回去执行query这个中间件的具体内容，且将请求url中对应的query挂载到req.query上
app.use(query);

app.get('/about', function(req, res) {
	res.end('I am a route: /about');
});

//测试的例子：http://localhost:3000/myname?name="zhangsan"&age=24
app.get('/myname', function(req, res) {
	res.end('My name is ' + req.query.name + '; age is ' + req.query.age);
});

app.listen(3000);
