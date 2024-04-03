<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('_title');
            $table->string('_subtitle')->nullable();
            $table->longText('_description');
            $table->integer('_countryid');
            $table->integer('_degreeid');
            $table->integer('_universityid');
            $table->string('_livingcost')->nullable();
            $table->string('_duration')->nullable();
            $table->string('_credit')->nullable();
            $table->string('_tutionfees')->nullable();
            $table->string('_applicationfees')->nullable();
            $table->string('_programintake')->nullable();
            $table->string('_document')->nullable();
            $table->timestamp('_programintakeopendate')->nullable();
            $table->timestamp('_programintakedeadline')->nullable();
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
        Schema::dropIfExists('courses');
    }
}
