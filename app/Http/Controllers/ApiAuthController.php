<?php

namespace App\Http\Controllers;

use App\User;
use Berkayk\OneSignal\OneSignalClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JSONResponse;
use NotificationChannels\OneSignal\OneSignalButton;
use NotificationChannels\OneSignal\OneSignalMessage;
use Validator;
use Token;
use Illuminate\Support\Facades\Config;
use App\Language;
use Carbon\Carbon;
use UniqueCode;

class ApiAuthController extends Controller
{
	/**
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function login( Request $request )
	{
		$validation_rules = [
			'email'    => 'required|exists:users,email',
			'password' => 'required'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$user         = User::with('role')->where( 'email', $request->input( 'email' ) )->first();
		$is_logged_in = Auth::attempt( [
			                               'email'    => $request->input( 'email' ),
			                               'password' => $request->input( 'password' )
		                               ] );

		if ( $is_logged_in ) {
			if ( ! empty( $user ) ) {
				$token = Token::updateToken( $user );

				return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), [
					'user'  => $user,
					'token' => $token
				] );
			}
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.user.invalid' ) );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.NOT_FOUND' ), null, __( 'strings.user.not_found' ) );
	}

	/**
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function register( Request $request )
	{
		$validation_rules = [
			'email'    => 'required|unique:users,email',
			'username' => 'required|unique:users,username',
			'password' => 'required',
			'udid'     => 'required',
			'phone'    => 'nullable'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$user = User::create( [
			                      'email'     => $request->input( 'email' ),
			                      'username'  => $request->input( 'username' ),
			                      'phone'     => $request->input( 'phone' ),
			                      'password'  => bcrypt( $request->input( 'password' ) ),
			                      'udid'      => $request->input( 'udid' ),
			                      'api_token' => str_random( 60 ),
			                      'code'      => UniqueCode::generate(),
			                      'status'    => 'in-approval'
		                      ] );

		if ( $user->id > 0 ) {
			$user = User::with('role')->find( $user->id );

			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $user );
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.user.creation_failed' ) );
		}
	}
}