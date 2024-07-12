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
        Schema::table("resource_embeds", function (Blueprint $table) {
            $table->dropColumn("provider");
            $table->string("post_url", 1000)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("resource_embeds", function (Blueprint $table) {
            $table->dropColumn("post_url");
        });
    }
};
