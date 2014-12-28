
module.exports = function (app) {
	app.get('/', function(req, res, next) {
		res.render('form-data');
	});

	app.get('/file/api/1', function(req, res, next) {
		res.render('file-api');
	});

	app.get('/file/api/2', function(req,res, next) {
		res.render('file-api2');
	});	

	app.get('/file/drag', function(req, res, next) {
		res.render('drag-file');
	});

	app.post('/formData/test', function(req, res, next) {
		console.log(req.body);
		res.send(req.body);
	});

	app.post('/upload/file', function(req, res, next) {
		console.log(req.files, 'files');
		res.end('success');
	});

	app.post('/drag/file/upload', function(req, res, next) {
		console.log(req.files, 'drag file');
		// res.setHeader('Access-Control-Allow-Origin', '*');
		res.end('sucess drag file');
	});
}


