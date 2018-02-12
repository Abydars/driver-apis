<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Datatables;
use Dashboard;

class UserController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function dashboard()
	{
		Dashboard::setTitle( 'Dashboard' );

		return view( 'user.dashboard' );
	}

	public function index()
	{
		return view( 'user.index' );
	}

	/**
	 * @return mixed
	 */
	public function data()
	{
		return Datatables::of( User::with( [ 'role' ] )->get() )->make( true );
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function store( Request $request )
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\User $user
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( User $user )
	{
		return view( 'user.show', [
			'user' => $user
		] );
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param $id
	 *
	 * @return \Illuminate\Http\Response
	 *
	 */
	public function edit( $id )
	{
		$user = User::find( $id );

		Dashboard::setTitle('Edit User');

		return view( 'user.edit', [
			'user' => $user
		] );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \App\User $user
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, User $user )
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
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\User $user
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function destroy( User $user )
	{
		if ( $user->delete() ) {
			return response()->json( [
				                         'status'  => 'success',
				                         'message' => 'User delete successfully'
			                         ] );
		}
	}

	public function approve( $id )
	{
		$user = User::find( $id );

		$user->status = 'active';
		$user->save();

		return response()->redirectToRoute( 'admin.user.edit', [ $user->id ] );
	}

	public function suspend( $id )
	{
		$user = User::find( $id );

		$user->status = 'suspended';
		$user->save();

		return response()->redirectToRoute( 'admin.user.edit', [ $user->id ] );
	}
}
