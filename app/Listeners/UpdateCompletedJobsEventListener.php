<?php

namespace App\Listeners;

use App\Events\UpdateCompletedJobs;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateCompletedJobsEventListener
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
     * @param  UpdateCompletedJobs  $event
     * @return void
     */
    public function handle(UpdateCompletedJobs $event)
    {
        //
    }
}
