<?php

namespace App\Http\Controllers;

use App\Job;
use App\Message;
use App\Passenger;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use App\User;
use Illuminate\Support\Facades\Storage;
use JSONResponse;
use League\Csv\Writer;
use Validator;

class ApiUserController extends Controller
{
	/**
	 * ApiUserController constructor.
	 */
	function __construct()
	{
		//$this->middleware('auth:api');
	}

	/**
	 * @param $id
	 *
	 * @return mixed
	 */
	private function get_user( $id )
	{
		return User::find( $id );
	}

	/**
	 * @param $id
	 *
	 * @return mixed
	 */
	public function getUserById( $id )
	{
		$user = $this->get_user( $id );

		if ( $user ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $user );
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.NOT_FOUND' ), null, __( 'strings.user.not_found' ) );
		}
	}

	/**
	 * @param $id
	 *
	 * @return mixed
	 */
	public function getPublicUser( $id )
	{
		$user = $this->get_user( $id );

		if ( $user ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $user );
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.NOT_FOUND' ), null, __( 'strings.user.not_found' ) );
		}
	}

	/**
	 * @param $id
	 *
	 * @return mixed
	 */
	public function deleteUserById( $id )
	{
		$user = $this->get_user( $id );

		if ( ! $user ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.NOT_FOUND' ), null, __( 'strings.user.not_found' ) );
		}

		if ( $user->delete() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.user.destroyed' ) );
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.user.destroy_failed' ) );
		}
	}

	/**
	 * @param $id
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function updateUserById( $id, Request $request )
	{
		$user = $this->get_user( $id );

		if ( $request->has( 'old_password' ) ) {
			$old_password = $request->get( 'old_password' );

			$is_authenticated = Auth::attempt( [
				                                   'email'    => $user->email,
				                                   'password' => $old_password
			                                   ] );
			if ( ! $is_authenticated ) {
				return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.user.incorrect_old_password' ) );
			}
		}

		$data = $request->all();//only( [ 'username', 'phone', 'password' ] );

		$user->fill( $data );

		if ( $request->has( 'password' ) ) {
			$user->password = bcrypt( $request->get( 'password' ) );
		}

		if ( $user->save() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), null, __( 'strings.user.update_success' ) );
		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.user.update_failed' ) );
		}
	}

	/**
	 * @param $id
	 *
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function passengers( $id, Request $request )
	{
		$passengers = Passenger::where( 'user_id', $id );

		$limit    = $request->input( 'limit', 5 );
		$paginate = $passengers->paginate( $limit );

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $paginate->items(), null, [
			"current_page" => $paginate->currentPage(),
			"total_pages"  => ceil( $paginate->total() / $paginate->perPage() )
		] );
	}

	/**
	 * @param $id
	 *
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function threads( $id, Request $request )
	{
		$threads = Message::groupBy( [ 'passenger_id' ] )
		                  ->select( [ 'passenger_id' ] )
		                  ->where( 'user_id', $id );

		$limit    = $request->input( 'limit', 5 );
		$paginate = $threads->paginate( $limit );

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $paginate->items(), null, [
			"current_page" => $paginate->currentPage(),
			"total_pages"  => ceil( $paginate->total() / $paginate->perPage() )
		] );
	}

	/**
	 * @param $id
	 * @param $status
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function jobs( $id, $status, Request $request )
	{
		$jobs = Job::where( 'user_id', $id )
		           ->where( 'status', $status );

		$limit    = $request->input( 'limit', 5 );
		$paginate = $jobs->paginate( $limit );

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), $paginate->items(), null, [
			"current_page" => $paginate->currentPage(),
			"total_pages"  => ceil( $paginate->total() / $paginate->perPage() )
		] );
	}

	/**
	 * @param $id
	 * @param $status
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function filter_jobs( $id, $status, Request $request )
	{
		$validation_rules = [
			'start_date' => 'required_with:end_date|date_format:Y-m-d',
			'end_date'   => 'required_with:start_date|date_format:Y-m-d',
			'month'      => 'required_without:start_date,end_date'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		if ( $request->has( 'month' ) ) {
			$month_date = Carbon::now();
			$month_date->setDate( $month_date->year, $request->input( 'month' ), 1 );

			$start = $month_date->toDateString();
			$month_date->addMonth();
			$month_date->subDay();
			$end = $month_date->toDateString();
		} else if ( $request->has( 'start_date' ) && $request->has( 'end_date' ) ) {
			$start = Carbon::parse( $request->input( 'start_date' ) )->toDateString();
			$end   = Carbon::parse( $request->input( 'end_date' ) )->toDateString();
		}

		$jobs = Job::where( 'user_id', $id )
		           ->where( 'status', $status )
		           ->whereDate( 'timestamp', '>=', $start )
		           ->whereDate( 'timestamp', '<=', $end )
		           ->orderBy( 'timestamp' );

		$limit    = $request->input( 'limit', 5 );
		$paginate = $jobs->paginate( $limit );

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
	public function generate( $id, Request $request )
	{
		$validation_rules = [
			'from_date' => 'date_format:Y-m-d',
			'to_date'   => 'date_format:Y-m-d'
		];

		$validator = Validator::make( $request->all(), $validation_rules );
		$messages  = $validator->messages()->all();

		if ( $validator->fails() ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, $messages[0] );
		}

		$filename = 'summary-' . $id . '.csv';
		$path     = 'app/public/' . $filename;
		$jobs     = Job::with( [ 'passenger' ] )->where( 'user_id', $id )->where( 'status', 'done' );

		if ( $request->has( 'from_date' ) ) {
			$jobs = $jobs->whereDate( 'timestamp', '>=', $request->input( 'from_date' ) );
		}
		if ( $request->has( 'to_date' ) ) {
			$jobs = $jobs->whereDate( 'timestamp', '<=', $request->input( 'to_date' ) );
		}

		if ( $jobs->exists() ) {
			$csv = Writer::createFromFileObject( new \SplFileObject( storage_path( $path ), "w+" ) );
			$csv->insertOne( [ 'Passenger', 'Pickup', 'Drop', 'Amount', 'Timestamp' ] );

			$jobs->each( function ( $job ) use ( &$csv ) {
				$csv->insertOne( [
					                 $job->passenger->name,
					                 $job->pickup,
					                 $job->drop,
					                 $job->final_amount,
					                 $job->timestamp_obj->toDateTimeString()
				                 ] );
			} );

		} else {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.job.not_found' ) );
		}

		if ( file_exists( storage_path( $path ) ) ) {
			return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.SUCCESS' ), [
				'path' => asset( 'storage/' . $filename )
			] );
		}

		return JSONResponse::encode( Config::get( 'constants.HTTP_CODES.FAILED' ), null, __( 'strings.job.generate_failed' ) );
	}
}
