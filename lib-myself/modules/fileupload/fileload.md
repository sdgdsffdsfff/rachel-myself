一. 原理（兼容ie6等低浏览器版本）
	文件上传的原理就是：动态创建一个iframe（createIframe），同时动态创建一个form，让后端返回的内容展现在iframe中。form提交表单与当前页面域名不同，而iframe是与当前域名相同的。当我们通过form把表单提交到文件服务器后，文件服务器会对该请求做一定分析，然后返回结果（实际是重定向，重定向一个请求，
	如：http://d.anjuke.com/rent/imageupload/?q=%7B%22status%22%3A%22ok%22%2C%22image%22%3A%7B%22host%22%3A1%2C%22id%22%3A%22542bb62bf2fba4c787ba9d16741b1f50%22%2C%22width%22%3A594%2C%22height%22%3A315%2C%22size%22%3A47747%2C%22hash%22%3A%22542bb62bf2fba4c787ba9d16741b1f50%22%2C%22format%22%3A%22JPEG%22%2C%22exists%22%3A1%2C%22exif%22%3A%22a%3A8%3A%7Bs%3A12%3A%5C%22FileDateTime%5C%22%3Bs%3A10%3A%5C%221414071997%5C%22%3Bs%3A8%3A%5C%22FileSize%5C%22%3Bs%3A5%3A%5C%2247747%5C%22%3Bs%3A8%3A%5C%22MimeType%5C%22%3Bs%3A10%3A%5C%22image%5C%2Fjpeg%5C%22%3Bs%3A4%3A%5C%22Make%5C%22%3Bs%3A0%3A%5C%22%5C%22%3Bs%3A5%3A%5C%22Model%5C%22%3Bs%3A0%3A%5C%22%5C%22%3Bs%3A8%3A%5C%22Software%5C%22%3Bs%3A0%3A%5C%22%5C%22%3Bs%3A8%3A%5C%22DateTime%5C%22%3Bs%3A10%3A%5C%221414071997%5C%22%3Bs%3A9%3A%5C%22copyright%5C%22%3Bi%3A0%3B%7D%22%7D%7D。

	该请求被前端接受后会自动往我们当前页面对应的后端发送该请求，后端对该结果原封不动的返回给前台，实现post跨域。这样前台因为同域就可以获取iframe中返回的结果）。这是个典型的post跨域的例子，同时经过了后端进行中转。

二.  使用介绍
该组件是可以兼容ie6的