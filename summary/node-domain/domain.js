function async_error() {
    setTimeout(function() {
		var num = Math.random() * 10;
		console.log('async num:' + num);
		if (num > 5) {
		    throw new Error('async Error: num is ' + num);		
		}		
	}, 100);		
}

function sync_error() {
    var num = Math.random() * 10;
	console.log('sync num:' + num);
	if (num > 5) {
	    throw new Error('sync Error: num is ' + num);		
	}		
}

var domain = require('domain');

var d = domain.create();
d.on('error', function(err) {
    console.log(err);		
});

setInterval(function() {
    d.run(async_error);
	d.run(sync_error);		
}, 1000);
