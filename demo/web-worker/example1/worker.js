onmessage = function(evt) {
	var d = evt.data;
	console.log('I am a worker. The data is ', d);
	postMessage(d);//发送数据给主线程
}