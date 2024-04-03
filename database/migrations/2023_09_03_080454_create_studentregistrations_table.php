<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentregistrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('studentregistrations', function (Blueprint $table) {
            $table->id();
            $table->string('_name');
            $table->date('_dob');
            $table->string('_email')->nullable();
            $table->string('_mobile');
            $table->string('_ielts')->nullable();;
            $table->integer('_countryid');
            $table->text('_qualification')->nullable();;
            $table->tinyInteger('_passport');
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
        Schema::dropIfExists('studentregistrations');
    }
}
