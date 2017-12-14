<?php

namespace App\Console;

use App\Console\Commands\JobReminder;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
	/**
	 * The Artisan commands provided by your application.
	 *
	 * @var array
	 */
	protected $commands = [
		\App\Console\Commands\TestNotification::class,
		\App\Console\Commands\JobReminder::class
	];

	/**
	 * Define the application's command schedule.
	 *
	 * @param  \Illuminate\Console\Scheduling\Schedule $schedule
	 *
	 * @return void
	 */
	protected function schedule( Schedule $schedule )
	{
		// $schedule->command('inspire')
		//          ->hourly();
		//$schedule->command( 'command:test' )->everyMinute();
	}

	/**
	 * Register the Closure based commands for the application.
	 *
	 * @return void
	 */
	protected function commands()
	{
		require base_path( 'routes/console.php' );
	}
}
