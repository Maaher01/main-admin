<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeneralqueriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('generalqueries', function (Blueprint $table) {
            $table->id();
            $table->string('_firstname')->nullable();
            $table->string('_lastname')->nullable();
            $table->string('_email')->nullable();
            $table->string('_phone');
            $table->longtext('_message');
            $table->tinyInteger('_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('generalqueries');
    }
}
