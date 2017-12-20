<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
	public function index()
	{
		$users = User::all();

		return view('dashboard.index', [
			'users' => count($users)
		]);
	}
}
