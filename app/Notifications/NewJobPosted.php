<?php

namespace App\Notifications;

use App\Job;
use App\Passenger;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Config;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;

class NewJobPosted extends Notification
{
	use Queueable;

	private $job;

	/**
	 * Create a new notification instance.
	 *
	 * @param Job $job
	 */
	public function __construct( Job $job )
	{
		$this->job = $job;
	}

	/**
	 * Get the notification's delivery channels.
	 *
	 * @param  mixed $notifiable
	 *
	 * @return array
	 */
	public function via( $notifiable )
	{
		return [ OneSignalChannel::class ];
	}

	/**
	 * Get the mail representation of the notification.
	 *
	 * @param  mixed $notifiable
	 *
	 * @return \Illuminate\Notifications\Messages\MailMessage
	 */
	public function toMail( $notifiable )
	{
		return ( new MailMessage )
			->line( 'The introduction to the notification.' )
			->action( 'Notification Action', url( '/' ) )
			->line( 'Thank you for using our application!' );
	}

	/**
	 * @param $notifiable
	 *
	 * @return OneSignalMessage
	 */
	public function toOneSignal( $notifiable )
	{
		$passenger = Passenger::find( $this->job->passenger_id );
		$message   = "New job has been posted by {$passenger->name}";
		$action    = Config::get( 'constants.notification.actions.single_job' );

		if ( $this->job->status == 'bid' ) {
			$message = "{$passenger->name} need a quotation";
			$action  = Config::get( 'constants.notification.actions.single_bid' );
		}

		return OneSignalMessage::create()
		                       ->subject( 'New Job' )
		                       ->body( $message )
		                       ->setData( 'action', $action )
		                       ->setData( 'job_id', $this->job->id )
		                       ->url( Config::get( 'constants.notification.host' ) . 'job/' . $this->job->id );
	}

	/**
	 * Get the array representation of the notification.
	 *
	 * @param  mixed $notifiable
	 *
	 * @return array
	 */
	public function toArray( $notifiable )
	{
		return [
			//
		];
	}
}
