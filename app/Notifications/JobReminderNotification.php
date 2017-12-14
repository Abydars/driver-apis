<?php

namespace App\Notifications;

use App\Job;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Config;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;

class JobReminderNotification extends Notification
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
		$formatted_time = Carbon::parse( $this->job->timestamp )->format( 'h:i A' );
		$body           = "Pickup today at {$formatted_time} from {$this->job->pickup}";
		$action         = Config::get( 'constants.notification.actions.single_bid' );

		return OneSignalMessage::create()
		                       ->subject( 'Job Reminder' )
		                       ->body( $body )
		                       ->setData( 'action', $action )
		                       ->setData( 'id', $this->job->id )
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
