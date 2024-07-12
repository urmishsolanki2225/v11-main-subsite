<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/*

Your country	
FIELD => Contact person in your organisation for this project	
CONTENT_TITLE => Project title
    COLL_MEMBERSHIP? => Project country(ies) and/or region(s)	
Co-operating organisations	    <= only links to affiliates?
Host organisations	    <= only links to affiliates?
COLL_MEMBERSHIP? => Topic(s) of the project	    
FIELD => Start date	
FIELD => End date	
CONTENT =>    Project description
FIELD => Goals	
FIELD => Type of activity	
FIELD => Results achieved	
FIELD => Source of funding	
FIELD => Budget	
FIELD => Project Website / Social media	

*/

class CreateDcprojectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dcprojects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')
                    ->constrained('item_contents')
                    ->onDelete('cascade');
            $table->string('contact_person_name', 1000)->nullable();
            $table->date('started_at')->nullable();
            $table->date('ended_at')->nullable();
            $table->text('description')->nullable();
            $table->text('goals')->nullable();
            $table->text('activity_type')->nullable();
            $table->text('results')->nullable();
            $table->string('funding', 1000)->nullable();
            $table->string('budget', 1000)->nullable();
            $table->string('url', 1000)->nullable();

            // we still need the fallback hardcoded strings
            $table->string('host_orgs_str', 1000)->nullable();
            $table->string('coop_orgs_str', 1000)->nullable();
            $table->string('countries_str', 1000)->nullable();
            $table->string('topics_str', 1000)->nullable();
        });

        Schema::create('dcproject_organisations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dcproject_id')
                    ->constrained('dcprojects')
                    ->onDelete('cascade')
                    ;
            $table->enum('role', ['host', 'cooperating']);
            $table->foreignId('member_id')
                    ->constrained('items')
                    ->onDelete('no action')
                    ;
            $table->integer('order')->default(999);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dcproject_organisations');
        Schema::dropIfExists('dcprojects');
    }
}
