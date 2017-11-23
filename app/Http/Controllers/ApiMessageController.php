<?php

namespace App\Http\Controllers;

use App\Message;
use App\Notifications\NewMessage;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Validator;
use JSONResponse;

class ApiMessageController extends Controller
{
	/**
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function add( Request $request )
	{
		$validation_rules = [
			'passenger_id' => 'required|exists:passengers,id',
			'user_id'      => 'required|exists:users,id',
			'message'      => 'required',
			'sender_type'  => 'required',
			'guid'         => 'required',
			'timestamp'    => 'required'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$timestamp = Carbon::parse( $request->input( 'timestamp' ) );
		$arg       = [
			'passenger_id' => $request->input( 'passenger_id' ),
			'user_id'      => $request->input( 'user_id' ),
			'message'      => $request->input( 'message' ),
			'sender_type'  => $request->input( 'sender_type' ),
			'timestamp'    => $timestamp->toDateTimeString(),
			'guid'         => $request->input( 'guid' ),
			'is_read'      => false
		];

		$message = Message::create( $arg );

		if ( $message->id > 0 ) {
			$message = Message::with( [ 'user', 'passenger' ] )->find( $message->id );

			try {
				if ( $message->sender_type == 'passenger' ) {
					$message->user->notify( new NewMessage( $message ) );
				} else {
					$message->passenger->notify( new NewMessage( $message ) );
				}
			} catch ( \Exception $e ) {

			}

			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $message );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.message.creation_failed' ) );
	}

	/**
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function read( Request $request )
	{
		$validation_rules = [
			'message_ids' => 'required|array'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$messages = Message::whereIn( 'id', $request->input( 'message_ids' ) );
		$messages->update( [
			                   'is_read' => true
		                   ] );

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.message.read_success' ) );
	}
}
