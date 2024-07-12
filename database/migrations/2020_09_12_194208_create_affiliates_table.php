<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAffiliatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('affiliates', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->string('membership_uuid')->nullable();
            // we associate afffiliate with item, the item title is the name $table->string('name')->nullable();
            $table->string('official_name')->nullable();
            $table->string('acronym')->nullable();
            $table->string('regional_office')->nullable();
            $table->string('preferred_language')->nullable();
            $table->string('phone_main')->nullable();
            $table->string('phone_other')->nullable();
            $table->string('phone_other2')->nullable();
            $table->string('fax_main')->nullable();
            $table->string('fax_other')->nullable();
            $table->string('website')->nullable();
            $table->string('email')->nullable();
            $table->string('email_other')->nullable();
            $table->string('street1')->nullable();
            $table->string('street2')->nullable();
            $table->string('street3')->nullable();
            $table->string('zip')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country_code')->nullable();
            $table->string('membership_id')->nullable();
            $table->string('authorization_code')->nullable();
            $table->integer('year_establishment')->nullable();
            $table->date('membership_start')->nullable();
            $table->string('president')->nullable();
            $table->string('general_secretary')->nullable();
            $table->string('additional_contact')->nullable();
            $table->string('person_in_charge')->nullable();
            $table->enum('is_active', ['0','1'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('affiliates');
    }
}
