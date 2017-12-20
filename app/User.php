<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
	use Notifiable;
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'email',
		'username',
		'password',
		'code',
		'registration_date',
		'approval_date',
		'role_id',
		'remember_token',
		'udid',
		'meta_data',
		'status',
		'phone',
		'company',
		'address',
		'abn',
		'car_number',
		'car_image',
		'photo'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'api_token',
		'password'
	];

	protected $appends = [
		'registration_date_obj',
		'photo_base64',
		'car_image_base64'
	];

	protected $table = 'users';
	public $timestamps = false;

	/**
	 * @return mixed
	 */
	public function routeNotificationForOneSignal()
	{
		return $this->udid;
	}

	/**
	 * @return Carbon
	 */
	public function getRegistrationDateObjAttribute()
	{
		return Carbon::parse( $this->registration_date );
	}

	public function getPhotoBase64Attribute()
	{
		if ( $this->photo ) {
			return "data:image/jpg;base64," . base64_encode( file_get_contents( storage_path( $this->photo ) ) );
		}
	}

	public function getCarImageBase64Attribute()
	{
		if ( $this->car_image ) {
			return "data:image/jpg;base64," . base64_encode( file_get_contents( storage_path( $this->car_image ) ) );
		}
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function role()
	{
		return $this->belongsTo( 'App\UserRole', 'role_id' );
	}
}