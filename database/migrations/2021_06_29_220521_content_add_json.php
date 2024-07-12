<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ContentAddJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('item_contents', function (Blueprint $table) {
            $table->json('blurb_json')->nullable();
            $table->json('content_json')->nullable();
        });
        Schema::table('collection_contents', function (Blueprint $table) {
            $table->json('blurb_json')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('item_contents', function (Blueprint $table) {
            $table->dropColumn('blurb_json');
            $table->dropColumn('content_json');
        });
        Schema::table('collection_contents', function (Blueprint $table) {
            $table->dropColumn('blurb_json');
        });
    }
}
