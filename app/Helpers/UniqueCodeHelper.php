<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\User;
use Carbon\Carbon;

class UniqueCodeHelper
{
	/**
	 * TokenHelper constructor.
	 */
	public function __construct()
	{

	}

	public function generate()
	{
		$length = 7;
		$code   = strtoupper( str_random( $length ) );

		while ( User::where( 'code', $code )->exists() ) {
			$code = strtoupper( str_random( $length ) );
		}

		return $code;
	}
}