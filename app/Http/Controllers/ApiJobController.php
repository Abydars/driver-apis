<?php

namespace App\Http\Controllers;

use App\Events\NewEntryEvent;
use App\Events\SingleJob;
use App\Events\SinglePassengerJob;
use App\Events\UpdateAwaitingJobs;
use App\Events\UpdateCompletedJobs;
use App\Events\UpdatePassengerJobs;
use App\Events\UpdatePendingJobs;
use App\Job;
use App\Notifications\BidAccepted;
use App\Notifications\BidReply;
use App\Notifications\NewJobPosted;
use App\User;
use Dompdf\Adapter\PDFLib;
use Dompdf\Dompdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Validator;
use JSONResponse;

class ApiJobController extends Controller
{
	/**
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function add( Request $request )
	{
		$validation_rules = [
			'pickup'       => 'required',
			'drop'         => 'required',
			'passenger_id' => 'required|exists:passengers,id',
			'code'         => 'required|exists:users,code',
			'timestamp'    => 'required|date_format:Y-m-d H:i'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$user   = User::where( 'code', $request->input( 'code' ) )->first();
		$is_bid = $request->input( 'is_bid', '0' ) == '1';

		$job = Job::create( [
			                    'pickup'             => $request->input( 'pickup' ),
			                    'drop'               => $request->input( 'drop' ),
			                    'passenger_id'       => $request->input( 'passenger_id' ),
			                    'user_id'            => $user->id,
			                    'passenger_comments' => $request->input( 'comments' ),
			                    'status'             => ( $is_bid ? 'bid' : 'pending' ),
			                    'timestamp'          => $request->input( 'timestamp' )
		                    ] );

		if ( $job->id > 0 ) {
			$job = Job::with( 'user' )->find( $job->id );

			try {
				$job->user->notify( new NewJobPosted( $job ) );
			} catch ( \Exception $e ) {

			}

			if ( $is_bid ) {
				event( new UpdateAwaitingJobs( $job->user_id ) );
			} else {
				event( new UpdatePendingJobs( $job->user_id ) );
			}

			event( new UpdatePassengerJobs( $job->passenger_id ) );
			event( new SinglePassengerJob( $job ) );
			event( new SingleJob( $job ) );

			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $job );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.job.creation_failed' ) );
	}

	/**
	 * @param $id
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function complete( $id, Request $request )
	{
		$validation_rules = [
			'final_amount' => 'required'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$job = Job::find( $id );

		if ( $job && $job->status == 'pending' ) {
			$job->fill( [
				            'final_amount'  => $request->input( 'final_amount' ),
				            'user_comments' => $request->input( 'comments' )
			            ] );
			$job->status = 'done';

			if ( $job->save() ) {
				event( new UpdateCompletedJobs( $job->user_id ) );
				event( new UpdateAwaitingJobs( $job->user_id ) );
				event( new UpdatePendingJobs( $job->user_id ) );
				event( new UpdatePassengerJobs( $job->passenger_id ) );
				event( new SinglePassengerJob( $job ) );
				event( new SingleJob( $job ) );

				return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.job.update_success' ) );
			}
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.job.update_failed' ) );
	}

	/**
	 * @param $id
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function bid_reply( $id, Request $request )
	{
		$validation_rules = [
			'bid_amount' => 'required'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$job = Job::with( 'passenger' )->find( $id );

		if ( $job ) {
			if ( $job->status == 'bid' ) {
				$job->fill( $request->only( [ 'bid_amount' ] ) );

				if ( $job->save() ) {
					try {
						$job->passenger->notify( new BidReply( $job ) );
					} catch ( \Exception $e ) {

					}

					event( new UpdateAwaitingJobs( $job->user_id ) );
					event( new UpdatePendingJobs( $job->user_id ) );
					event( new UpdatePassengerJobs( $job->passenger_id ) );
					event( new SinglePassengerJob( $job ) );
					event( new SingleJob( $job ) );

					return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.job.bid_success' ) );
				}
			} else {
				return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.job.already_bidded' ) );
			}
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.job.not_found' ) );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.job.bid_failed' ) );
	}

	/**
	 * @param $id
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function bid_accept( $id, Request $request )
	{
		$validation_rules = [
			'is_accepted' => 'required'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$is_accepted = $request->input( 'is_accepted', false ) == '1';
		$job         = Job::with( 'user' )->find( $id );

		if ( $job && $job->status == 'bid' ) {
			$job->status = $is_accepted ? 'pending' : 'rejected';

			if ( $job->save() ) {
				try {
					$job->user->notify( new BidAccepted( $job ) );
				} catch ( \Exception $e ) {

				}

				event( new UpdateAwaitingJobs( $job->user_id ) );
				event( new UpdatePendingJobs( $job->user_id ) );
				event( new UpdatePassengerJobs( $job->passenger_id ) );
				event( new SinglePassengerJob( $job ) );
				event( new SingleJob( $job ) );

				return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.job.bid_accepted' ) );
			}
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.job.bid_accept_failed' ) );
	}

	/**
	 * @param $id
	 *
	 * @return mixed
	 */
	public function get( $id )
	{
		$job = Job::with( 'passenger' )->find( $id );

		if ( $job ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $job );
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.job.not_found' ) );
		}
	}
}
