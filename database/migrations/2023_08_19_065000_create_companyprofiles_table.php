<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyprofilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companyprofiles', function (Blueprint $table) {
            $table->id();
            $table->string('_name');
            $table->string('_email')->unique();
            $table->string('_phone')->nullable();
            $table->string('_mobile');
            $table->string('_latlong')->nullable();
            $table->string('_description')->nullable();
            $table->string('_website')->nullable();
            $table->string('_image')->nullable();
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
        Schema::dropIfExists('companyprofiles');
    }
}
