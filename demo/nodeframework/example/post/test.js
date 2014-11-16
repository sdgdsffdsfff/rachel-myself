var fw = require('../../'),
	app = new fw.App(),
	static = fw.static,
	post = fw.post;

app.use(static(__dirname + '/public'));
app.use(post);

app.post('/post', function(req, res) {
	console.log(req.body, 'body');
	// res.write('It is successful~~~' + '\n');
	// res.write('Title: ' + req.body.title + '\n');
	// res.write('Content: ' + req.body.content + '\n');
	res.end('sdfsdf');
	console.log('kkkkk')
});

app.listen(3000);