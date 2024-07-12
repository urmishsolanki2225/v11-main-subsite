<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Collection;
use App\Models\Item;
use App\Models\Affiliate;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AffiliateMigration extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // create Items for all Members
        // and try to add them to Country collection
		// $members = App\Models\Member::all();
		$members = DB::connection('current')->table('members')->get();
		
        foreach ($members as $member) {
        	$item = new Item;
        	$item->type = 'affiliate';
			$item->save();
			$item->affiliate()->create([
				'membership_uuid' => $member->membership_id,
				'official_name' => $member->OfficialName,
				'acronym' => $member->Acronym,
				'regional_office' => $member->RegionalOffice,
				'preferred_language' => $member->PreferredLanguage,
				'phone_main' => $member->MainPhone,
				'phone_other' => $member->OtherPhone,
				'phone_other2' => $member->OtherPhone2,
				'fax_main' => $member->MainFax,
				'fax_other' => $member->OtherFax,
				'website' => $member->Website,
				'email' => $member->Email,
				'email_other' => $member->OtherEmail,
				'street1' => $member->Street1,
				'street2' => $member->Street2,
				'street3' => $member->Street3,
				'zip' => $member->Zip,
				'city' => $member->City,
				'state' => $member->State,
				'country_code' => $member->MembershipAddressCountry_ISO_3166_2,
				'membership_id' => $member->MembershipId,
				'authorization_code' => $member->AuthorizationCode,
				'year_establishment' => $member->YearOfEstablishment,
				'membership_start' => $member->MembershipStartDate,
				'president' => $member->President,
				'general_secretary' => $member->GeneralSecretary,
				'additional_contact' => $member->AdditionalContact,
				'person_in_charge' => $member->PersonInCharge,
				'is_active' => $member->IsActive,
			]);
			// $item->member()->save($member);
        	$item->content()->create([
        		'lang' => '*',
        		'title' => Utils::checkTitle($member->Name),
        		'slug' => Utils::makeSlug($member->Acronym)
        	]);
        	$item->content()->create([
        		'lang' => 'en',
        		'title' => Utils::checkTitle($member->Name),
        		'slug' => Utils::makeSlug($member->Acronym)
        	]);
        	$countryName = $member->Country_ID;
        	$oldCountry = DB::connection('current')->table('countries')->where('alias_name',$countryName)->first();
        	if ($oldCountry) {
        		$newCountry = Collection::where('old_type', 'country')->where('old_id',$oldCountry->id)->first();
        		if ($newCountry) {
	        		$item->collections()->save($newCountry, ['order' => 0, 'item_order' => 0]);
	        	}
        	}
        }
    }
}
