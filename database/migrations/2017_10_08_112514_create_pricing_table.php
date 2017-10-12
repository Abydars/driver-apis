<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePricingTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create( 'pricing', function ( Blueprint $table ) {
			$table->increments( 'id' );
			$table->integer( 'passenger_id' )->unsigned();
			$table->string( 'pickup' );
			$table->string( 'drop' );
			$table->float( 'amount' )->default( 0 );

			$table->foreign( 'passenger_id' )->references( 'id' )->on( 'passengers' )->onDelete( 'cascade' );
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
		Schema::dropIfExists( 'pricing' );
	}
}
