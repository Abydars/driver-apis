<?php

namespace App\Http\Controllers;

use App\Advertisement;
use Illuminate\Http\Request;
use Datatables;
use Validator;

class AdsController extends Controller
{
	public function index()
	{
		$ads = Advertisement::all();

		return view( 'ads.index', [
			'ads' => count( $ads )
		] );
	}

	public function data()
	{
		return Datatables::of( Advertisement::all() )->make( true );
	}

	public function add()
	{
		return view( 'ads.add' );
	}

	public function store( Request $request )
	{
		$validator = Validator::make( $request->all(), [
			'title' => 'required',
			'email' => 'required|email'
		] );

		if ( $validator->fails() ) {
			$error_message = $validator->errors()->first();

			return response()->json( [
				                         'status' => 'danger',
				                         'message' => $error_message
			                         ] );
		}

		$ad = Advertisement::create( $request->only( [ 'title', 'email', 'content' ] ) );

		if ( $ad->id > 0 ) {
			return response()->json( [
				                         'status'  => 'success',
				                         'message' => 'Advertisement created successfully'
			                         ] );
		}

		return response()->json( [
			                         'status' => 'danger',
			                         'errors' => 'Failed to create advertisement'
		                         ] );
	}
}
