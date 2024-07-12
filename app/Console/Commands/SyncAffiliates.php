<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

use App\Models\Affiliate;
use App\Models\Collection;
use App\Models\Item;
use DateTime;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SyncAffiliates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "eiie:syncaffiliates";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Sync affiliates from the CRM";

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $url = config(
            "eiie.affiliatesCrmUrl",
            "https://crmdata.ei-ie.org/eicrm.svc/Organizations"
        );
        $this->info(date(DateTime::ISO8601) . " Sync affiliates from " . $url);
        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($ch, CURLOPT_URL, $url);    // get the url contents
        // $data = curl_exec($ch); // execute curl request
        // curl_close($ch);
        $response = Http::get($url);
        $data = $response->body();
        $response->throw();
        $this->info(
            "Fetch xml file successfully, size of data " . strlen($data)
        );
        $xml = simplexml_load_string($data);

        $count = count($xml->CrmAccountOrganization);
        if ($count > 20) {
            $this->info(
                date(DateTime::ISO8601) .
                    " Syncing $count affiliates from CRM xml"
            );
            Affiliate::where("is_active", "1")->update(["is_active" => "0"]);
            Item::where("type", "affiliate")->update(["status" => "draft"]);
        } else {
            $this->error(
                "Sync affiliates to CRM only got a few ($count) results in the XML, we will not reset the status of the existing ones."
            );
        }

        foreach ($xml->CrmAccountOrganization as $entry) {
            $namespaces = $entry->content->getNameSpaces(true);
            $data = $entry;
            // $data = $entry->content;
            // clock($entry);
            // ->children($namespaces["m"])
            // ->children($namespaces["d"]);
            $ID = $data->ID;
            if (!$ID) {
                // shouldn't happen
                $this->error("fail, no ID");
                return 1;
            }
            $Name = $data->Name;
            $Acronym = $data->Acronym;
            $this->info(
                date(DateTime::ISO8601) . " Processing $ID : $Name from the XML"
            );
            $affiliate = Affiliate::where("membership_uuid", $ID)
                ->with(["item" => fn($q) => $q->withoutGlobalScopes()])
                ->first();
            $this->info(date(DateTime::ISO8601) . " $ID loaded affiliate ");
            $item = null;
            if (isset($affiliate->item)) {
                $item = $affiliate->item;
            } else {
                $item = Item::create(["type" => "affiliate"]);
                $affiliate = $item
                    ->affiliate()
                    ->create(["membership_uuid" => $ID]);
            }
            $item->status = "published";
            $item->save();
            $affiliate->official_name = $data->OfficialName;
            $affiliate->acronym = $data->Acronym;
            $affiliate->regional_office = $data->RegionalOffice;
            $affiliate->preferred_language = $data->PreferredLanguage;
            $affiliate->phone_main = $data->MainPhone;
            $affiliate->phone_other = $data->OtherPhone;
            $affiliate->phone_other2 = $data->OtherPhone2;
            $affiliate->fax_main = $data->MainFax;
            $affiliate->fax_other = $data->OtherFax;
            $affiliate->website = $data->Website;
            $affiliate->email = $data->Email;
            $affiliate->email_other = $data->OtherEmail;
            $affiliate->street1 = $data->Street1;
            $affiliate->street2 = $data->Street2;
            $affiliate->street3 = $data->Street3;
            $affiliate->zip = $data->Zip;
            $affiliate->city = $data->City;
            $affiliate->state = $data->State;
            $affiliate->country_code = $data->Country_ISO_3166_2;
            $affiliate->membership_id = $data->MembershipId;
            $affiliate->authorization_code = $data->AuthorizationCode;
            $affiliate->year_establishment = (int) $data->YearOfEstablishment;
            $affiliate->membership_start = new Carbon(
                $data->MembershipStartDate
            );
            $affiliate->president = $data->President;
            $affiliate->general_secretary = $data->GeneralSecretary;
            $affiliate->additional_contact = $data->AdditionalContact;
            $affiliate->person_in_charge = $data->PersonInCharge;
            $affiliate->is_active = "1";
            $affiliate->save();
            $this->info(date(DateTime::ISO8601) . " $ID saved");
            $item->contents()->updateOrCreate(
                ["lang" => "*"],
                [
                    "title" => $Name,
                    "subtitle" => $Acronym,
                    "slug" => Str::slug($Name) ?? "_",
                ]
            );
            $this->info(
                date(DateTime::ISO8601) .
                    " $ID updated content, now look for country " .
                    $data->Country
            );
            $country = Collection::where("type", "country")
                ->whereHas(
                    "contents",
                    fn($q) => $q->where("title", "like", $data->Country)
                )
                ->get();
            $this->info(
                date(DateTime::ISO8601) .
                    " $ID loaded country " .
                    count($country)
            );
            if (!isset($country[0])) {
                echo "No country found $data->Country $ID \n";
            } elseif (isset($country[1])) {
                echo "Multiple countries $data->Country $ID \n";
            } else {
                $item->collections()->syncWithoutDetaching($country);
            }
            $this->info(date(DateTime::ISO8601) . " $ID done ");
        }

        return 0;
    }
}
