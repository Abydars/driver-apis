<?php

namespace App\Notifications;

use App\Message;
use Berkayk\OneSignal\OneSignalClient;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Config;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;

class NewMessage extends Notification
{
	use Queueable;

	private $message;

	/**
	 * Create a new notification instance.
	 *
	 * @param Message $message
	 */
	public function __construct( Message $message )
	{
		$this->message = $message;
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
		$message = Message::with( [ 'user', 'passenger' ] )->find( $this->message->id );

		$sender_name = $message->sender_type == 'passenger' ? $this->message->passenger->name : $this->message->user->username;
		$body        = $sender_name . ": " . $message->message;

		return OneSignalMessage::create()
		                       ->subject( 'New Message' )
		                       ->body( $body )
		                       ->setData( 'action', Config::get( 'constants.notification.actions.single_thread' ) )
		                       ->setData( 'id', $this->message->id )
		                       ->setData( 'meta_data', json_encode( $this->message->meta_data ) )
		                       ->url( Config::get( 'constants.notification.host' ) . 'message/' . $this->message->id );
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
