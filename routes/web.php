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
	event( new \App\Events\UpdateAwaitingJobs( 1 ) );

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

Route::group( [ 'prefix' => 'admin', 'middleware' => [ 'auth', 'admin' ] ], function () {
	Route::get( '/', 'AdminController@index' );
	Route::get( '/dashboard', 'AdminController@index' )->name( 'admin.dashboard' );
	Route::get( '/users', 'UserController@index' )->name( 'admin.users' );
	Route::get( '/user/{user_id}/edit', 'UserController@edit' )->name( 'admin.user.edit' );
	Route::get( '/user/{user_id}/approve', 'UserController@approve' )->name( 'admin.user.approve' );
	Route::get( '/user/{user_id}/suspend', 'UserController@suspend' )->name( 'admin.user.suspend' );
	Route::get( '/users/data', 'UserController@data' )->name( 'user.data' );
	Route::get( '/ads', 'AdsController@index' )->name( 'admin.ads' );
	Route::get( '/ads/data', 'AdsController@data' )->name( 'ads.data' );
	Route::get( '/ads/add', 'AdsController@add' )->name( 'ads.add' );
	Route::post( '/ads/store', 'AdsController@store' )->name( 'ads.store' );
} );

Route::group( [ 'prefix' => 'user', 'middleware' => 'auth' ], function () {
	Route::get( '/', 'UserController@dashboard' );
	Route::get( '/dashboard', 'UserController@dashboard' )->name( 'user.dashboard' );
} );