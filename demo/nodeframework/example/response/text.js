var fw = require('../../'),
	app = new fw.App(),
	text = fw.text;

app.use(text);

app.get('/test', function(req, res) {
	res.text('<h1>hello, I am test example</h1>');
});

app.listen(3000);