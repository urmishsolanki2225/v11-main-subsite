<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("social_media", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            // $table->longText("token")->nullable();
            $table->longText("access_token")->nullable();
            $table->longText("access_token_secret")->nullable();
            // $table->string('app_id')->nullable();
            // $table->string('app_name')->nullable();
            // $table->string('app_secret')->nullable();
            $table->datetime("token_issued_at")->nullable();
            $table->datetime("token_expires_at")->nullable();
            // for linkedin we get a refresh token, so the token_expires_at will hold that value
            // whilst the access_token_expires_at is used to check whether we have to fetch a new token
            $table->longText("refresh_token")->nullable();
            $table->datetime("access_token_expires_at")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("social_media");
    }
};
