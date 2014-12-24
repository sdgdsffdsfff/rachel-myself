var fabonacci = function(n) {
	return (n < 2) ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
}

onmessage = function(evt) {
	var n = parseInt(evt.data);
	var ret = fabonacci(n);
	postMessage(ret);
}