<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBulkDeleteColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->softDeletes('deleted_at')->nullable();
        });
        Schema::table('collections', function (Blueprint $table) {
            $table->softDeletes('deleted_at')->nullable();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->softDeletes('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('collections', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
    }
}
