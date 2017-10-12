<?php

namespace App\Http\Controllers;

use App\Pricing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Validator;
use JSONResponse;

class ApiPricingController extends Controller
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
			'pickup'       => 'required',
			'drop'         => 'required',
			'amount'       => 'required'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$pricing = Pricing::create( $request->only( [ 'passenger_id', 'pickup', 'drop', 'amount' ] ) );

		if ( $pricing->id > 0 ) {
			$pricing = Pricing::find( $pricing->id );

			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $pricing );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.pricing.creation_failed' ) );
	}

	/**
	 * @param $id
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function edit( $id, Request $request )
	{
		$pricing = Pricing::find( $id );
		$pricing->fill( [
			                'pickup' => $request->input( 'pickup', $pricing->pickup ),
			                'drop'   => $request->input( 'drop', $pricing->drop ),
			                'amount' => $request->input( 'amount', $pricing->amount ),
		                ] );

		if ( $pricing->save() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.pricing.update_success' ) );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.pricing.update_failed' ) );
	}

	/**
	 * @param $id
	 *
	 * @return mixed
	 */
	public function destroy( $id )
	{
		$pricing = Pricing::find( $id );

		if ( $pricing && $pricing->delete() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.pricing.destroyed' ) );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.pricing.destroy_failed' ) );
	}
}
