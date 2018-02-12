<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use BlockCypher\Client\AddressClient;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\ActivationService;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
	/*
	|--------------------------------------------------------------------------
	| Login Controller
	|--------------------------------------------------------------------------
	|
	| This controller handles authenticating users for the application and
	| redirecting them to your home screen. The controller uses a trait
	| to conveniently provide its functionality to your applications.
	|
	*/

	use AuthenticatesUsers;

	/**
	 * Where to redirect users after login.
	 *
	 * @var string
	 */
	protected $redirectTo = '/admin';

	/**
	 * Create a new controller instance.
	 *
	 */
	public function __construct()
	{
		$this->middleware( 'guest', [ 'except' => 'logout' ] );
	}

	protected function validateLogin( Request $request )
	{
		$this->validate( $request,
		                 [
			                 $this->username() => 'required',
			                 'password'        => 'required'
		                 ] );
	}

	public function login( Request $request )
	{
		$this->validateLogin( $request );

		$field = filter_var( $request->input( 'email' ), FILTER_VALIDATE_EMAIL ) ? 'email' : 'username';
		$request->merge( [ $field => $request->input( 'email' ) ] );

		if ( Auth::attempt( $request->only( $field, 'password' ), ( $request->input( 'remember' ) == 1 ) ) ) {
			return redirect( $this->redirectTo );
		}

		return $this->sendFailedLoginResponse( $request );
	}

	protected function credentials( Request $request )
	{
		$username = $this->username();
		$field    = filter_var( $request->input( $username ), FILTER_VALIDATE_EMAIL ) ? 'email' : 'username';
		$request->merge( [ $field => $request->input( $username ) ] );

		return $request->only( $field, 'password' );
	}

	public function authenticated( Request $request, $user )
	{
		return redirect()->intended( $this->redirectPath() );
	}
}