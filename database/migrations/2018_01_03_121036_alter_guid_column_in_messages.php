<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterGuidColumnInMessages extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		try {
			Schema::table( 'messages', function ( Blueprint $table ) {
				$table->dropColumn( 'guid' );
			} );
		} catch (Exception $e) {
			
		}

		Schema::table( 'messages', function ( Blueprint $table ) {
			$table->longText( 'guid' )->nullable();
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
