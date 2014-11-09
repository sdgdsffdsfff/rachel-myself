####multipart中间件

意义：针对提交文件表单（其中有非文件表单）后，通过该中间件的处理，我们可以通过req.files来获取文件表单的内容，req.body来获取该提交中非文件表单的内容。

特殊表单：与普通表单相比较，它可以有file类型的空间，以及需要指定表单属性enctype为multipart/form-data
```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <label for='username'>Username:</label><input type="text" name="username" id='username'>
    <label for='file'>Filename:</label><input type="file" name="file" id='file'>
    <input type="submit" name="submit" value="submit">    
</form>
```

浏览器在遇到multipart/form-data表单提交时，构造的请求报文与普通表单完全不同。首先它的报文头最为特殊：
```javascript
Content-Type: multipart/form-data;boundary=AaB03x
Content-Length:18231
```
该Response Headers代表着，本次提交的内容是由多部分组成，其中boundary指定的是每部分内容的边界符。Content-Length的值必须确保是报文体的长度。

假设我们选择了test.js文件上传。则以下为其请求报文头：
```javascript
--AaB03x\r\n//边界，以下是普通的表单控件
Content-Disposition: form-data;name='username'\r\n
\r\n
Jackson Tian\r\n

--AaB03x\r\n//边界，以下为文件控件形成的报文（多了filename）

Content-Disposition: form-data;name='file';filename='test.js'\r\n
Content-Type: application/javascript\r\n
\r\n
...contents of test.js...
--AaB03x\r\n
```

针对文件上传内容的解析，不同于普通表单和json（只需要先接收内容再解析即可），不过它也做了limit限制。具体解析过程如下代码：
```javascript
exports = module.exports = function(options){
  var limit = options.limit
    ? _limit(options.limit)
    : noop;

  return function multipart(req, res, next) {
    req.body = req.body || {};
    req.files = req.files || {};

    // ignore GET
    if ('GET' == req.method || 'HEAD' == req.method) return next();

    // check Content-Type
    if ('multipart/form-data' != utils.mime(req)) return next();

    // parse
    limit(req, res, function(err){
     //formidable模块，是基于流式处理解析报文，将接收到的文件写入到系统的临时文件夹中，并返回对应的路径
      var form = new formidable.IncomingForm
        , data = {}
        , files = {}
        , done;

      Object.keys(options).forEach(function(key){
        form[key] = options[key];
      });

      function ondata(name, val, data){
        if (Array.isArray(data[name])) {
          data[name].push(val);
        } else if (data[name]) {
          data[name] = [data[name], val];
        } else {
          data[name] = val;
        }
      }

     //用于接收普通表单控件提交的数据，监听的是field事件
      form.on('field', function(name, val){
        ondata(name, val, data);
      });

     //用于接收文件表单控件提交的数据，监听的是file事件
      form.on('file', function(name, val){
        ondata(name, val, files);
      });

      form.on('error', function(err){
        if (!options.defer) {
          err.status = 400;
          next(err);
        }
        done = true;
      });

     //在结束时刻，将之前接收到的数据分别赋给req.body和req.files
      form.on('end', function(){
        if (done) return;
        try {
          req.body = qs.parse(data);
          req.files = qs.parse(files);
          if (!options.defer) next();
        } catch (err) {
          form.emit('error', err);
        }
      });

      form.parse(req);

      if (options.defer) {
        req.form = form;
        next();
      }
    });
  }
};
```