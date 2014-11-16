var fw = require('../../'),
    app = new fw.App();

//http://localhost:3000/about/zhangsan/dfsdf/78测试url，name＝zhangsan,age=78
app.get('/about/:name/*/:age', function(req, res) {
	res.end('My name is ' + req.params.name + '; my age is ' + req.params.age);
});

app.listen(3000);