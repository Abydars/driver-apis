<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name'
	];

	protected $table = "user_roles";
	public $timestamps = false;

	/**
	 * @return mixed
	 */
	public static function getDefaultRole()
	{
		return UserRole::where( 'name', 'subscriber' )->get()->first();
	}

	/**
	 * @return mixed
	 */
	public static function getAdminRole()
	{
		return UserRole::where( 'name', 'administrator' )->get()->first();
	}
}
