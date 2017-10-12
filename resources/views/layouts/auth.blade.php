<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <title>{{ config('app.name') }}</title>

    <!-- =============== STYLES ===============-->
    <link rel="stylesheet" href="{{ asset('css/vendor.css') }}">

    <link rel="stylesheet" href="{{ asset('css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        .middle-block {
            display: flex;
            align-items: center;
            min-height: 100vh;
        }
        body {
            background-size: cover;
        }
    </style>
    @yield('style')
</head>
<body>
<div class="wrapper">
    <div class="middle-block">
        @yield('content')
    </div>
</div>

<!-- =============== SCRIPTS ===============-->
<script src="js/vendor.js"></script>
<script src="js/app.js"></script>
@stack('scripts')
</body>
</html>
