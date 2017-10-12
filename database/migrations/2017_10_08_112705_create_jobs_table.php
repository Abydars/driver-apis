<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create( 'jobs', function ( Blueprint $table ) {
			$table->increments( 'id' );
			$table->string( 'pickup' );
			$table->string( 'drop' );
			$table->string( 'passenger_comments' )->nullable();
			$table->string( 'user_comments' )->nullable();
			$table->integer( 'passenger_id' )->unsigned();
			$table->integer( 'user_id' )->unsigned();
			$table->float( 'bid_amount' )->default( 0 );
			$table->float( 'final_amount' )->default( 0 );
			$table->dateTime( 'timestamp' )->default( DB::raw( 'CURRENT_TIMESTAMP' ) );
			$table->longText( 'meta_data' )->nullable();
			$table->enum( 'status', [ 'pending', 'done', 'bid', 'rejected' ] )->default( 'pending' );

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
		Schema::dropIfExists( 'jobs' );
	}
}
