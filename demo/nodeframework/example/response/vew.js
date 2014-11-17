var fw = require('../../'),
	app = new fw.App(),
	view = fw.view;

app.use(view(__dirname + '/views'));

app.get('/', function(req, res) {
	res.view("index.html", {
		title: 'index page', 
		name: "leo"
	});
});

app.get('/about', function(req, res) {
	var info = [
		["Name", "Leo"],
		["Tel", "4234234"],
		["Card", "2341212"]
	];
	res.view('about.html', {
		title: 'about me info',
		info: info
	});
});

app.listen(3000);