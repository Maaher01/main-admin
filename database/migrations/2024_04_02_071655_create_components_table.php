<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->string('_title');
            $table->string('_subtitle')->nullable();;
            $table->string('_image')->nullable();;
            $table->string('_videourl')->nullable();;
            $table->string('_link')->nullable();;
            $table->string('_description')->nullable();;
            $table->integer('_sort');
            $table->integer('_menuid');
            $table->integer('_sectionid');
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
        Schema::dropIfExists('components');
    }
}
