@extends('layouts.auth')

@section('style')
    <style>
    body {
        background-color: #ec2121;
    }
    </style>
@endsection

@section('content')
    <div class="block-center wd-xl">
        <!-- START panel-->
        <div class="panel panel-dark panel-flat">
            <div class="panel-heading text-center">
                <h3 class="m0">Hcbox</h3>
            </div>
            <div class="panel-body">
                <p class="text-center pv">SIGN IN TO CONTINUE.</p>
                <form role="form" data-parsley-validate="" novalidate="" class="mb-lg" method="POST" action="{{ url('/login') }}">
                    {{ csrf_field() }}
                    <div class="form-group has-feedback{{ $errors->has('email') ? ' has-error' : '' }}">
                        <input id="login_email" name="email" type="text" placeholder="Enter email or username" autocomplete="off" required class="form-control">
                        <span class="fa fa-envelope form-control-feedback text-muted"></span>
                        @if ($errors->has('email'))
                            <ul class="parsley-errors-list filled">
                                <li class="parsley-required">{{ $errors->first('email') }}</li>
                            </ul>
                        @endif
                    </div>
                    <div class="form-group has-feedback{{ $errors->has('email') ? ' has-error' : '' }}">
                        <input id="login_password" name="password" type="password" placeholder="Password" required class="form-control">
                        <span class="fa fa-lock form-control-feedback text-muted"></span>
                        @if ($errors->has('password'))
                            <ul class="parsley-errors-list filled">
                                <li class="parsley-required">{{ $errors->first('password') }}</li>
                            </ul>
                        @endif
                    </div>
                    <div class="clearfix">
                        <div class="checkbox c-checkbox pull-left mt0">
                            <label>
                                <input type="checkbox" value="1" name="remember">
                                <span class="fa fa-check"></span>Remember Me
                            </label>
                        </div>
                        <div class="pull-right"><a href="{{ url('/password/reset') }}" class="text-muted">Forgot your password?</a>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-block btn-primary mt-lg">Login</button>
                </form>
            </div>
        </div>
        <!-- END panel-->
    </div>
@endsection
