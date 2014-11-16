var fw = require('../..'),
	//用的this，所以最好用new
    app = new fw.App(),
    midStatic = fw.static;

app.use(midStatic(__dirname + '/public'));

app.get(function(req, res) {
	res.end('I am get method');
});
app.post(function(req, res) {
	res.end('I am post method');
});

app.listen(3000);
console.log('I am listening');
