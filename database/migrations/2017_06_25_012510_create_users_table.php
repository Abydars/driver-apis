<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create( 'users', function ( Blueprint $table ) {
			$table->increments( 'id' );
			$table->string( 'email' );
			$table->string( 'username' );
			$table->string( 'password' );
			$table->string( 'code' )->nullable();
			$table->dateTime( 'registration_date' )->default( DB::raw( 'CURRENT_TIMESTAMP' ) );
			$table->dateTime( 'approval_date' )->nullable();
			$table->integer( 'role_id' )->unsigned()->default( \App\UserRole::getDefaultRole()->id );
			$table->string( 'remember_token' )->nullable();
			$table->string( 'udid' )->nullable();
			$table->longText( 'meta_data' )->nullable();
			$table->string( 'status' )->default( 'active' );
			$table->string( 'phone' )->nullable();
			$table->string( 'api_token' )->nullable();

			$table->foreign( 'role_id' )->references( 'id' )->on( 'user_roles' )->onDelete( 'cascade' );
		} );

		DB::table( 'users' )->insert(
			array(
				[
					'id'       => 1,
					'email'    => 'admin@hztech.biz',
					'username' => 'admin',
					'password' => bcrypt( 'driverapp123!' ),
					'role_id'  => \App\UserRole::getAdminRole()->id
				]
			) );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::disableForeignKeyConstraints();
		Schema::dropIfExists( 'users' );
	}
}
