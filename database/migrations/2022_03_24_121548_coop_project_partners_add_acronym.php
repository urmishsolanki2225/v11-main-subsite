<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CoopProjectPartnersAddAcronym extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('coop_project_partners', function (Blueprint $table) {
            $table->string('acronym', 20)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('coop_project_partners', function (Blueprint $table) {
            $table->dropColumn('acronym');
        });
    }
}
