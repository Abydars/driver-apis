<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserMeta extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'user_id',
		'key',
		'value'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'user_id',
		'id'
	];

	protected $table = 'user_meta';
	public $timestamps = false;

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function user()
	{
		return $this->belongsTo( 'App\User', 'user_id' );
	}
}
