<?php

namespace App\Notifications;

use App\Passenger;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Config;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;

class RenewPassenger extends Notification
{
	use Queueable;

	private $passenger;

	/**
	 * Create a new notification instance.
	 *
	 * @param Passenger $passenger
	 */
	public function __construct( Passenger $passenger )
	{
		$this->passenger = $passenger;
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
		$body = "Congrats! {$this->passenger->name} is now again connected";

		return OneSignalMessage::create()
		                       ->subject( 'Rejoin Passenger' )
		                       ->body( $body )
		                       ->setData( 'action', Config::get( 'constants.notification.actions.single_passenger' ) )
		                       ->setData( 'passenger_id', $this->passenger->id )
		                       ->url( Config::get( 'constants.notification.host' ) . $this->passenger->id );
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
