<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    Schema::create('user_roles', function (Blueprint $table) {
		    $table->increments( 'id' );
		    $table->string('name');
	    });

	    DB::table('user_roles')->insert(
		    array(
			    [
				    'id'    => 1,
				    'name'  => 'administrator'
			    ],
			    [
				    'id'    => 2,
				    'name'  => 'subscriber'
			    ]
		    )
	    );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_roles');
    }
}
