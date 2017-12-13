<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDetailsColumnsToPassengers extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table( 'passengers', function ( Blueprint $table ) {
			$table->string( 'email' )->nullable();
			$table->string( 'company' )->nullable();
			$table->string( 'address' )->nullable();
			$table->string( 'user_comments' )->nullable();
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
