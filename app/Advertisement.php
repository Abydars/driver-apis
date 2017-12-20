<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'title',
		'content',
		'image',
		'email'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [];

	protected $appends = [
		'image_url'
	];

	protected $table = 'advertisements';
	public $timestamps = false;

	public function getImageUrlAttribute()
	{
		if ( $this->image ) {
			return url( $this->image );
		}
	}
}
