<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Config;
use Token;
use JSONResponse;

class ApiPassengerAuthenticate
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \Closure $next
	 *
	 * @return mixed
	 */
	public function handle( $request, Closure $next )
	{
		$token = $request->header( 'Authorization' );

		if ( $token ) {
			$user = Token::verifyToken( $token, 'passenger' );

			if ( ! empty( $user ) ) {
				return $next( $request );
			}
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.UNAUTHORIZED' ) );
	}
}
