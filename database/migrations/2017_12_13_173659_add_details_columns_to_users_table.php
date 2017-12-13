<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDetailsColumnsToUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table( 'users', function ( Blueprint $table ) {
			$table->string( 'company' )->nullable();
			$table->string( 'address' )->nullable();
			$table->string( 'abn' )->nullable();
			$table->string( 'car_number' )->nullable();
			$table->string( 'car_image' )->nullable();
			$table->string( 'photo' )->nullable();
		} );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}
}
