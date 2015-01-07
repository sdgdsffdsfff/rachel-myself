爱房代码库Web
==============

安装
----
首先运行`composer update`下载依赖的第三方类库。

Laravel规定了项目的目录结构，如下：
```
.
├── app 项目代码目录
│   ├── commands 自定义命令
│   ├── config 配置目录
│   ├── controllers 控制器
│   ├── database 数据库相关，包括迁移脚本和数据导入脚本
│   ├── filters.php 过滤器（拦截器）
│   ├── lang 国际化支持
│   ├── models 模型类
│   ├── routes.php 路由表
│   ├── start
│   ├── storage 临时文件、日志文件等
│   ├── tests 单元测试用例
│   └── views 视图模板
├── artisan 脚手架！重点工具
├── bootstrap 启动相关脚本
├── composer.json 项目依赖配置文件
├── phpunit.xml 单元测试配置文件
├── public 静态资源目录
├── server.php
└── vendor 第三方依赖库
```

app-demo文件夹为大家提供了一个样板实例，大家可以通过复制一份此目录开始新的开发。

模型定义和业务逻辑都放到../core目录，命名空间统一使用`Aifang`，使用[PSR-0](http://www.php-fig.org/psr/psr-0/)实现自动加载。

控制器放到app/controllers目录，项目相关的命令类放到app/commands，测试用例放到app/tests目录，均遵循[PSR-0](http://www.php-fig.org/psr/psr-0/)规范。

如果报类名找不到的错误，请运行`composer dump-autoload`。

配置
----

配置文件都放在app/config目录，
可以通过`Config::get('filename.keyname.subkeyname')`读取。

Laravel使用环境来区分不同的场景。
其判断环境的逻辑默认在`bootstrap\start.php`文件，如下：
```
$env = $app->detectenvironment(array(

    'local' => array('homestead'),
    'staging' => ['hostname1', 'hostname2'],

));
```
注意上述数组的结构，键名为环境名（testing保留，不要使用），键值为*主机名*列表。

一旦确定了环境名，Laravel就会加载相关环境的配置。
`app/config`中的配置是默认配置。
对于环境xx，我们可以创建目录`app/config/xx`，并在其中创建同名配置文件，就可覆盖外围的默认配置。

对于一些敏感的配置，我们可以存放在项目根目录的.env.php文件中。
如果是production环境，则使用.env.php；如果是环境xx，则使用env.xx.php。
文件结构为：
```
<?php

return array(
    'PASSWORD' => 'super-secret-sauce',
);
```

这些变量都会存放到$_ENV和$_SERVER魔术数组中，我们可以在配置文件中随意引用，如：
```
<?php
return [
    'password' => $_ENV['PASSWORD'],
];
```

更多信息请移步[官方文档](http://laravel.com/docs/4.2/configuration)。

路由
----

所有的路由配置都放在`app/routes.php`文件中。所有的配置均通过Facde类Route实现。
简单控制器可以使用匿名函数实现，复杂的可以使用普通类。

### 简单示例

简单GET请求：
```
// 匿名函数
Route::get('hello', function() {
    return 'Hello';
});
// 控制器类
Route::post('hello', 'HelloController@store');
Route::put('book/1', 'BookController@update');
Route::delete('book/1', 'BookController@delete');
```

注意，控制器约定为Controller结尾，但不做强制要求，你可以随意命名。@后面是方法名。

### 路径参数

Laravel提供了简单明了的方法来获取路径参数。

简单示例：

```
Route::delete('hello/{name}', function($name) {
    if (!$name) $name = 'world';

    return 'Hello, ' . $name;
});
```

我们还可以对路径参数进行检查：

```
Route::get('books/{id}', function($id) {
    // ...
})->where('id', '[0-9]+');
```

多参数检查：
```
Route::get('users/{user_id}/books/{book_id}', function($user_id, $book_id) {
    // ...
})->where([
    'user_id' => '[0-9]+',
    'book_id' => '[0-9]+',
]);
```

在其他地方（非路由器）获取路由参数：
```
$id = Route::input('id');
```

### 路由过滤器（拦截器）

我们可以使用`Route::filter`定义拦截器：
```
Route::filter('check.signature', function() {
    // ...
});
```

使用拦截器：
```
Route::get('books/{id}', ['before' => 'check.signature', function() {
    // ...
});
```

注意：任何拦截器返回字符串或者Response对象，则整个请求过程结束，返回的内容会发给客户端。

### 路由组

可以对一组路由规则进行分组，正对组设置过滤器：
```
Route::group(['before' => 'auth'], function() {
    Route::get('/', function() {
        // ...
    });
    Route::get('user', function() {
        // ...
    });
});
```

上述路由组内所有请求都需要进行auth过滤器/拦截器过滤。

### REST资源路由

Laravel为REST风格API提供个更为方便的路由方式：
```
Route::resource('photo', 'PhotoController');
```

映射结果可以通过Laravel提供artisan工具查看：
```sh
➜  one  php artisan route
+--------+---------------------------+--------------+------------------------+
| Domain | URI                       | Name         | Action                 |
+--------+---------------------------+--------------+------------------------+
|        | GET|HEAD book             | book.index   | BookController@index   |
|        | GET|HEAD book/create      | book.create  | BookController@create  |
|        | POST book                 | book.store   | BookController@store   |
|        | GET|HEAD book/{book}      | book.show    | BookController@show    |
|        | GET|HEAD book/{book}/edit | book.edit    | BookController@edit    |
|        | PUT book/{book}           | book.update  | BookController@update  |
|        | PATCH book/{book}         |              | BookController@update  |
|        | DELETE book/{book}        | book.destroy | BookController@destroy |
+--------+---------------------------+--------------+------------------------+
```

请注意默认的映射规则。你还可以传入一个数组作为第三个参数，使用only、except来限制映射方法。


### 控制器

Laravel对控制器没有任何限制，任何类都可以作为控制器，可以说是相当的灵活。

唯一需要说明的是，我们可以使用Laravel的脚手架artisan来快速生成控制器：

```sh
php artisan controller:make BookController
```

这样，Laravel会帮我们在`app/controllers`目录生成BookController.php文件。

更多信息请移步[官方文档](http://laravel.com/docs/4.2/routing)。

请求信息
--------

### 输入参数
获取请求参数使用Input。简单用法如下：
```
$name = Input::get('name');
$name = Input::get('name', 'default');
```
Input可以读取GET、POST和JSON格式请求参数。

检查参数是否存在：
```
if (Input::has('name')) {
    // ...
}
```

获取所有参数：
```
$input = Input::all();
```

获取数组参数：
```
$input = Input::get('books.1.name');
```

### Cookie

获取Cookie：
```
$value = Cookie::get('name');
```

发送Cookie：
```
$response = Response::make('hehe');
$response->withCookie(Cooke::make('name', 'value', $minutes));
```

### 其他信息

```
$uri = Request::path();
$method = Response::method();
$url = Request::url();
$header = Request::header('name');
$server_info = Request::server('PATH_INFO');
$is_ajax = Request::ajax();
```

更多信息请移步[官方文档](http://laravel.com/docs/4.2/requests)。

响应对象
--------

初始化：
```
$response = Response::make($contents, $statusCode);
```
设置头信息：
```
$response->header('Content-Type', $value);
```
重定向：
```
return Redirect::to('user/login');
```
输出JSON：
```
$response = Response::json($contents, $statusCode);
```

更多信息请移步[官方文档](http://laravel.com/docs/4.2/responses#basic-responses)。

模板
----
所有模板均以`.blade.php`结尾，约定放在`app/views`目录。

### 骨架模板示例
```
<!-- 存储在app/views/layouts/master.blade.php -->

<html>
    <body>
        @section('sidebar')
            This is the master sidebar.
        @show

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
```

### 扩展骨架示例
```
@extends('layouts.master')

@section('sidebar')
    <p>This is appended to the master sidebar.</p>
@stop

@section('content')
    <p>This is my body content.</p>
@stop
```

在控制器结束的时候使用如下方法编译模板：
```
return View:make('hello', []);
```
make的第二个参数是要模板中使用的变量。

### 输出语法
```
Hello, {{{ $name }}}.
Hello, {{ $name }}.
```
三个大括号会转义。

### 判断语法
```
@if (count($records) === 1)
    I have one record!
@elseif (count($records) > 1)
    I have multiple records!
@else
    I don't have any records!
@endif

@unless (Auth::check())
    You are not signed in.
@endunless
```

### 循环语法
```
@for ($i = 0; $i < 10; $i++)
    The current value is {{ $i }}
@endfor

@foreach ($users as $user)
    <p>This is user {{ $user->id }}</p>
@endforeach

@forelse($users as $user)
      <li>{{ $user->name }}</li>
@empty
      <p>No users</p>
@endforelse

@while (true)
    <p>I'm looping forever.</p>
@endwhile
```

更多信息请移步[官方文档](http://laravel.com/docs/4.2/responses#views)。
