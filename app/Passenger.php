<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Passenger extends Model
{
	use Notifiable;
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name',
		'phone',
		'user_id',
		'udid',
		'meta_data',
		'registration_date'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'api_token'
	];

	protected $appends = [
		'registration_date_obj'
	];

	protected $table = 'passengers';
	public $timestamps = false;

	/**
	 * @return Carbon
	 */
	public function getRegistrationDateObjAttribute()
	{
		return Carbon::parse( $this->registration_date );
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
	public function user()
	{
		return $this->belongsTo( 'App\User', 'user_id' );
	}

	/**
	 * @return mixed
	 */
	public function routeNotificationForOneSignal()
	{
		return $this->udid;
	}
}
