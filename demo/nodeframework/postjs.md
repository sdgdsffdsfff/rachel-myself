###文件上传原理

####上传的数据结构
文件上传一般通过表单上传，因数据量比较大，采用post方式。且表单的写法与一般的也有些区别，如下：
```javascript
<form method="post" action="..." enctype="multipart/form-data">
```

如果表单想要支持文件上传，就必须要有enctype="multipart/form-data"属性。至于上传的数据结构，我们可以通过以下案例，测试拿到请求数据结构。

表单代码：
```javascript
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>post.js中间件测试案例</title>
</head>
<body>
    <!-- enctype="multipart/form-data" 不能少-->
    <form action="/filepost" method="post" enctype="multipart/form-data">
        <p>Title: <input type='type' name='title'></p>
        <p>Content: <textarea name="content"></textarea></p>
        <p>File Upload: <input type="file" name='file'></p>
        <p><input type="submit"></p>
    </form>
</body>
</html>
```

对应服务器代码（依赖之前写的nodeframework框架）：
```javascript
var fw = require('../../'),
    app = new fw.App(),
    static = fw.static;

app.use(static(__dirname + '/public'));

app.post('/filepost', function(req, res) {
    var body_data = '';
    req.on('data', function(chunk) {
        body_data += chunk;
    });
    req.on('end', function() {
        console.log('2121');
        // console.log(body_data.toString());//数据量比较大，最好不要在终端打印，可以通过浏览器查看
        res.end(body_data.toString());
    });
});

app.listen(3000);
```

通过运行可看到服务器端打印，或者浏览器端请求数据部分：
```javascript
Request Headers
    Content-Type: multipart/form-data;boundary=----WebKitFormBoundary8TesGysMwdJZabjQ
Request Payload
    ------WebKitFormBoundary8TesGysMwdJZabjQ  \r\n
    Content-Disposition: form-data;name="title" \r\n\r\n

    title \r\n
    ------WebKitFormBoundary8TesGysMwdJZabjQ  \r\n
    Content-Disposition: form-data;name="content" \r\n\r\n

    content \r\n
    ------WebKitFormBoundary8TesGysMwdJZabjQ  \r\n
    Content-Disposition: form-data;name="img"; filename="bigImg.png" \r\n
    Content-Type: image/png  \r\n\r\n

    (图片数据) \r\n
    ------WebKitFormBoundary8TesGysMwdJZabjQ--  \r\n
```

通过上述列出的数据部分，可知：Content-Disposition:form-data;name="content"的信息头和信息体之间是\r\n\r\n。此处的信息分隔字符串是：----WebKitFormBoundary8TesGysMwdJZabjQ（这个分隔符，每次提交都是不一样的）。我们是可以通过req.headers['Content-Type']得到的，不过仍需处理。

####切割分类数据
如果我们想要切割上述的数据结构，则需要先通过Content-Type解析出边界字符串，通过这个边界字符串，就可以把上传的这些数据按照字段进行分割。
<br>从content-type中解析出boundary边界字符串
```javascript
var contentType = req.headers['Content-Type'];
/(boundary=)/gi.test(contentType);//这是为了下一步通过RegExp["$'"]获取boundary
var boundary = RegExp["$'"];//便可以获得boundary为----WebKitFormBoundary8TesGysMwdJZabjQ
```

服务器端如何判断表单是否设置了enctype="multipart/form-data"属性。
```javascript
var isMulti = /(boundary=)/gi.test(contentType);
```

通过对数据部分的研究，可以发现，真正的边界字符串是在boundary值的基础上最开始部分加了“--”，且最后的一个边界字符串不仅前面加了"--"，最后也加了“--”。下面处理边界字符串：
```javascript
var boundaryStandard = "--" + boundary + "\r\n";
var boundaryEnd = boundaryStandard + "--";
```

去掉头尾边界字符串，保存整个上传的body体数据。然后再按照boundaryStandard字符串划分，分割后保存到一个数组中。
```javascript
//删除头尾边界字符串
body_data = body_data.substring(boundaryStandard.length, body_data.length - boundaryEnd.length);
//按照字段分割
var fields = body_data.split(boundaryStandard);
```

####解析分类数据
表单的字段有两种：一个是普通的表单字段，另一个是二进制文件。二者区别在于字段信息头。
<br>普通表单信息头：
```javascript
Content-Disposition: form-data;name="title" \r\n\r\n
```

二进制文件信息头：
```javascript
Content-Disposition: form-data;name="img"; filename="bigImg.png" \r\n
Content-Type: image/png  \r\n\r\n
```

解析过程原理：把二进制文件信息保存到req.files［files］（通过new Buffer(字符串)的方式将文件信息转成二进制对象），普通表单字段保存到req.body[bodys]中。
```javascript
var RN = '\r\n\r\n';
var files = {};
var bodys = {};
fields.forEach(function(field) {
    var index = field.indexOf(RN);
    //解析出头信息
    var header = field.substring(0, index);
    //从头信息中解析出表单字段名称，也就是表单的name属性值
    /name＝\"(.*?)\"/g.test(header);
    var fieldName = RegExp.$1;

    //判断是上传的文件，还是普通表单字段
    var isFile = /filename/g.test(header);

    //解析出数据体
    var body = field.substring(index + RN.length);
    body = body.substring(0, body.length - RN.length / 2);//去除结尾的"\r\n"

    if (isFile) {
        files[fieldName] = new Buffer(body);
    } else {
        bodys[fieldName] = body;
    }
});
```