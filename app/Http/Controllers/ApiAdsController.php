<?php

namespace App\Http\Controllers;

use App\AdSubmission;
use App\Advertisement;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use JSONResponse;
use Validator;

class ApiAdsController extends Controller
{
	/**
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function data( Request $request )
	{
		$ads      = Advertisement::orderBy( 'id', 'desc' );
		$limit    = $request->input( 'limit', 5 );
		$paginate = $ads->paginate( $limit );

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
	public function submit( $id, Request $request )
	{
		$validation_rules = [
			'name'  => 'required',
			'email' => 'required',
			'code'  => 'required|exists:users,code'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$ad   = Advertisement::find( $id );
		$user = User::where( 'code', $request->input( 'code' ) )->first();

		if ( $ad && $user ) {
			$submission = AdSubmission::create( [
				                                    'data'             => json_encode( $request->all() ),
				                                    'advertisement_id' => $ad->id,
				                                    'user_id'          => $user->id
			                                    ] );
			if ( $submission->id > 0 ) {
				return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $submission );
			}
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.adsubmission.creation_failed' ) );
	}
}
