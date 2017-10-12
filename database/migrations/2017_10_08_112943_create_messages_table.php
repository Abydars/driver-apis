<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create( 'messages', function ( Blueprint $table ) {
			$table->increments( 'id' );
			$table->integer( 'passenger_id' )->unsigned();
			$table->integer( 'user_id' )->unsigned();
			$table->string( 'message' );
			$table->dateTime( 'timestamp' )->default( DB::raw( 'CURRENT_TIMESTAMP' ) );
			$table->longText( 'meta_data' )->nullable();
			$table->enum( 'sender_type', [
				'user',
				'passenger'
			] );

			$table->foreign( 'passenger_id' )->references( 'id' )->on( 'passengers' )->onDelete( 'cascade' );
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
		Schema::dropIfExists( 'messages' );
	}
}
