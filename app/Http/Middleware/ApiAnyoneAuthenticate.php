<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use JSONResponse;
use Token;

class ApiAnyoneAuthenticate
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
			$is_user      = Token::verifyToken( $token, 'user' );
			$is_passenger = Token::verifyToken( $token, 'passenger' );

			if ( ! empty( $is_user ) || ! empty( $is_passenger ) ) {
				return $next( $request );
			}
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.UNAUTHORIZED' ) );
	}
}
