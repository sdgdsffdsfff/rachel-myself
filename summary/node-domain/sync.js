setInterval(function() {
	try {
		sync_error();
	} catch(e) {
	    console.log(e);		
	}
}, 1000);

function sync_error() {
	var num = Math.random() * 10;
	console.log('current num is : ' + num);
	if (num > 5) {
		throw new Error('Error: num is ' + num);	
	}		
}
