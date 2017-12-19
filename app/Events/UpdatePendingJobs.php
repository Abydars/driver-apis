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

class UpdatePendingJobs
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	public $user_id;

	/**
	 * Create a new event instance.
	 *
	 * @param $user_id
	 *
	 * @internal param Job $job
	 *
	 * @internal param $user_id
	 */
	public function __construct( $user_id )
	{
		$this->user_id     = $user_id;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return Channel|array
	 */
	public function broadcastOn()
	{
		return [ 'user.' . $this->user_id ];
	}

	public function broadcastAs()
	{
		return 'update-pending-jobs';
	}
}
