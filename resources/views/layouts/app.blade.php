<!DOCTYPE html>
<html lang="en">
<?php
$user = Dashboard::user();
$navigations = Dashboard::navigations();
$active_navigation = Dashboard::active_navigation();
?>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') }}</title>

    <!-- =============== STYLES ===============-->
    <link rel="stylesheet" href="{{ asset('/css/vendor.css') }}">

    <link rel="stylesheet" href="{{ asset('/css/bootstrap.css') }}" id="bscss">
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}" id="maincss">

    <script>
        window.custom =
		<?php echo json_encode( [
			                        'csrfToken'      => csrf_token(),
			                        'url'            => url( 'admin' ),
			                        'islamic_months' => Config::get( 'constants.hijri.months' ),
			                        'english_months' => Config::get( 'constants.english.months' )
		                        ] ); ?>
    </script>
</head>
<body class="">
<!-- layout-fixed layout-boxed aside-collapsed aside-collapsed-text aside-float aside-hover aside-show-scrollbar-->
<div class="wrapper">
@include ('layouts.nav')
<!-- Main section-->
    <section>
        <!-- Page content-->
        <div class="content-wrapper">
            <h3>{{ Dashboard::title() }}
                <div class="pull-right" id="top-layout">@yield('top')</div>
            </h3>
            <div class="row">
                <div class="col-lg-12" id="content-layout">
                    @yield('content')
                </div>
            </div>
        </div>
    </section>
    <!-- Page footer-->
    <footer>
        <span>&copy; {{ date('Y') }} - DriverApp</span>
    </footer>
</div>
@yield('modals')
<!-- =============== SCRIPTS ===============-->
<script src="{{ asset('/js/vendor.js') }}"></script>
<script src="{{ asset('/js/app.js') }}"></script>

<script src="//js.pusher.com/3.0/pusher.min.js"></script>
<script>
    Pusher.log = function (msg) {
        console.log(msg);
    };

    var pusher = new Pusher("{{env("PUSHER_APP_KEY")}}", {
        cluster: 'eu'
    });

    var channel = pusher.subscribe('user.1');
    channel.bind('new-entry-event', function (data) {
        alert();
    });
</script>

@stack('scripts')
</body>
</html>