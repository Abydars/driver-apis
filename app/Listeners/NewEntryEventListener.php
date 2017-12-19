<?php

namespace App\Listeners;

use App\Events\NewEntryEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewEntryEventListener
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
     * @param  NewEntryEvent  $event
     * @return void
     */
    public function handle(NewEntryEvent $event)
    {
        //
    }
}
