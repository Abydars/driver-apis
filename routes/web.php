<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Events\TestEvent;

Auth::routes();

Route::get( '/ping', function () {
	event( new \App\Events\NewEntryEvent( 'job', \App\Job::all(), false, 1 ) );

	return view( 'welcome' );
} );

Route::get( '/welcome', function () {
	return view( 'welcome' );
} );

Route::get( '/', function () {
	if ( \Illuminate\Support\Facades\Auth::check() ) {
		return redirect( 'admin' );
	}

	return redirect( 'login' );
} );

Route::get( '/admin/login', function () {
	if ( \Illuminate\Support\Facades\Auth::check() ) {
		return redirect( 'admin' );
	}

	return redirect( 'login' );
} );

Route::group( [ 'prefix' => 'admin', 'middleware' => 'auth' ], function () {
	Route::get( '/', 'HomeController@index' );
	Route::get( '/dashboard', 'HomeController@index' )->name( 'dashboard' );
} );