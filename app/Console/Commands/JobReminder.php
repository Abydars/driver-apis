<?php

namespace App\Console\Commands;

use App\Job;
use App\Notifications\JobReminderNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

class JobReminder extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'job:remind {job}';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Sends user a notification about the job';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function handle()
	{
		$timezone      = Config::get( 'constants.timezone' );
		$job           = Job::find( $this->argument( 'job' ) );
		$job_timestamp = Carbon::parse( $job->timestamp, $timezone );
		//$last_notified = Carbon::parse( $job->last_notified, $timezone );
		//$now           = Carbon::now( $timezone );
		$now           = Carbon::parse( '2017-12-15 06:55:19', $timezone );
		$alarms        = [ 12, 6, 3 ];

		$difference = $job_timestamp->diff( $now );

		if ( $difference->invert == 1 ) {
			$last_notified_diff = $job_timestamp->diff( $now );

			if ( $difference->days == 0 ) {
				$alarm = array_search( $last_notified_diff->h, $alarms );

				if ( $alarm != false && isset( $alarms[ $alarm ] ) ) {
					$alarm = $alarms[ $alarm ];
					//var_dump( $last_notified_diff->h, $alarm );

					if ( $alarm == $last_notified_diff->h ) {
						$job->last_notified = Carbon::now()->toDateTimeString();
						$job->save();

						$job->user->notify( new JobReminderNotification( $job ) );
					}
				}
			}
		}
	}
}
