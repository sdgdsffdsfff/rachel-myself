###formData解析

通常我们提交（使用submit button）时，会把form中的所有表格元素的name和value组成一个querystring，提交到后台。对于jQuery的方法来说是serialize。但当我们使用Ajax提交时，这过程就需要变成人工的了。因此，FormData对象（XMLHttpRequest2）的出现是会减少我们一些工作量。

一、formData有三种用法

一种是创建全新的FormData对象：
```javascript
var formData = new FormData();
```

一种是获取form表单的FormData对象
```javascript
var form = document.getElementById('form1');
var formData = new FormData(form);
//通过该种方式，可以添加一些不想让用户编辑的固定字段，发送给后端
formData.append('key1', 'value1');
```


或者通过form的getFormData方法（测试不成功，form没有getFormData这个方法）
```javascript
var form = document.getElementById('form1');
var formData = form.getFormData();
```

获取FormData对象后，还需要向其内部插入数据，目前只能使用append:
```javascript
formData.append('pwd', '123456');
```

当将本地数据添加完毕后，可以通过ajax的send方法传送到服务器(注意，以下也可以使用jquery的$.ajax的，不过需要进行正确的设置)
```javascript
var xhr = new XMLHttpRequest();
//第二个参数是需要发送的url（完整的）
xhr.open('get', 'http://localhost/app', true);
xhr.send(formData);
//处理返回的数据
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        console.log(xhr.response);
    }       
}
```
50941905   58893285
```javascript
$.ajax({
    url: '/formData/test',//跨域的url
    type: 'POST',
    data: formData,
    processData: false, //告诉jQuery不要去处理发送的数据
    contentType: false, //告诉jQuery不要去设置Content-Type请求头
    success: function(ret) {
        console.log(ret);
    }
});
```

使用formData发送到服务器端，则可以是跨域的。

二、FormData的应用场景
当我们想要类似于form表单提交，但是又想要对返回的结果进行处理，则之前是使用iframe进行处理，很麻烦。随着时代的进步，我们可以使用formData简单实现了，使用append向formData中插入key－value。然后可以使用XMLHttpRequest进行提交（jquery也ok），并对返回的结果进行处理。一个很典型的例子就是：无刷新文件上传。

formData的key对应value值可以是二进制数据（如File对象），或者Blob对象(二进制大数据)


####File API解析

一、文件读取函数：

1. readAsBinaryString(Blob blob);  → 传入一个Blob对象，然后读取数据的结果作为二进制字符串的形式放到FileReader的result属性中。
2. readAsText(Blob blob, optional DOMString encoding);→第一个参数传入Blog对象，然后第二个参数传入编码格式，异步将数据读取成功后放到result属性中，读取的内容是普通的文本字符串的形式。
3. readAsDataURL(Blob blob);→传入一个Blob对象，读取内容可以做为URL属性，也就是说可以将一个图片的结果指向给一个img的src属性。它适合读取图片文件，读取出来的是base64编码，赋值给src,就可以正常显示文件了。


二、文件读取事件

1. onloadstart：文件读取开始时候触发
2. onprogress = function(progress): 当读取进行时定时触发。事件参数中会含有已读取的总数据量。
3. onabort: 当读取被终止时候触发
4. onerror: 当读取出错时候触发
5. onload: 当读取成功完成时触发
6. onloadend：当读取完成时，无论成功与失败都会触发

####拖拽事件

一、拖拽事件有如下：

1. dragstart: 当用户开始拖动对象时触发
2. dragenter: 当鼠标第一次经过目标元素，且有拖动发生时触发。此事件的监听者应指明在这个位置上是否允许drop，或者监听者不执行任何操作，那么drop默认时不允许的。
3. dragover：当鼠标经过一个元素时，且有拖动发生时触发。
4. dragleave：当鼠标经过一个元素，且有拖动在发生时触发。
5. drag：当对象被拖动，每次移动鼠标时触发。
6. drop：在drag操作的最后发生drop时，在元素上触发此事件。监听者应该负责检索拖动的数据，并插入drop的位置。
7. dragend：在拖动对象时放开鼠标按键时触发。

总结：从浏览器外拖拽文件到浏览器时，必须要绑定的事件有dragover和drop，其他的都可以不绑定。且在dragover和drop事件的处理函数内必须调用事件的preventDefault()函数，要不然浏览器进行默认处理，比如文本类型的文件直接打开，非文本的可能弹出一个下载文件框。

二、DataTransfer对象

拖拽对象时用来传递数据的媒介，通过拖拽事件的event.dataTransfer获取。

1. dataTransfer.dropEffect [ = value ]: 返回当前选择的操作类型。可以设置新的值来修改已选择的操作。可选的值有：none, copy, link, move。
2. dataTransfer.effectAllowed [ = value ]：返回允许的操作类型，可修改。可选的值有：none, copy, copyLink, copyMove, link, linkMove, move, all, uninitialized。
3. dataTransfer.types: 返回一个DOMString,列出在dragstart事件里设置的所有格式。另外，如果有文件被拖动，那么其中一个类型的字符串将是”Files“。
4. dataTransfer.clearData([format]): 移除指定格式的数据。如果忽略参数则移除所有数据。
5. dataTransfer.setData(format, data)：添加指定的数据。
6. data = dataTransfer.getData(formate)：返回指定的数据。如果没有这样的数据，则返回空字符串。
7. dataTransfer.files：返回被拖拽的FileList,如果有的话。
8. dataTransfer.setDragImage(element, x, y)：用指定的元素来更新drag反馈，替换之前指定的返回。
9. dataTransfer.addElement(element): 添加指定元素到用于渲染drag反馈的元素列表。

总结：在这个用例里，最重要的是dataTransfer.files属性，它是用户拖拽进浏览器的文件列表，是个FileList对象，有length属性，可以通过下标访问。

####所有总结
1. 由所有例子可以看出：我们可以通过var reader = new FileReader()。给reader绑定事件onprogress等文件读取事件。我们在上传文件过程中也是有与reader文件读取事件类似的事件，如下：
```html
1. progress事件：进度信息
    - lengthComputable: 可计算的已上传字节数
    - total: 总的字节数
    - loaded: 到目前为止上传的字节数
2. load事件：传输成功完成
3. abort事件：传输被用户取消
4. error事件： 传输中出现错误
5. loadstart事件： 传输开始
6. loadend事件： 传输结束，但是不知道成功还是失败
```
同progress事件一样，属于上传操作的事件处理函数绑定在XMLHttpRequest.upload对象上，属性下载的直接绑定在XMLHttpRequest对象。

2. view/drag-file.ejs例子中，如果我们用aifang.test:3009/file/drag访问，则会出现跨域的问题，错误信息如下：
```html
 OPTIONS http://localhost:3009/drag/file/upload 
drag:1 XMLHttpRequest cannot load http://localhost:3009/drag/file/upload. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://aifang.test:3009' is therefore not allowed access. The response had HTTP status code 404.
```
具体的解决跨域方案，可以在之前总结中查看到。

#####浏览器对跨域请求的处理：
当浏览器要执行一个跨域请求资源时，分两步来执行：
1. 首先用HTTP OPTIONS方法请求该资源，获取响应头，这一步不会携带实际的参数。如果响应头有Access-Control-allow-Origin域，且其值为＊或者与请求头的Origin域的值进行同源检测时同源的，则进行第二步，否则终止请求。补充知识点：OPTIONS方法，用途：允许客户端查看服务器的性能。
2. 在还有第二步的情况下，发送实际的请求去获取资源。

测试案例url:http://coderbee.net/html5/crossdomain.html

可以很明显的看到，第一个例子是跨域的，上传一次，有两个请求，只有第二个才是真正带了参数进行请求的。

3. 我们简单的FormData数据提交，是不会有跨域问题出现（即使不同源）。而xhr的upload上传文件上传时，不同源，就会有跨域问题。

####XMLHttpRequest新老版本的对比

老版本的主要属性如下：
```html
   xhr.readyState：XMLHttpRequest对象的状态，等于4表示数据已经接收完毕。
   xhr.status：服务器返回的状态码，等于200表示一切正常。
   xhr.responseText：服务器返回的文本数据
   xhr.responseXML：服务器返回的XML格式的数据
   xhr.statusText：服务器返回的状态文本。
```

老版本的缺点如下：
```html
   * 只支持文本数据的传送，无法用来读取和上传二进制文件。
　 * 传送和接收数据时，没有进度信息，只能提示有没有完成。
　 * 受到"同域限制"（Same Origin Policy），只能向同一域名的服务器请求数据。
```

新版本的功能
```html
   * 可以设置HTTP请求的时限。
　　* 可以使用FormData对象管理表单数据。
　　* 可以上传文件。
　　* 可以请求不同域名下的数据（跨域请求）。
　　* 可以获取服务器端的二进制数据。
　　* 可以获得数据传输的进度信息。
```

一、HTTP请求的时限

有时，ajax操作很耗时，而且无法预知要花多少时间。如果网速很慢，用户可能要等很久。
新版本的XMLHttpRequest对象，增加了timeout属性，可以设置HTTP请求的时限。
```javascript
xhr.timeout = 3000;
```
上面的语句，将最长等待时间设为3000毫秒。过了这个时限，就自动停止HTTP请求。与之配套的还有一个timeout事件，用来指定回调函数。
```javascript
　　xhr.ontimeout = function(event){
　　　　alert('请求超时！');
　　}
```
目前，Opera、Firefox和IE 10支持该属性，IE 8和IE 9的这个属性属于XDomainRequest对象，而Chrome和Safari还不支持。

二、跨域资源共享（CORS）

新版本的XMLHttpRequest对象，可以向不同域名的服务器发出HTTP请求。这叫做"跨域资源共享"（Cross-origin resource sharing，简称CORS）。

使用"跨域资源共享"的前提，是浏览器必须支持这个功能，而且服务器端必须同意这种"跨域"。如果能够满足上面的条件，则代码的写法与不跨域的请求完全一样。
```javascript
　　xhr.open('GET', 'http://other.server/and/path/to/script');
```
目前，除了IE 8和IE 9，主流浏览器都支持CORS，IE 10也将支持这个功能.

三、接收二进制数据（方法A：改写MIMEType）

老版本的XMLHttpRequest对象，只能从服务器取回文本数据（否则它的名字就不用XML起首了），新版则可以取回二进制数据。

这里又分成两种做法。较老的做法是改写数据的MIMEType，将服务器返回的二进制数据伪装成文本数据，并且告诉浏览器这是用户自定义的字符集。
```javascript
　　xhr.overrideMimeType("text/plain; charset=x-user-defined");
```
然后，用responseText属性接收服务器返回的二进制数据。
```javascript
　　var binStr = xhr.responseText;
```
由于这时，浏览器把它当做文本数据，所以还必须再一个个字节地还原成二进制数据。
```javascript
　for (var i = 0, len = binStr.length; i < len; ++i) {
　　　　var c = binStr.charCodeAt(i);
　　　　var byte = c & 0xff;
　　}
```
最后一行的位运算"c & 0xff"，表示在每个字符的两个字节之中，只保留后一个字节，将前一个字节扔掉。原因是浏览器解读字符的时候，会把字符自动解读成Unicode的0xF700-0xF7ff区段。

四、接收二进制数据（方法B：responseType属性）

从服务器取回二进制数据，较新的方法是使用新增的responseType属性。如果服务器返回文本数据，这个属性的值是"TEXT"，这是默认值。较新的浏览器还支持其他值，也就是说，可以接收其他格式的数据。

你可以把responseType设为blob，表示服务器传回的是二进制对象。
```javascript
　　var xhr = new XMLHttpRequest();
　　xhr.open('GET', '/path/to/image.png');
　　xhr.responseType = 'blob';
```
接收数据的时候，用浏览器自带的Blob对象即可。
```javascript
　　var blob = new Blob([xhr.response], {type: 'image/png'});
```
注意，是读取xhr.response，而不是xhr.responseText。

你还可以将responseType设为arraybuffer，把二进制数据装在一个数组里。
```javascript
    var xhr = new XMLHttpRequest();
　　xhr.open('GET', '/path/to/image.png');
　　xhr.responseType = "arraybuffer";
```
接收数据的时候，需要遍历这个数组。
```javascript
　　var arrayBuffer = xhr.response;
　　if (arrayBuffer) {
　　　　var byteArray = new Uint8Array(arrayBuffer);
　　　　for (var i = 0; i < byteArray.byteLength; i++) {
　　　　　　// do something
　　　　}
　　}
```

五、进度信息
新版本的XMLHttpRequest对象，传送数据的时候，有一个progress事件，用来返回进度信息。
它分成上传和下载两种情况。下载的progress事件属于XMLHttpRequest对象，上传的progress事件属于XMLHttpRequest.upload对象。

我们先定义progress事件的回调函数。
```javascript
　　xhr.onprogress = updateProgress;
　　xhr.upload.onprogress = updateProgress;
```
然后，在回调函数里面，使用这个事件的一些属性。
```javascript
　　function updateProgress(event) {
　　　　if (event.lengthComputable) {
　　　　　　var percentComplete = event.loaded / event.total;
　　　　}
　　}
```
上面的代码中，event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0。

与progress事件相关的，还有其他五个事件，可以分别指定回调函数：
```html
　　* load事件：传输成功完成。
　　* abort事件：传输被用户取消。
　　* error事件：传输中出现错误。
　　* loadstart事件：传输开始。
　　* loadEnd事件：传输结束，但是不知道成功还是失败。
```


