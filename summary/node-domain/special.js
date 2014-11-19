var domain = require('domain'),
	EventEmitter = require('events').EventEmitter;

var e = new EventEmitter();

var timer = setTimeout(function() {
    e.emit('data');		
});

function next() {
    e.once('data', function() {
	    throw new Error('Receive data error!');		
	});
}

var d = domain.create();
d.on('error', console.error);

d.run(next);
