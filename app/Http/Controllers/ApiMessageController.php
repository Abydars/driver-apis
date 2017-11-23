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
			'sender_type'  => 'required'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$meta_data = $request->input( 'meta_data', [] );

		if ( $meta_data ) {
			$meta_data = json_decode( $meta_data, true );
		}

		$arg = [
			'passenger_id' => $request->input( 'passenger_id' ),
			'user_id'      => $request->input( 'user_id' ),
			'message'      => $request->input( 'message' ),
			'sender_type'  => $request->input( 'sender_type' ),
			'meta_data'    => $request->input( 'meta_data', [] ),
			'is_read'      => false
		];

		if ( ! empty( $meta_data['message']['_id'] ) ) {
			$arg['id'] = $meta_data['message']['_id'];
		}

		if ( ! empty( $meta_data['message']['createdAt'] ) ) {
			$timestamp        = Carbon::parse( $meta_data['message']['createdAt'] );
			$arg['timestamp'] = $timestamp->toDateTimeString();
		}

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
