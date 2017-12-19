<?php

namespace App\Listeners;

use App\Events\SinglePassengerJob;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SinglePassengerJobEventListener
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
     * @param  SinglePassengerJob  $event
     * @return void
     */
    public function handle(SinglePassengerJob $event)
    {
        //
    }
}
