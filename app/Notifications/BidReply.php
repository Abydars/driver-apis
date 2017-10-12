<?php

namespace App\Notifications;

use App\Job;
use App\Passenger;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;

class BidReply extends Notification
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
		$user    = User::find( $this->job->user_id );
		$message = "{$user->username} quotation: $" . $this->job->bid_amount;

		return OneSignalMessage::create()
		                       ->subject( 'Quotation reply' )
		                       ->body( $message );
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
