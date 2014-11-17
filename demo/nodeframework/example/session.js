var fw = require('../'),
	app = new fw.App(),
	session = fw.session;

//经过该中间件以后，我们时可以直接拿到req.sessionId的
app.use(session);	

app.get('/about', function(req, res) {
	console.log(req.sessionId);
	res.end('sessionId:' + req.sessionId);
});

app.listen(3000);