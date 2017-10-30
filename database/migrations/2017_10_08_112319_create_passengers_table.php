<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePassengersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create( 'passengers', function ( Blueprint $table ) {
			$table->increments( 'id' );
			$table->string( 'name' );
			$table->string( 'phone' )->nullable();
			$table->string( 'user_comments' )->nullable();
			$table->string( 'udid' )->nullable();
			$table->longText( 'meta_data' )->nullable();
			$table->integer( 'user_id' )->unsigned();
			$table->dateTime( 'registration_date' )->default( DB::raw( 'CURRENT_TIMESTAMP' ) );
			$table->string( 'api_token' )->nullable();

			$table->foreign( 'user_id' )->references( 'id' )->on( 'users' )->onDelete( 'cascade' );
		} );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::disableForeignKeyConstraints();
		Schema::dropIfExists( 'passengers' );
	}
}
