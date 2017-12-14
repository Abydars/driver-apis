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
	protected $signature = 'job:remind {now?}';

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
		$now_arg = $this->argument( 'now' );

		if ( ! $now_arg ) {
			$now_arg = Carbon::now()->toDateTimeString();
		}

		Job::where( 'timestamp', '>=', $now_arg )
		   ->each( function ( $job ) use ( &$now_arg ) {

			   $timezone      = Config::get( 'constants.timezone' );
			   $job_timestamp = Carbon::parse( $job->timestamp, $timezone );
			   $now           = Carbon::now( $timezone );
			   $alarms        = [ 12, 6, 3 ];

			   if ( $now_arg ) {
				   $now = Carbon::parse( $now_arg, $timezone );
			   }

			   $difference = $job_timestamp->diff( $now );

			   if ( $difference->invert == 1 ) {

				   if ( $difference->days == 0 ) {
					   $difference->h += 1;
					   $alarm         = array_search( $difference->h, $alarms );
					   //var_dump( $difference->h );
					   if ( $alarm != false && isset( $alarms[ $alarm ] ) ) {
						   $alarm = $alarms[ $alarm ];

						   if ( $alarm == $difference->h ) {
							   $last_notified_diff = Carbon::parse( $job->last_notified, $timezone )->diff( $now );
							   //var_dump( $last_notified_diff );

							   if ( $last_notified_diff->h > 0 ) {
								   $job->last_notified = $now->toDateTimeString();
								   $job->save();

								   $job->user->notify( new JobReminderNotification( $job ) );
							   } else {
								   echo 'already sent';
							   }
						   }
					   }
				   }
			   }
		   } );
	}
}
