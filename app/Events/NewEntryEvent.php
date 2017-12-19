<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewEntryEvent implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	public $type;
	public $data;
	public $user_id;
	public $passenger_id;

	/**
	 * Create a new event instance.
	 *
	 * @param $type
	 * @param $data
	 * @param $user_id
	 * @param $passenger_id
	 */
	public function __construct( $type, $data, $user_id = false, $passenger_id = false )
	{
		$this->type         = $type;
		$this->data         = $data;
		$this->user_id      = $user_id;
		$this->passenger_id = $passenger_id;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return Channel|array
	 */
	public function broadcastOn()
	{
		$on = [];

		if ( $this->user_id ) {
			$on = [ 'user.' . $this->user_id ];
		}

		if ( $this->passenger_id ) {
			$on = [ 'passenger.' . $this->passenger_id ];
		}

		return $on;
	}

	public function broadcastAs()
	{
		return 'new-entry-event';
	}
}
