<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pricing extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'passenger_id',
		'pickup',
		'drop',
		'amount'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [];

	protected $table = 'pricing';
	public $timestamps = false;

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function passenger()
	{
		return $this->belongsTo( 'App\Passenger', 'passenger_id' );
	}
}
