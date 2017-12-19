<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
	/**
	 * The event listener mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = [
		'App\Events\Event'         => [
			'App\Listeners\EventListener',
		],
		'App\Events\TestEvent'     => [
			'App\Listeners\TestEventListener'
		],
		'App\Events\NewEntryEvent' => [
			'App\Listeners\NewEntryEventListener'
		],
		'App\Events\UpdateAwaitingJobs' => [
			'App\Listeners\UpdateAwaitingJobsEventListener'
		],
		'App\Events\UpdatePendingJobs' => [
			'App\Listeners\UpdatePendingJobsEventListener'
		],
		'App\Events\UpdateCompletedJobs' => [
			'App\Listeners\UpdateCompletedJobsEventListener'
		],
		'App\Events\UpdatePassengerJobs' => [
			'App\Listeners\UpdatePassengerJobsEventListener'
		],
		'App\Events\SinglePassengerJob' => [
			'App\Listeners\SinglePassengerJobEventListener'
		],
		'App\Events\SingleJob' => [
			'App\Listeners\SingleJobEventListener'
		]
	];

	/**
	 * Register any events for your application.
	 *
	 * @return void
	 */
	public function boot()
	{
		parent::boot();

		//
	}
}
