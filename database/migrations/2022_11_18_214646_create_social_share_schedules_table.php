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
        Schema::create("social_share_schedules", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("content_type");
            $table->integer("content_id");
            $table->datetime("share_at");
            $table->string("platform"); // twitter, facebook, linkedin
            $table->boolean("done")->default(false);
            $table->string("url")->nullable(); // the url of the share, after it was published
            $table->string("error")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("social_share_schedules");
    }
};
