<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdvertisementSubmissionsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create( 'advertisement_submissions', function ( Blueprint $table ) {
			$table->increments( 'id' );
			$table->longText( 'data' );
			$table->integer( 'user_id' )->unsigned();
			$table->integer( 'advertisement_id' )->unsigned();

			$table->foreign( 'advertisement_id' )->references( 'id' )->on( 'advertisements' )->onDelete( 'cascade' );
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
		Schema::dropIfExists( 'advertisement_submissions' );
	}
}
