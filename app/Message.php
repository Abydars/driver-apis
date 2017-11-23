<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'id',
		'passenger_id',
		'user_id',
		'message',
		'timestamp',
		'meta_data',
		'sender_type',
		'is_read'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [];

	protected $appends = [
		'timestamp_obj'
	];

	protected $table = 'messages';
	public $timestamps = false;

	/**
	 * @return Carbon
	 */
	public function getTimestampObjAttribute()
	{
		return Carbon::parse( $this->timestamp );
	}

	/**
	 * @param $value
	 *
	 * @return array|mixed
	 */
	public function getMetaDataAttribute( $value )
	{
		if ( ! empty( $value ) ) {
			return json_decode( $value, true );
		}

		return [];
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function passenger()
	{
		return $this->belongsTo( 'App\Passenger', 'passenger_id' );
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function user()
	{
		return $this->belongsTo( 'App\User', 'user_id' );
	}
}
