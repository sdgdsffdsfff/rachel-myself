var fw = require('../../'),
	app = new fw.App();

app.get('/about', function(req, res) {
	res.end('I am a simple route: /about');
});

app.get('/contact/:id/*/:name', function(req, res) {
	res.end('I am a hard route: have many params');
});

app.listen(3000);
