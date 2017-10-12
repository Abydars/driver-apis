<?php

namespace App\Helpers;

use App\Passenger;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\User;
use Carbon\Carbon;

class TokenHelper
{
	/**
	 * TokenHelper constructor.
	 */
	public function __construct()
	{

	}

	/**
	 * @param $token
	 * @param string $type
	 *
	 * @return bool|\Illuminate\Database\Eloquent\Model|null|static
	 */
	public function verifyToken( $token, $type = 'user' )
	{
		$user = null;

		if ( $type == 'user' ) {
			$user = User::where( 'api_token', $token )->first();
		} else if ( $type == 'passenger' ) {
			$user = Passenger::where( 'api_token', $token )->first();
		}

		return ( ! empty( $user ) ? $user : false );
	}

	/**
	 * @param $user
	 *
	 * @return mixed|string
	 */
	public function updateToken( $user )
	{
		$user->api_token = str_random( 60 );
		$user->save();

		return $user->api_token;
	}
}