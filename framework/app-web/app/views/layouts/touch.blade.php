<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{{ isset($title) ? $title : 'TODO::PHP generate the Title dynamically.' }}}</title>
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta content="telephone=no,email=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <link href="{{ isset($host) ? $host : ''}}/common.css" rel="stylesheet"/>

    @if (isset($file_css))
    <link href="{{ isset($host) ? $host : ''}}/{{{$file_css}}}.css" rel="stylesheet"/>
    @endif

    @if ($debug)
    <script src="{{ isset($host) ? $host : ''}}/js/lib/require.js"></script>
    <script src="{{ isset($host) ? $host : ''}}/common.js"></script>
    @else
    <script src="{{ isset($host) ? $host : ''}}/common.js"></script>
    @endif
</head>
<body>
<div class="page">
    <!-- content -->
    @yield('content')

    <div class="network-status"></div>
</div>

{{ ($debug) ? Aifang\Web\Resource::autoGenerate($file_js, $file_css) : ''}}

@if ($base_url)
<script type="text/javascript">
    require.config({
        baseUrl: '{{$base_url}}'
    });
</script>
@endif

@if (isset($file_js))
<script src="{{ isset($host) ? $host : ''}}/{{{$file_js}}}.js"></script>
@endif

</body>
</html>
