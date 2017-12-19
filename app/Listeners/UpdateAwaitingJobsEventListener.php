<?php

namespace App\Listeners;

use App\Events\UpdateAwaitingJobs;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateAwaitingJobsEventListener
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
     * @param  UpdateAwaitingJobs  $event
     * @return void
     */
    public function handle(UpdateAwaitingJobs $event)
    {
        //
    }
}
