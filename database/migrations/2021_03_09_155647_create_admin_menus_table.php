<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_menus', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->unsignedBigInteger('parent_id')->index()->nullable();
            $table->unsignedBigInteger('resource_id')->index()->nullable();
            $table->string('name');
            $table->string('urn')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('resource_id')->references('id')->on('resources');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin_menus');
    }
};
