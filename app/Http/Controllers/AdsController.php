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

	public function add( Request $request )
	{
		$error = false;

		if ( $request->isMethod( 'POST' ) ) {
			$validator = Validator::make( $request->all(), [
				'title' => 'required',
				'email' => 'required|email',
				'image' => 'image|mimes:png,jpg,jpeg,gif|max:2048'
			] );

			if ( $validator->fails() ) {
				$error_message = $validator->errors()->first();

				$error = $error_message;
			} else {

				$path         = 'app/public/photos/';
				$symlink_path = 'storage/photos/';

				$data    = $request->only( [ 'title', 'email', 'content' ] );
				$ad      = Advertisement::create( $data );
				$created = $ad->id > 0;

				if ( $request->hasFile( 'image' ) ) {
					$file     = $request->file( 'image' );
					$filename = 'ad-' . $ad->id . '.' . $file->clientExtension();
					$f        = $file->move( storage_path( $path ), $filename );

					if ( $f->isReadable() ) {
						$ad->image = $symlink_path . $filename;
					}
					$created &= $ad->save();
				}

				if ( $created ) {
					return response()->redirectToRoute( 'admin.ads' );
				}
			}
		}

		return view( 'ads.add', [
			'error' => $error
		] );
	}
}
