var fw = require('../../'),
	app = new fw.App(),
	fs = require('fs'),
	static = fw.static,
	post = fw.post;

app.use(static(__dirname + '/public'));

app.use(post);

app.post('/filepost', function(req, res) {
	//将读取到的文件内容存储到public/file-upload.txt
	fs.writeFile(__dirname + '/public/file-upload.txt', req.files.file, function() {
		res.write('Title:' + req.body.title + '\n');
		res.write('Content:' + req.body.content + '\n');
		console.log(res.end);
		res.end('write success!!!!');
	});
});

app.listen(3000);