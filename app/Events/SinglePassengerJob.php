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

class SinglePassengerJob implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	public $job;

	/**
	 * Create a new event instance.
	 *
	 * @param Job $job
	 */
	public function __construct( Job $job )
	{
		$this->job = $job;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return Channel|array
	 */
	public function broadcastOn()
	{
		return [ 'passenger.' . $this->job->passenger_id ];
	}

	public function broadcastAs()
	{
		return 'single-passenger-job';
	}
}
