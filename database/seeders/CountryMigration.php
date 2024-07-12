<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Collection;
use App\Models\Item;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CountryMigration extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		// $oldRegions = App\Models\Region::all();
        $langMap = Utils::loadLangMap();
        $oldRegionMap = [];
        $slotsTemplateId = 1;
        $regionText = $this->getRegionText();
		$regionImages = [
			'1' => 'Africa2.jpg',
			'2' => 'Asia.jpg',
			'3' => 'Europe.jpg',
			'4' => 'Latin-America.jpg',
			'5' => 'North-America-Caribbean.jpg'
		];

		$allRegions = new Collection;
		$allRegions->type = 'structure';
		$allRegions->layout = 'region';
		$allRegions->ordering = 'manual';
		$allRegions->save();
		$allRegions->contents()->create([
			'lang' => '*', 
			'title' => 'Regions and Countries', 
			'slug' => Utils::makeSlug('Regions and Countries'),
			'blurb' => '<p>Education International works at the global level and across five regions: Africa, Asia Pacific, Europe, Latin America, and North America and the Caribbean. </p><p>
			In addition, we also work through several sub-regional and cross-regional structures that provide advice to our Executive Board on policies and activities that can be undertaken in those territories. </p>'
		]);
		Utils::writeConfigCollection('regions', $allRegions->id);
		Utils::attachImage($allRegions, 'Regions-and-countries.jpg');

		$otherRegions = new Collection;
		$otherRegions->type = 'structure';
		$otherRegions->layout = 'region';
		$otherRegions->ordering = 'manual';
		$otherRegions->save();
		$otherRegions->contents()->create([
			'lang' => '*', 
			'title' => 'Cross-regional and sub-regional structures', 
			'slug' => Utils::makeSlug('Cross-regional and sub-regional structures')
		]);
		Utils::writeConfigCollection('other-regions', $otherRegions->id);

		$regionGroup = Collection::create([
			'type' => 'structure',
			'layout' => 'regions',
			'ordering' => 'manual'
		]);
		$regionGroup->contents()->create([
			'lang' => '*', 
			'title' => 'Regions and Countries', 
			'slug' => Utils::makeSlug('Regions and Countries'),
			'blurb' => '<p>Education International works at the global level and across five regions: Africa, Asia Pacific, Europe, Latin America, and North America and the Caribbean. </p><p>
			In addition, we also work through several sub-regional and cross-regional structures that provide advice to our Executive Board on policies and activities that can be undertaken in those territories. </p>'
		]);
		Utils::writeConfigCollection('regions-group', $regionGroup->id);
		$regionGroup->subCollections()->attach($allRegions, ['sub_order' => 0]);
		$regionGroup->subCollections()->attach($otherRegions, ['sub_order' => 1]);
		Utils::attachImage($regionGroup, 'Regions-and-countries.jpg');

		// $oldRegions = DB::connection('current')
		// 				->table('regions')
		// 				->get();
		
        // foreach ($oldRegions as $oldRegion) {
		for ($regionId = 1; $regionId <= 10; $regionId++) {
        	$region = new Collection;
        	$region->type = 'region';
        	$region->layout = $regionId <= 5 ? 'region' : 'region';
			$region->ordering = $regionId <= 5 ? 'alphabet' : 'date';
        	$region->old_type = 'region';
        	// $region->old_id = $oldRegion->id;
        	$region->old_id = $regionId;
			if ($regionId == 6 || $regionId == 7) {
				$region->status = 'unpublished';
			}
        	$region->save();
        	// $oldRegionMap[$oldRegion->id] = $region;
			$oldRegionMap[$regionId] = $region;
			// if ($oldRegion->type == 'group' || $oldRegion->alias_name == 'ACCRS') {
			if ($regionId > 5) {
				$otherRegions->subCollections()->attach($region, ['sub_order' => $regionId]);
			} else {
        		$allRegions->subCollections()->attach($region, ['sub_order' => $regionId]);
			}
			if (isset($regionImages[$regionId])) {
				Utils::attachImage($region, $regionImages[$regionId]);
			}
			// $langs = DB::connection('current')->table('region_languages')->where('region_id', $oldRegion->id)->get();
			$langs = DB::connection('current')->table('region_languages')->where('region_id', $regionId)->get();
        	foreach ($langs as $lang) {
        		$name = $lang->name;
        		if (!isset($langMap[$lang->language_id])) {
        			continue;
        		}
				if ($langMap[$lang->language_id] == 'en' && isset($regionText[$regionId])) {
					$region->contents()->create($regionText[$regionId]);
				} else {
					$region->content()->create([
						'lang' => $langMap[$lang->language_id],
						'slug' => Utils::makeSlug($name, '-'),
						'title' => Utils::checkTitle($name)
					]);
				}
        	}
			if ($regionId > 8) {
				$region->contents()->create($regionText[$regionId]);
			}
        }
        
        // $oldCountries = App\Models\Countrie::all();
		$oldCountries = DB::connection('current')->table('countries')->get();

        foreach ($oldCountries as $oldCountry) {
        	$country = new Collection;
        	$country->type = 'country';
        	$country->layout = 'country';
        	$country->old_type = 'country';
        	$country->old_id = $oldCountry->id;
        	$country->slots_template_id = $slotsTemplateId;
        	$country->save();
        	
        	if (isset($oldRegionMap[$oldCountry->region_id])) {
	        	$region = $oldRegionMap[$oldCountry->region_id];
    	    	if ($region) {
        			$country->parentCollections()->save($region, ['sub_order' => 0, 'parent_order' => 0]);
        		}
        	}
        	
        	// $langs = $oldCountry->countrie_language;
			$langs = DB::connection('current')->table('country_languages')->where('country_id', $oldCountry->id)->get();
			foreach ($langs as $lang) {
        		$name = $lang->short_name;
        		if (!isset($langMap[$lang->language_id])) {
        			continue;
        		}
        		$country->content()->create([
        			'lang' => $langMap[$lang->language_id],
        			'slug' => Utils::makeSlug($name, '-'),
        			'title' => Utils::checkTitle($name),
        			'meta' => json_encode(['long_name' => $lang->long_name])
        		]);
        	}
        	
        }
    }

	protected function getRegionText() {
		return [
		'1' => ['title' => 'Africa', 
				'lang' => 'en',
				'slug' => Utils::makeSlug('Africa'),
				'blurb' => '<p>Education International’s Africa Region is made up of more than 100 member organisations in over 50 countries in Africa, including Lebanon and Palestine in the Middle East. Based in Accra, our Africa regional office works to help affiliates strengthen their organisations and form a united front for quality education across the continent. </p><p>The region is also involved in professional development programmes, the promotion of early childhood education, the empowerment of women in and through education, the fight against child labour, and is responding to the growing commercialisation and privatisation of education.</p><p><a href="https://regions.ei-ie.org/africa/">Click here</a> to find out more about the work of our Africa regional office. </p>'],
		'2' => ['title' => 'Asia Pacific', 
				'slug' => Utils::makeSlug('Asia Pacific'),
				'lang' => 'en',
				'blurb' => '<p>In Asia-Pacific, Education International brings together over 65 unions in more than 30 countries.</p><p>The focus of our work in the region is to promote free quality public education for all and to fight the growing privatisation and commercialisation of education.</p><p>As the region includes a multitude of cultural, social, political and economic contexts, our work covers a wide range of issues: from child illiteracy and child labour in South Asia, to union growth and the promotion of trade union rights in Southeast and Northeast Asia, to defending indigenous peoples’ right to education in the Pacific. </p><p>Our Asia Pacific regional office is based in Kuala Lumpur. <a href="https://regions.ei-ie.org/asiapacific/">Click here</a> to find out more about our work in the region. </p>'],
		'3' => ['title' => 'Europe', 
				'lang' => 'en',
				'slug' => Utils::makeSlug('Europe'),
				'blurb' => '<p>The European Trade Union Committee for Education (ETUCE) is the Education International regional structure in Europe. It brings together over 125 education unions in more than 50 countries across the continent. </p><p>ETUCE is the social partner for teachers and education support personnel in the region and defends their interests towards the European Commission and other European institutions.</p><p>Our European office is based in Brussels. <a href="https://www.csee-etuce.org/en/">Click here</a> to find out more about our work in this region.</p>'],
		'4' => ['title' => 'Latin America', 
				'lang' => 'en',
				'slug' => Utils::makeSlug('Latin America'),
				'blurb' => '<p>In Latin America, Education International represents more than 30 member organisations in over 15 countries. Education unions in the region work together to address common challenges, such as the commercialisation and privatisation of education, human and trade union rights violations, discrimination and violence based on gender or sexual orientation and limitations to indigenous peoples’ right to education. </p><p>Our work in this region is coordinated by our regional office based in San José, Costa Rica. <a href="https://ei-ie-al.org/">Click here</a> to find out more about Education International in Latin America. </p>'],
		'5' => ['title' => 'North America and the Caribbean', 
				'lang' => 'en',
				'slug' => Utils::makeSlug('North America and the Caribbean'),
				'blurb' => '<p>In North America and the Caribbean, Education International represents millions of teachers and education support personnel organised by more than 35 education unions from over 20 countries.</p><p><a href="https://regions.ei-ie.org/northamerica-caribbean/">Click here</a> to find out more about our work in this region!</p>'],
		'8' => ['title' => 'Arab Countries', 
				'lang' => 'en',
				'slug' => Utils::makeSlug('Arab Countries'),
				'blurb' => '<p>The Arab Countries Cross-regional Structure brings together education unions from Arabic speaking countries in the Africa and Asia Pacific regions.</p><p>The cross-regional structure facilitates cooperation among members, helping education unions join forces and exchange best practices to address their common challenges. </p><p>To find out more about our work in Arab countries, please <a href="https://regions.ei-ie.org/accrs/">click here</a>. </p>'],
		'9' => ['title' => 'Caribbean Union of Teachers', 
				'lang' => 'en',
				'slug' => Utils::makeSlug('Caribbean Union of Teachers'),
				'blurb' => '<p>The Caribbean Union of Teachers is an Education International umbrella body for teachers in the Caribbean, from Bermuda in the north to Suriname in the south. This sub-regional structure enables our member organisations to collaborate, sharing knowledge and strategies to promote quality education and strengthen unions. </p>'],
		'10' => ['title' => 'Council of Pacific Unions', 
				'lang' => 'en',
				'slug' => Utils::makeSlug('Council of Pacific Unions'),
				'blurb' => '<p>The Council of Pacific Unions brings together our member organisations from the South Pacific. Through its office based in Fiji, the Council of Pacific Unions provides advice and support on professional, industrial, legal and human rights issues to Education International affiliates in the region. It also works to facilitate cooperation among unions and enable joint action. </p>']];
		}
	
}
