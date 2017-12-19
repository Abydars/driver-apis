<?php

namespace App\Listeners;

use App\Events\UpdatePassengerJobs;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdatePassengerJobsEventListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UpdatePassengerJobs  $event
     * @return void
     */
    public function handle(UpdatePassengerJobs $event)
    {
        //
    }
}
