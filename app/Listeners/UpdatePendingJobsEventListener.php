<?php

namespace App\Listeners;

use App\Events\UpdatePendingJobs;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdatePendingJobsEventListener
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
     * @param  UpdatePendingJobs  $event
     * @return void
     */
    public function handle(UpdatePendingJobs $event)
    {
        //
    }
}
