<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddDummyDiscountOffers extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table( 'advertisements' )->insert( [
			                                       'title'   => 'Free Title',
			                                       'content' => 'This is the content',
			                                       'image'   => 'storage/images/ads.png',
			                                       'email'   => 'abidr.w@gmail.com'
		                                       ] );
		DB::table( 'advertisements' )->insert( [
			                                       'title'   => 'Free Title',
			                                       'content' => 'This is the content',
			                                       'image'   => 'storage/images/ads.png',
			                                       'email'   => 'abidr.w@gmail.com'
		                                       ] );
		DB::table( 'advertisements' )->insert( [
			                                       'title'   => 'Free Title',
			                                       'content' => 'This is the content',
			                                       'image'   => 'storage/images/ads.png',
			                                       'email'   => 'abidr.w@gmail.com'
		                                       ] );
		DB::table( 'advertisements' )->insert( [
			                                       'title'   => 'Free Title',
			                                       'content' => 'This is the content',
			                                       'image'   => 'storage/images/ads.png',
			                                       'email'   => 'abidr.w@gmail.com'
		                                       ] );
	}
}
