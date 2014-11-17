var fw = require('../../'),
	app = new fw.App(),
	download = fw.download;

app.use(download);

app.get('/down', function(req, res) {
	 var buf = new Buffer('ni hai hao ma');
	 res.download('myfile.txt', buf);
});

app.listen(3000);