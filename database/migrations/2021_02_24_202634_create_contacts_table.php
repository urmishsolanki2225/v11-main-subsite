<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_content_id')->constrained()->onDelete('cascade');
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
            $table->string('country')->nullable();
            $table->string('country_code')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
