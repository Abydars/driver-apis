<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
	protected $fillable = [
		'user_id',
		'theme',
		'fixed',
		'boxed',
		'rtl',
		'collapsed',
		'collapsed_text',
		'float',
		'hover',
		'show_scrollbar',
	];

	protected $primaryKey = 'user_id';

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function user()
	{
		return $this->hasOne( 'App\User' );
	}
}
