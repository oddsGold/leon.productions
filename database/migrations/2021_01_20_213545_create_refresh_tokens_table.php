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
        Schema::create('refresh_tokens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('token', 64)->unique();
            $table->string('user_agent');
            $table->ipAddress('ip_address');
            $table->timestamp('expiration_in', 0)->nullable();
            $table->softDeletes();
            $table->timestamps();
            $table->charset = 'utf8mb4';

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refresh_tokens');
    }
};
