<?php

namespace App\Console\Commands;

use App\Notifications\NewPassenger;
use App\Passenger;
use App\User;
use Illuminate\Console\Command;

class TestNotification extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'notification:test {email}';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Notification testing';

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
		$email = $this->argument( 'email' );
		$user  = User::where( 'email', $email )->first();
		if ( $user ) {
			$passenger = Passenger::where( 'user_id', $user->id )->first();
			if ( $passenger ) {
				$user->notify( new NewPassenger( $passenger ) );
			} else {
				$this->line( 'No passenger' );
			}
		} else {
			$this->line( 'User not exists' );
		}
	}
}
