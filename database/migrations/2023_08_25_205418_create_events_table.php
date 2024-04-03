<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('_title')->nullable();
            $table->string('_subtitle')->nullable();
            $table->string('_description')->nullable();
            $table->string('_image')->nullable();
            $table->string('_latlong')->nullable();
            $table->timestamp('_date')->nullable();
            $table->string('_time')->nullable();
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
        Schema::dropIfExists('events');
    }
}
