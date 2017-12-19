<?php

namespace App\Http\Controllers;

use App\Event;
use App\Events\TestEvent;
use App\Organization;
use App\OrganizationLocation;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware( 'auth' );
		$this->title = 'Dashboard';
	}

	/**
	 * Show the application dashboard.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$user = Auth::user();

		$users = User::all()->count();

		return view( 'home', [
			'users' => $users
		] );
	}
}
