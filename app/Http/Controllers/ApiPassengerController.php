<?php

namespace App\Http\Controllers;

use App\Job;
use App\Message;
use App\Notifications\NewPassenger;
use App\Notifications\RenewPassenger;
use App\Passenger;
use App\Pricing;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Token;
use JSONResponse;
use Validator;

class ApiPassengerController extends Controller
{
	/**
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function login( Request $request )
	{
		$validation_rules = [
			'name'  => 'required',
			'phone' => 'required',
			'udid'  => 'required',
			'code'  => 'required|exists:users,code'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$user      = User::where( 'code', $request->input( 'code' ) )->first();
		$passenger = Passenger::with( 'user' )->where( 'phone', $request->input( 'phone' ) );

		$values = [
			'name'    => $request->input( 'name' ),
			'udid'    => $request->input( 'udid' ),
			'user_id' => $user->id,
			'phone'   => $request->input( 'phone' )
		];

		if ( $passenger->exists() ) {
			$passenger = $passenger->first();
			$passenger->fill( $values );

			$passenger->save();

			try {
				$user->notify( new RenewPassenger( $passenger ) );
			} catch ( \Exception $e ) {

			}
		} else {
			$passenger = Passenger::create( $values );

			if ( $passenger->id > 0 ) {
				try {
					$user->notify( new NewPassenger( Passenger::find( $passenger->id ) ) );
				} catch ( \Exception $e ) {

				}

				$passenger = Passenger::with( 'user' )->find( $passenger->id );
			}
		}

		if ( $passenger ) {
			$token = Token::updateToken( $passenger );

			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), [
				'passenger' => $passenger,
				'token'     => $token
			] );
		}
	}

	/**
	 * @param $id
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function update( $id, Request $request )
	{
		$passenger = Passenger::find( $id );
		if ( $passenger ) {
			$passenger->fill( $request->fill( [
				                                  'comments' => $request->input( 'comments' )
			                                  ] ) );
			if ( $passenger->save() ) {
				return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.passenger.update_success' ) );
			}
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.passenger.not_found' ) );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.passenger.update_failed' ) );
	}

	/**
	 * @param $id
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function logout( $id, Request $request )
	{
		$validation_rules = [
			'udid' => 'required'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$passenger = Passenger::find( $id );

		if ( $passenger->udid == $request->get( 'udid' ) ) {
			$passenger->udid = '';
			$passenger->save();
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.passenger.logout' ) );
	}

	/**
	 * @param $id
	 *
	 * @return mixed
	 */
	public function get( $id )
	{
		$passenger = Passenger::with( 'user' )->find( $id );

		if ( $passenger ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $passenger );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.passenger.not_found' ) );
	}

	/**
	 * @param $id
	 *
	 * @return mixed
	 */
	public function getPublicPassenger( $id )
	{
		$passenger = Passenger::find( $id );

		if ( $passenger ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $passenger );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.passenger.not_found' ) );
	}

	/**
	 * @param $id
	 *
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function pricing( $id, Request $request )
	{
		$pricing = Pricing::where( 'passenger_id', $id );

		$limit    = $request->input( 'limit', 5 );
		$paginate = $pricing->paginate( $limit );

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $paginate->items(), null, [
			"current_page" => $paginate->currentPage(),
			"total_pages"  => ceil( $paginate->total() / $paginate->perPage() )
		] );
	}

	/**
	 * @param $id
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function messages( $id, Request $request )
	{
		if ( Passenger::find( $id )->exists() ) {
			$messages = Message::with( [ 'passenger', 'user' ] )
			                   ->where( 'passenger_id', $id );

			if ( $request->has( 'user_id' ) ) {
				$user_id  = $request->input( 'user_id' );
				$messages = $messages->where( 'user_id', $user_id );
			}

			$limit    = $request->input( 'limit', 5 );
			$paginate = $messages->paginate( $limit );

			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $paginate->items(), null, [
				"current_page" => $paginate->currentPage(),
				"total_pages"  => ceil( $paginate->total() / $paginate->perPage() )
			] );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.passenger.not_found' ) );
	}

	/**
	 * @param $id
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function jobs( $id, Request $request )
	{
		$passenger = Passenger::find( $id );

		if ( $passenger ) {
			$jobs = Job::where( 'passenger_id', $id )
			           ->where( 'user_id', $passenger->user_id )
			           ->orderBy( 'id', 'desc' );

			$limit    = $request->input( 'limit', 5 );
			$paginate = $jobs->paginate( $limit );

			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $paginate->items(), null, [
				"current_page" => $paginate->currentPage(),
				"total_pages"  => ceil( $paginate->total() / $paginate->perPage() )
			] );
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.passenger.not_found' ) );
		}
	}
}
