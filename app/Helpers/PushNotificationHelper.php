<?php

namespace App\Helpers;

use App\Event;
use App\Feed;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\User;
use Carbon\Carbon;

class PushNotificationHelper
{
	/**
	 * PushNotificationHelper constructor.
	 */
	public function __construct()
	{

	}

	/**
	 * @param Feed $feed
	 */
	private function push_feed( Feed $feed )
	{
		Artisan::call( "feed:add", [
			'id' => $feed->id
		] );
	}

	/**
	 * @param Event $event
	 */
	private function push_event( Event $event )
	{
		Artisan::call( "event:add", [
			'id' => $event->id
		] );
	}

	/**
	 * @param $args
	 */
	private function push_system_events( $args )
	{
		Artisan::call( "event:notify", [
			'--system',
			'--timezone' => $args['timezone'],
			'date'       => $args['date']
		] );
	}

	/**
	 * @param $args
	 */
	private function push_user_events( $args )
	{
		Artisan::call( "event:notify", [
			'--timezone' => $args['timezone'],
			'date'       => $args['date']
		] );
	}

	/**
	 * @param $type
	 * @param $args
	 */
	public function notify( $type, $args )
	{
		switch ( $type ) {
			case "event":
				$this->push_event( $args );
				break;
			case "system_events":
				$this->push_system_events( $args );
				break;
			case "user_events":
				$this->push_user_events( $args );
				break;
			case "feed":
				$this->push_feed( $args );
				break;
		}
	}
}