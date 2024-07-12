<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;
use App\Models\Item;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ContactsImport extends Seeder
{
    /**
     * Run the database seeds.
     * Resource to Item
     *
     * @return void
     */
    public function run()
    {
        $file = file_get_contents('staff.csv');
        $lines = explode("\n", $file);
        
        $count = 0;
        $this->unitCollections = [];
        for ($i = 1; $i < count($lines); ++$i) {
            $csv = str_getcsv($lines[$i], ';', '');
            if (count($csv) < 3) {
                continue;
            }
            $name = trim($csv[3]);
            $unit = trim($csv[4]);
            $job = trim($csv[5]);
            $phone = trim($csv[6]);
            $email = trim($csv[7]);
            
            if ($name) {
                $staff = Item::create([
                    'type' => 'person'
                ]);
                $content = $staff->contents()->create([
                    'lang' => '*',
                    'title' => $name,
                    'subtitle' => $job,
                    'slug' => Utils::makeSlug($name)
                ]);
                $content->contacts()->create([
                    'phone_main' => $phone,
                    'email' => $email
                ]);
                $this->attachUnit($staff, $unit, $i);
                $count++;
            }
        }
        // echo "Imported $count staff contacts\n";

        // also offices
        $offices = Collection::create([
            'type' => 'contacts',
            'layout' => 'default',
            'ordering' => 'manual'
        ]);
        Utils::writeConfigCollection('contact-offices', $offices->id);

        $offices->contents()->create([
            'lang' => '*',
            'title' => 'Offices',
            'slug' => Utils::makeSlug('Offices')
        ]);
        $addresses = [
            'EI Headquarters' => [
                'street1' => '15, Boulevard Bischoffsheim',
                'zip' => 'B-1000',
                'city' => 'Brussels',
                'country' => 'Belgium',
                'phone_main' => '+32-2 224 06 11',
                'fax_main' => '+32-2 224 06 06',
                'email' => 'headoffice@ei-ie.org'
            ],
            'Africa Office' => [
                'street1' => 'No. 3 Torshie Close',
                'street2' => 'Mempeasem East Legon Extension',
                'city' => 'Accra',
                'country' => 'Ghana',
                'phone_main' => '+233.302.50.12.00',
                'fax_main' => '+233.302.50.66.81',
                'email' => 'eirafoffice@ei-ie.org'
            ],
            'Asia-Pacific Office' => [
                'street1' => 'Education International',
                'street2' => '53-B Jalan Telawi Tiga',
                'street3' => 'Bangsar Baru',
                'zip' => '59100',
                'city' => 'Kuala Lumpur',
                'country' => 'Malaysia',
                'phone_main' => '+60 32 28 42 140',
                'fax_main' => '+60 32 28 47 395',
                'email' => 'eiap@eduint.com.my'
            ],
            'COPE Office' => [
                'street1' => 'Education International',
                'street2' => 'Government Buildings',
                'zip' => 'PO Box 2592',
                'city' => 'Suva',
                'country' => 'Fiji',
                'phone_main' => '+679 31 56 64',
                'fax_main' => '+679 30 59 45',
                'email' => 'cope@connect.com.fj'
            ],
            'Middle East Office' => [
                'email' => 'eiaco@ei-ie.org'
            ],
            'Europe (ETUCE) Office' => [
                'street1' => 'Education International/ETUCE',
                'street2' => '15, Boulevard Bischoffsheim',
                'zip' => '1000',
                'city' => 'Brussels',
                'country' => 'Belgium',
                'phone_main' => '+32 (0)2 22 40 611',
                'fax_main' => '+32 (0)2 22 40 606',
                'email' => 'secretariat@csee-etuce.org'
            ],
            'Caribbean Office' => [
                'street1' => 'Caribbean Union of Teachers',
                'street2' => 'La Clery',
                'zip' => 'PO Box L3068',
                'city' => 'Castries',
                'country' => 'St. Lucia',
                'phone_main' => '(758) 452 4469/4052',
                'phone_other' => '(758) 716 1598',
                'fax_main' => '(758) 453 6668',
                'email' => 'cutoct13@gmail.com',
                'website' => 'http://www.caribbeanteachers.com'
            ],            
            'Latin America Office' => [
                'street1' => 'Internacional de la Educación, Oficina Regional para América Latina',
                'street2' => 'Barrio Escalante',
                'street3' => 'Ofiplaza del Este, Edificio B, Oficina #3',
                'city' => 'San José',
                'country' => 'Costa Rica',
                'phone_main' => '+506 22 23 77 97 / 22 23 78 10 / 22 21 54 53 / 22 21 19 22',
                'fax_main' => '+506 22 22 08 18',
                'email' => 'america.latina@ei-ie-al.org'
            ],
        ];
        $i = 0;
        foreach ($addresses as $name => $address) {
            $office = Item::create([
                'type' => 'contact'
            ]);
            $office->contents()->create([
                'lang' => 'en',
                'title' => $name,
                'slug' => Utils::makeSlug($name)
            ])->contacts()->create($address);
            $offices->items()->save($office, ['order' => $i++]);
        }

        // also regional committees
        $committees = [
            'Education International Africa Regional Committee members 2018-2022' => [
                'Chairperson' => 'Mr. Christian Addai-Poku, NAGRAT/Ghana',
                'Vice Chairperson' => 'Ms. Mariama Chipkaou, SNEN/Niger',
                'Committee members' => "Ms. Hélène Nékarmbaye, SET/Chad
Mr. Abdoulaye Sow, SNEF/Mauritania
Ms. Marie Antoinette Corr, GTU/Gambia
Mr. Abrao Borges, FECAP/Cape Verde
Ms. N’Zoré Marie Jeanne Kombo, SYNADEEPCI/Côte d’Ivoire
Dr. Nasiru Idris, NUT/Nigeria
Ms. Cécile Tshiyombo, SYECO/DRCongo
Mr. Fridolin Mve Messa, SENA/Gabon
Ms. Stellar Mamotto, TTU/Tanzania
Mr. Yohannes Benti, ETA/Ethiopia
Ms. Teopolina Engombe, NANTU/Namibia
Mr. Richard Gundane, ZIMTA/Zimbabwe"
            ],
            'Education International Asia-Pacific Regional Committee members 2017-2021' => [
                'Chairperson' => 'Mr. Masaki Okajima, JTU/Japan',
                'Vice Chairpersons' => "Ms. Correna Haythrope, AEU/Australia
Mr. Ram Pal Singh, AIPTF/India",
                'Committee members' => "Mr. Abdul Wahed Muhammad Haji, KTU/Iraq
Mr. Babu Ram Thapa, NNTA/Nepal
Mr. Harry Tan Hock Huat, NUTP/Malaysia
Mr. Hwang Hyunsu, KTU/Korea
Mr. Philip Junior Ika, SINTA/Solomon Islands
Ms. Angela Wijesinghe, ACUT/Sri Lanka
Ms. Milagros C Ogalinda, SMP-NATOW/Philippines 
Ms. Neselinda Neta, VTU/Vanuatu
Ms. Ya Jing Li, NTA/Taiwan
Mr. Agni Deo Singh, FTU/Fiji 
Mr. Indrasekhar Mishra, AISTF/India
Mr. P. Ramanathan, MAE/Malaysia
Mr. Raymond Basilio ACT/Philippines 
Mr. Mukunda Gautam, ISTU/Nepal
Ms. Unifah Rosyidi, PGRI/Indonesia"
            ],
            'Education International Europe Regional Committee members 2018-2022' => [
                'Chairperson' => 'Ms. Christine Blower, NUT/United Kingdom',
                'Vice Chairpersons' => "Ms. Odile Cordelier, SNES-FSU/France
Ms. Dorte Lange, DLF/Denmark
Mr. Andreas Keller, GEW/Germany
Ms. Trudy Kerperien, AOB/Netherlands
Mr. Branimir Strukelj, ESTUS/Slovenia
Ms. Galina Merkulova, ESEUR/Russia",
                'Committee members' => "Mr. Nevrus Kaptelli, SPASH-ITUEA/Albania
Mr. David Garcia Garcia, SEP/Andorra
Mr. Grigor Gharibyan, CRSTESA/Armenia
Mr. Roland Gangl, GÖD-Lehrer/Austria
Mr. Humbat Naghiyev, AITUCEW/Azerbaijan
Mr. Aliaksandr Boika, BTUWES/Belarus
Ms. Lies Van Rompaey, COV/Belgium
Mr. Selvedin Šatorović, ITUPSEBH/Bosnia-Herzegovina
Ms. Yanka Takeva, SEB/Bulgaria
Mr. Igor Radeka, IURHEEC/Croatia
Mr. Tahir Gökcebel, KTOEOS/Cyprus
Mr. Frantisek Dobsik, CMOS-PS/Czech Republic
Mr. Lasse Bjerg Joergensen, BUPL/Denmark
Ms. Elis Randma, EEPU/Estonia
Ms. Heljä Misukka, OAJ/Finland
Mr. Christian Chevalier, UNSA Education/France
Ms. Maia Kobakhidze, ESFTUG/Georgia
Ms. Gitta Franke-Zöllmer, VBE/Germany
Mr. Athanasios Kikinis, DOE/Greece
Ms. Zsuzsanna Szabo, SHE/Hungary
Ms. Guðriðour Arnardóttir, KI/Iceland
Mr. Mike Jennings, IFUT/Ireland; ETUCE Treasurer
Mr. Pesach Landesberg, ITU/Israel
Ms. Rossella Benedetti, UIL Scuola/Italy
Ms. Maira Amantayeva, KTUESW/Kazakhstan
Mr. Asylbek Toktogulov, TUESWK/Kyrgyzstan
Ms. Ilze Prizevoite, LIZDA/Latvia
Mr. Egidijus Milesinas, FLESTU/Lithuania
Mr. Claude Ries, SNE/Luxembourg
Mr. Jakim Nedelkov, SONK/Macedonia (FYR of)
Mr. Anthony Casaru, MUT/Malta
Mr. Donos Ghenadie, ESTUFM/Moldova
Mr. Pavicević Zvonko, TUE/Montenegro
Mr. Terje Skyvulstad, UEN/Norway
Ms. Dorota Obidniak, ZNP/Poland
Mr. Augusto Alexandre Da Cunha Días, FNE/Portugal
Mr. Simion Hancescu, FSLE/Romania
Ms. Valentina Ilic, TUS/Serbia
Mr. Pavel Ondek, OZPŠaV/Slovakia
Mr. Francisco J. Garcĺa Suárez F.E.CC.OO./Spain
Ms. Maria Rönn, Lärarförbundet/Sweden
Mr. Samuel Rohrbach, SER/Switzerland
Mr. Odinaev Ramazon, TUESRT/Tajikistan
Ms. Feray Aytekin Aydogan, EGITIM-SEN/Turkey
Mr. Georgiy Trukhanov, STESU/Ukraine
Mr. Rob Copeland, UCU/United Kingdom
Mr. Larry Flanagan, EIS/United Kingdom
Ms. Jennifer Moses, NASUWT/United Kingdom
Mr. Ravshan Bedilov, TUESCWU/Uzbekistan"
            ],
            'Education International Latin America Regional Committee members 2015-2019' => [
                'Chairperson' => 'Mr. Hugo Yasky, CTERA/Argentina',
                'Vice Chairperson' => "Ms. Fátima Da Silva, CNTE/Brazil",
                'Committee members' => "Mr. Mario Aguilar, CPC/Chile
Ms. Elbia Pereira, FUM-TEP/Uruguay
Mr. Hamer Villena, SUTEP/Peru
Ms. Lilian Andino, COLPEDAGOGOSH/Honduras
Mr. Gilberth Díaz SEC, Costa Rica
Mr. Eduardo Hidalgo ADP, Dominican Republic"
            ]
        ];
        $i = 0;
        foreach ($committees as $name => $members) {
            $item = Item::create([
                'type' => 'static',
            ]);
            $keys = array_keys($members);
            $blurb = "<h3>$keys[0]</h3><ul><li>"
                        . implode('</li><li>', explode("\n", $members[$keys[0]]))
                        . "</li></ul><h3>$keys[1]</h3><ul><li>"
                        . implode('</li><li>', explode("\n", $members[$keys[1]]))
                        . "</li></ul>"
                        ;
            $content = "<h3>$keys[2]</h3><ul><li>"
                        . implode('</li><li>', explode("\n", $members[$keys[2]]))
                        . "</li></ul>"
                        ;
            $item->contents()->create([
                'lang' => '*',
                'title' => $name,
                'slug' => Utils::makeSlug($name),
                'blurb' => $blurb,
                'content' => $blurb.$content
            ]);
            $item->collections()->attach(config('eiie.collection.regional-committees'), ['item_order' => $i]);
        }
    }

    protected function attachUnit(Item $staff, string $unit, $order) {
        if (!$unit) {
            $unit = '';
        }
        if (!isset($this->unitCollections[$unit])) {
            $coll = Collection::create([
                'type' => 'contacts',
                'layout' => 'staff',
                'ordering' => 'manual'
            ]);
            $coll->contents()->create([
                'lang' => '*',
                'title' => $unit,
                'slug' => Utils::makeSlug($unit)
            ]);
            $coll->parentCollections()->attach(
                config('eiie.collection.staff'), 
                ['sub_order' => $order]
            );
            $this->unitCollections[$unit] = $coll->id;
        }
        $staff->collections()->attach($this->unitCollections[$unit], ['item_order' => $order]);
    }

}
