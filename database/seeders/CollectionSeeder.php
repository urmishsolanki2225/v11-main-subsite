<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $post_type_categories = [
            1=> 'News',
            2=> 'Articles',
            3=> 'Take action!',
            4=> 'Events',
            5=> 'Documents',
            6=> 'Library',
            7=> 'Opinion',
            8=> 'Magazines',
            9=> 'ilo',
            // 10=> 'Dossiers',  // created in DossierMigration
            // 11=> 'StaffProfiles',
            13=> 'Reports',
            14=> 'Statements' // doesn't really exist, quick way to add this collection
        ];
        $post_type_coll_types = [
            1=> 'articles',  //'News',
            2=> 'articles',  //'Articles',
            3=> 'articles',  //'Urgent Action Appeals // Take action!',
            4=> 'articles',  //'Events',
            5=> 'library',  //'Documents',
            6=> 'library',  //'Library',
            7=> 'articles',  //'Blogs',
            8=> 'library',  //'Magazines',
            9=> 'articles',  //'ilo',
            10=> 'structure',  //'Dossiers',
            // 11=> 'contact',  //'StaffProfiles',
            13=> 'library',  //'Reports'
            14=> 'articles', // Statements
        ];

        $record_types = [
            1=> 'Constitutional Documents',
            2=> 'Congress Resolutions',
            3=> 'General EI Declaration',
            4=> 'EI Publications',
            5=> 'Publications',
            6=> 'Policy Briefs',
            7=> 'Posters and Info'
        ];
        

        foreach ($post_type_categories as $id => $name) {
            $coll = new Collection;
            $coll->type = $post_type_coll_types[$id];
            $coll->old_type = 'post_type_category';
            $coll->old_id = $id;
            $coll->save();
            $coll->content()->create([
                'lang' => '*',
                'title' => Utils::checkTitle($name),
                'slug' => Utils::makeSlug($name),
                // 'blurb' => Utils::Lorem
            ]);
            // if (in_array($id, [1, 7])) {
            if (true) {
                Utils::writeConfigCollection($name, $coll->id);
            }
        }

        $governanceCollection = Collection::create([
			'type' => 'structure', 
            'layout' => 'subcoll_cards', 
            'ordering' => 'manual'
		]);
		$governanceCollection->contents()->create([
			'lang' => '*',
			'title' => Utils::checkTitle('Governance'),
			'slug' => Utils::makeSlug('Governance'),
            'blurb' => '<p>Our governance structures and processes are set out in the Education International Constitution and By-laws.</p>
            <p>Article 8 of the Education International Constitution states that the governing bodies of the organisation are the World Congress and the Executive Board. Several other structures are also part of our governance, including:</p>
            <ul>
            <li>The Committee of Experts on Membership </li>
            <li>Regional Structures</li>
            <li>Standing Committees (Status of Women, Finance, Constitution and By-laws) </li>
            <li>Internal Audit Committee</li>
            <li>Advisory Bodies for example the OECD Advisory Committee and the Middle East Advisory Committee</li>
            </ul>
            '
		]);
        Utils::attachImage($governanceCollection, '48413798482_58f167769d_o.jpg');
        Utils::writeConfigCollection('governance', $governanceCollection->id);

        $worldCongressColl = $governanceCollection->subCollections()->create([
            'type' => 'library', 'layout' => 'default', 'ordering' => 'date'
        ], ['sub_order' => 2]);
        $worldCongressColl->contents()->create([
            'lang' => '*', 
            'title' => 'World Congress', 
            'slug' => Utils::makeSlug('World Congress'),
            'blurb' => '<p>Education International is governed by the World Congress. Every four years, it brings together delegates from all member organisations and guests from international organisations and intergovernmental agencies with whom we work.            </p> <p>The World Congress adopts a four-year programme, budget and policy resolutions and elects the Executive Board, which monitors and implements our activities. </p>'
        ]);
        Utils::attachImage($worldCongressColl, '48348676731_66e93d7e76_o.jpg');
        Utils::writeConfigCollection('world-congress', $worldCongressColl->id);

        $annualReportsColl = $governanceCollection->subCollections()->create([
            'type' => 'library', 'layout' => 'default', 'ordering' => 'date'
        ], ['sub_order' => 3]);
        $annualReportsColl->contents()->create([
            'lang' => '*', 
            'title' => 'Annual reports', 
            'slug' => Utils::makeSlug('Annual reports'),
            'blurb' => '<p>Find out more about our work in previous years! In this section you can find an archive of our annual reports since 2007.</p>'
        ]);
        Utils::attachImage($annualReportsColl, 'Governance-Annual-reports.jpg');
        Utils::writeConfigCollection('annual-reports', $annualReportsColl->id);

        foreach ($record_types as $id => $name) {
            $coll = new Collection;
            $coll->type = 'library';
            $coll->old_type = 'record_type';
            $coll->old_id = $id;
            $coll->save();
            $coll->content()->create([
                'lang' => '*',
                'title' => Utils::checkTitle($name),
                'slug' => Utils::makeSlug($name),
                'blurb' => $id == 1 ? '<p>Our Constitution and By-laws are adopted by the World Congress. Regional by-laws are amended and adopted by the Executive Board.</p>' : null
            ]);
            if ($id == 1) {
                $coll->parentCollections()->attach($governanceCollection, ['sub_order' => 1]);                
            }
            Utils::writeConfigCollection($name, $coll->id);
        }

    }
}
