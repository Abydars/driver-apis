<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Authentication Routes
 */
Route::post( 'v1/user/login', 'ApiAuthController@login' );
Route::post( 'v1/user/register', 'ApiAuthController@register' );
Route::post( 'v1/passenger/login', 'ApiPassengerController@login' );

Route::post( 'v1/p/{passenger_id}/logout', 'ApiPassengerController@logout' )->name( 'passenger.logout' );
Route::post( 'v1/u/{user_id}/logout', 'ApiAuthController@logout' )->name( 'user.logout' );

/**
 * User Routes
 */
Route::group( [ 'prefix' => 'v1/u', 'middleware' => 'token' ], function () {

	Route::group( [ 'prefix' => 'user' ], function () {
		Route::get( 'all', 'ApiUserController@data' )->name( 'user.data' );
		Route::get( '{user_id}', 'ApiUserController@getUserById' )->name( 'user.get' );
		Route::delete( '{user_id}', 'ApiUserController@deleteUserById' )->name( 'user.delete' );
		Route::post( '{user_id}/update', 'ApiUserController@updateUserById' )->name( 'user.update' );
	} );

	Route::get( '{user_id}/jobs/{status}', 'ApiUserController@jobs' )->name( 'user.jobs' );
	Route::get( '{user_id}/jobs/{status}/filter', 'ApiUserController@filter_jobs' )->name( 'user.filter_jobs' );
	Route::get( '{user_id}/passengers', 'ApiUserController@passengers' )->name( 'user.passengers' );
	Route::get( '{user_id}/threads', 'ApiUserController@threads' )->name( 'user.threads' );

	Route::group( [ 'prefix' => 'passenger' ], function () {
		Route::get( '{passenger_id}', 'ApiPassengerController@get' )->name( 'passenger.get' );
		Route::get( '{passenger_id}/pricing', 'ApiPassengerController@pricing' )->name( 'passenger.pricing' );
		Route::get( '{passenger_id}/messages', 'ApiPassengerController@messages' )->name( 'passenger.messages' );
		Route::post( '{passenger_id}/update', 'ApiPassengerController@update' )->name( 'passenger.update' );
	} );

	Route::group( [ 'prefix' => 'pricing' ], function () {
		Route::post( 'add', 'ApiPricingController@add' )->name( 'pricing.add' );
		Route::post( '{pricing_id}/edit', 'ApiPricingController@edit' )->name( 'pricing.edit' );
		Route::delete( '{pricing_id}', 'ApiPricingController@destroy' )->name( 'pricing.destroy' );
	} );

	Route::group( [ 'prefix' => 'message' ], function () {
		Route::post( 'add', 'ApiMessageController@add' )->name( 'message.add' );
	} );

	Route::group( [ 'prefix' => 'job' ], function () {
		Route::get( '{job_id}', 'ApiJobController@get' )->name( 'job.get' );
		Route::post( '{job_id}/complete', 'ApiJobController@complete' )->name( 'job.complete' );
		Route::post( '{job_id}/bid_reply', 'ApiJobController@bid_reply' )->name( 'job.bid_reply' );
	} );

} );

/*
 * Passenger Routes
 */
Route::group( [ 'prefix' => 'v1/p', 'middleware' => 'ptoken' ], function () {

	Route::group( [ 'prefix' => 'passenger' ], function () {
		Route::get( '{passenger_id}', 'ApiPassengerController@get' )->name( 'passenger.get' );
		Route::get( '{passenger_id}/jobs', 'ApiPassengerController@jobs' )->name( 'passenger.jobs' );
	} );

	Route::group( [ 'prefix' => 'job' ], function () {
		Route::get( '{job_id}', 'ApiJobController@get' )->name( 'job.get' );
		Route::post( 'add', 'ApiJobController@add' )->name( 'job.add' );
		Route::post( '{job_id}/bid_accept', 'ApiJobController@bid_accept' )->name( 'job.bid_accept' );
	} );

	Route::group( [ 'prefix' => 'message' ], function () {
		Route::post( 'add', 'ApiMessageController@add' )->name( 'message.add' );
	} );

} );

/*
Route::group( [ 'prefix' => 'v1/', 'middleware' => 'anytoken' ], function () {

	Route::group( [ 'prefix' => 'ads' ], function () {
		Route::get( 'all', 'ApiAdsController@data' )->name( 'ad.data' );
		Route::post( '{advertisement_id}/submit', 'ApiAdsController@submit' )->name( 'ad.submit' );
	} );

} );
*/