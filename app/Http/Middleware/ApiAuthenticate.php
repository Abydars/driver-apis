<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Request;
use JSONResponse;
use Token;

class ApiAuthenticate
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  Request $request
	 * @param  \Closure $next
	 *
	 * @return mixed
	 */
	public function handle( $request, Closure $next )
	{
		$token = $request->header( 'Authorization' );

		if ( $token ) {
			$user = Token::verifyToken( $token, 'user' );

			if ( ! empty( $user ) ) {
				return $next( $request );
			}
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.UNAUTHORIZED' ), $_SERVER );
	}
}
