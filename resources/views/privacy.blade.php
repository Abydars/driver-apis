@extends('layouts.auth')

@section('style')
    <style>
        body {
            background-color: #5d9cec;
        }
    </style>
@endsection

@section('content')
    <div class="block-center wd-xl">
        <!-- START panel-->
        <div class="panel panel-dark panel-flat">
            <div class="panel-heading text-center">
                <h3 class="m0">Privacy Policy</h3>
            </div>
            <div class="panel-body">
                <p>DriverApp is committed to providing quality services to you and this policy outlines our ongoing
                    obligations to you in respect of how we manage your Personal Information.</p>
                <h2>What we require?</h2>
                <p>We require your device's location to fetch near by events.</p>
                <p>We require your device's information to create an identity in our system.</p>
            </div>
        </div>
        <!-- END panel-->
    </div>
@endsection