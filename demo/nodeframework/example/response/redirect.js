var fw = require('../../'),
	app = new fw.App(),
	redirect = fw.redirect;

app.use(redirect);

app.get('/url1', function(req, res) {
	res.redirect('http://www.baidu.com');
});

app.get('/url2', function(req, res) {
	res.redirect('/url-2');
});

app.get('/url3', function(req, res) {
	res.redirect('url3');
});

app.listen(3000);