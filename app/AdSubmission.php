<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdSubmission extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'data',
		'advertisement_id',
		'user_id'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [];

	protected $table = 'advertisement_submissions';
	public $timestamps = false;

	/**
	 * @param $value
	 *
	 * @return array|mixed
	 */
	public function getDataAttribute( $value )
	{
		if ( ! empty( $value ) ) {
			return json_decode( $value, true );
		}

		return [];
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function user()
	{
		return $this->belongsTo( 'App\User', 'user_id' );
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function advertisement()
	{
		return $this->belongsTo( 'App\Advertisement', 'advertisement_id' );
	}
}
