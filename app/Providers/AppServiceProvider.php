<?php

namespace App\Providers;

use App\Helpers\DashboardHelper;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use App\Helpers\TokenHelper;
use App\Helpers\ResponseHelper;
use App\Helpers\LanguageHelper;
use App;

class LaravelLoggerProxy
{
	public function log( $msg )
	{
		Log::info( $msg );
	}
}

class AppServiceProvider extends ServiceProvider
{
	/**
	 * Bootstrap any application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		$pusher = $this->app->make( 'pusher' );
		$pusher->set_logger( new LaravelLoggerProxy() );
	}

	/**
	 * Register any application services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->singleton( 'token', function ( $app ) {
			$token = new TokenHelper();

			return $token;
		} );

		$this->app->singleton( 'response', function ( $app ) {
			$response = new ResponseHelper();

			return $response;
		} );

		$this->app->singleton( 'dashboard', function ( $app ) {
			$dashboard = new DashboardHelper();

			return $dashboard;
		} );

		$this->app->singleton( 'element', function ( $app ) {
			$element = new App\Helpers\ElementHelper();

			return $element;
		} );

		$this->app->singleton( 'push_notification', function ( $app ) {
			$push = new App\Helpers\PushNotificationHelper();

			return $push;
		} );

		$this->app->singleton( 'unique_code', function ( $app ) {
			$unique_code = new App\Helpers\UniqueCodeHelper();

			return $unique_code;
		} );

		$this->app->singleton( 'pagination', function ( $app ) {
			$pagination = new App\Helpers\PaginationHelper();

			return $pagination;
		} );
	}
}
