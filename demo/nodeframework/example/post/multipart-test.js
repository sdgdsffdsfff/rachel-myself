var fw = require('../../'),
    app = new fw.App(),
    static = fw.static;

app.use(static(__dirname + '/public'));

app.post('/filepost', function(req, res) {
	var body_data = '';
	req.on('data', function(chunk) {
		body_data += chunk;
	});
	req.on('end', function() {
		console.log('2121');
		// console.log(body_data.toString());//数据量比较大，最好不要在终端打印，可以通过浏览器查看
		res.end(body_data.toString());
	});
});

app.listen(3000);