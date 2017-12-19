<?php

namespace App\Listeners;

use App\Events\SingleJob;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SingleJobEventListener
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
     * @param  SingleJob  $event
     * @return void
     */
    public function handle(SingleJob $event)
    {
        //
    }
}
