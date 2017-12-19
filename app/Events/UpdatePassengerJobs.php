<?php

namespace App\Events;

use App\Job;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UpdatePassengerJobs
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	public $passenger_id;

	/**
	 * Create a new event instance.
	 *
	 * @param $passenger_id
	 *
	 * @internal param Job $job
	 *
	 * @internal param $passenger_id
	 */
	public function __construct( $passenger_id )
	{
		$this->passenger_id = $passenger_id;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return Channel|array
	 */
	public function broadcastOn()
	{
		return [ 'passenger.' . $this->passenger_id ];
	}

	public function broadcastAs()
	{
		return 'update-passenger-jobs';
	}
}
