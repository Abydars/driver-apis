<?php

namespace App\Http\Middleware;

use App\User;
use App\UserRole;
use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfNotAdmin
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
		$user = Auth::user();

		if ( $user->role_id == UserRole::getAdminRole()->id ) {
			return $next( $request );
		} else {
			return response()->redirectToRoute( 'user.dashboard' );
		}
	}
}
