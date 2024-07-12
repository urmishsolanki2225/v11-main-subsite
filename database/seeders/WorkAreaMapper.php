<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;
use App\Models\Item;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class WorkAreaMapper extends Seeder
{
    /**
     * Run the database seeds.
     * Merge themes into areas of work
     *
     * @return void
     */
    public function run()
    {
		$langMap = Utils::loadLangMap();
        $blurbs = $this->blurbs();

        // keys = strategic directions
        // values = id's pointing to old_id in new Collection with old_type theme
        $workAreaThemeMapping = [
            'Achieving Sustainable Development Goal 4' => [35, 5, 24, 4, 29, 8, 30, 26, 28, 19],
            'Fighting the commercialisation of education' => [46, 45, 31, 54, 59, 6],
            'Climate action and literacy' => [23],
            'Standards and working conditions' => [57, 39, 14, 18, 25],
            'Leading the profession' => [37, 41, 12, 13],
            'Future of work in education' => [47, 53, 49, 38, 60],
            'Trade union rights are human rights' => [56, 16, 9, 10, 58],
            'Equity and inclusion' => [2, 34, 7, 11, 21, 22, 15, 33],
            'Democracy' => [55],
            // 'Growth' => [1, 32, 42, 20],
            'Union growth, renewal and development' => [3, 17, 1, 32, 42, 20],
            'Young members' => [27]
        ];

        // keys = strategic directions
        // values = id's pointing to old_id in new Collection with old_type tag
        $workAreaTagMapping = [
            'Climate action and literacy' => [531, 532],
            'Fighting the commercialisation of education' => [400, 393, 773],
            'Democracy' => [118],
            'Equity and inclusion' => [442, 599, 847],
            'Future of work in education' => [512, 124],
            // 'Growth' => [534],
            'Trade union rights are human rights' => [11, 4],
            'Leading the profession' => [841],
            'Achieving Sustainable Development Goal 4' => [52, 323, 468, 316],
            'Standards and working conditions' => [483],
            'Union growth, renewal and development' => [480, 704, 534],
            'Young members' => []
        ];

        // keys = strategic directions
        // values = id's pointing to old_id in new Item
        $workAreaItemMapping = [
            'Climate action and literacy' => [],
            'Fighting the commercialisation of education' => [4640, 4654],
            'Democracy' => [],
            'Equity and inclusion' => [4638, 15279, 4647, 4643, 4653, 4656],
            'Future of work in education' => [],
            // 'Growth' => [],
            'Trade union rights are human rights' => [4639, 4651, 4659, 4658],
            'Leading the profession' => [4655, 4660],
            'Achieving Sustainable Development Goal 4' => [4642, 4371, 4646, 4649, 4653, 4657, 4918, 4650],
            'Standards and working conditions' => [4648],
            'Union growth, renewal and development' => [4652],
            'Young members' => [4644]
        ];

        $workAreaImages = [
            'Climate action and literacy' => 'Climate.jpg',
            'Fighting the commercialisation of education' => 'Commercialisation.jpg',
            'Democracy' => 'Democracy.jpg',
            'Equity and inclusion' => 'Equity-and-inclusion.jpg',
            'Future of work in education' => 'Future-of-work-in-education.jpg',
            'Trade union rights are human rights' => 'Human-and-trade-union-rights.jpg',
            'Leading the profession' => 'Leading-the-profession.jpg',
            'Achieving Sustainable Development Goal 4' => 'SDG4.jpg',
            'Standards and working conditions' => 'Standards-and-working-conditions.jpg',
            'Union growth, renewal and development' => 'Growth-and-renewal2.jpg',
            'Young members' => 'young-members.jpg',
            'Quality education for all' => 'Quality-education.jpg',
            'The profession' => 'The-profession.jpg',
            'Rights and democracy' => 'Rights-and-democracy.jpg',
            'Building union power' => 'Building-union-power.jpg',
        ];

        $icons = [];
        foreach (Storage::disk('public')->files('icons') as $file) {
            if (preg_match('/icon_work_(\w+)\.svg/', $file, $matches)) {
                $title = str_replace('_', ' ', $matches[1]);
                $icons[$title] = $file;
            }
        }
        $workAreaCollIds = [];

        $strategicDirectionMapping = [
            'Quality education for all' => ['Achieving Sustainable Development Goal 4', 'Fighting the commercialisation of education', 'Climate action and literacy'],
            'The profession' => ['Standards and working conditions', 'Leading the profession', 'Future of work in education'],
            'Rights and democracy' => ['Trade union rights are human rights', 'Equity and inclusion', 'Democracy'],
            'Building union power' => ['Union growth, renewal and development', 'Young members']
        ];
        
        $icons['Quality education for all'] = 'icons/icon_work_12_leading.svg';
        $icons['The profession'] = 'icons/icon_work_07_standards.svg';
        $icons['Rights and Democracy'] = 'icons/icon_work_04_democracy.svg';
        $icons['Building union power'] = 'icons/icon_work_08_renewal.svg';

        $order = 0;
        foreach ($workAreaThemeMapping as $title => $oldThemeIds) {
            $coll = new Collection;
            $coll->type = 'workarea';
            $coll->layout = 'workarea';
            $coll->save();
            //$workareasCollection->subCollections()->save($coll, ['sub_order' => $order++]);

            $blurb = $blurbs[$title];
            $coll->content()->create([
                'lang' => 'en',
                'title' => Utils::checkTitle($title),
                'blurb' => $blurb,
                'slug' => Utils::makeSlug($title)
            ]);

            // if ($workAreaImageIds[$title]) {
            //     $coll->images()->attach($workAreaImageIds[$title], ['order' => 0]);
            // }
            if (isset($workAreaImages[$title])) {
                Utils::attachImage($coll, $workAreaImages[$title]);
            } else {
                echo 'No lead image '.$title;
            }

            if (false && isset($icons[$title])) {
                $image = new Item;
                $image->type = 'resource';
                $image->subtype = 'image.icon';
                $image->save();
                $resource = [
                    'url' => 'storage/'.$icons[$title]
                ];
                $image->content()->create([
                        'lang' => '*',
                        'title' => 'Icon for '.$title,
                        'slug' => Str::slug('icon_'.$title),
                        // 'resources' => [$resource]
                ])->images()->create([
                    'path' => 'storage/'.$icons[$title]
                ]);
                $coll->images()->save($image, ['order' => 0]);
            }

            $workAreaCollIds[$title] = $coll->id;

            foreach ($oldThemeIds as $oldThemeId) {
                $colToMap = Collection::where('old_id', $oldThemeId)
                                    ->where('old_type', 'theme')
                                    ->first();
                $itemIds = $colToMap->items()->pluck('items.id')->all();
                // $coll->items()->attach(array_fill_keys($itemIds, ['order' => 0, 'item_order' => 0]));
                $coll->items()->syncWithoutDetaching($itemIds);
                // $mappedColl->items()->attach($coll->id, ['order' => 0, 'item_order' => 0]);
                // echo "\nAdded items? new coll: ".$coll->id.' old_theme_id '.$colToMap->id."\n\n";
                // return;
            }
            foreach ($workAreaTagMapping[$title] as $oldTagId) {
                $colToMap = Collection::where('old_id', $oldTagId)
                                    ->where('old_type', 'tag')
                                    ->first();
                $itemIds = $colToMap->items()->pluck('items.id')->all();
                // $coll->items()->attach(array_fill_keys($itemIds, ['order' => 0, 'item_order' => 0]));
                $coll->items()->syncWithoutDetaching($itemIds);
            }

            $itemIdsToMap = $workAreaItemMapping[$title];
            if (count($itemIdsToMap)) {
                $itemIds = Item::whereIn('old_id', $workAreaItemMapping[$title])
                                ->where('old_type', 'post_page')
                                ->pluck('id')
                                ->all();
                // $coll->items()->attach(array_fill_keys($itemIds, ['order' => 0, 'item_order' => 0]));
                $coll->items()->syncWithoutDetaching($itemIds);
            }
        }

        $sdiGroup = new Collection;
        $sdiGroup->type = 'sdi';
        $sdiGroup->layout = 'subcoll_noitems';
        $sdiGroup->ordering = 'manual';
        $sdiGroup->save();
        $blurb = $blurbs['Our Priorities'];
        $sdiGroup->content()->createMany([
            ['lang' => '*', 
             'title' => 'Our Priorities', 
             'slug' => Utils::makeSlug('Our Priorities'),
             'blurb' => $blurb
            ],
            ['lang' => 'en', 
             'title' => 'Our Priorities', 
             'slug' => Utils::makeSlug('Our Priorities'),
             'blurb' => $blurb
            ],
        ]);
        // Utils::attachImage($sdiGroup, 'wheel_010.jpg');
		Utils::writeConfigCollection('priorities', $sdiGroup->id);

        $i = 0;
        foreach ($strategicDirectionMapping as $sdi => $workareaTitles) {
            $sdiCollection = Collection::create([
                'type' => 'sdi_group',
                'layout' => 'subcoll_cards',
                'ordering' => 'manual'
            ]);
            $blurb = $blurbs[$sdi];
            $sdiCollection->contents()->createMany([
                ['lang' => '*', 'title' => $sdi, 'slug' => Utils::makeSlug($sdi), 'blurb' => $blurb],
                ['lang' => 'en', 'title' => $sdi, 'slug' => Utils::makeSlug($sdi), 'blurb' => $blurb],
            ]);
            $sdiCollection->parentCollections()->attach($sdiGroup, ['sub_order' => $i++]);
            $j = 0;
            foreach ($workareaTitles as $title) {
                $workareaCollId = $workAreaCollIds[$title];
                if (!$workareaCollId) {
                    // echo "No workarea found for '$title' !!\n";
                    continue;
                } else {
                    // echo $sdiCollection->id." $title => $workareaCollId \n";
                }
                $sdiCollection->subCollections()->attach(Collection::find($workareaCollId), ['sub_order' => $j++]);
            }
            if (isset($workAreaImages[$sdi])) {
                Utils::attachImage($sdiCollection, $workAreaImages[$sdi]);
            } else {
                echo 'No lead image '.$title;
            }
            if (false && isset($icons[$sdi])) {
                $image = new Item;
                $image->type = 'resource';
                $image->subtype = 'image.icon';
                $image->save();
                $image->content()->create([
                        'lang' => '*',
                        'title' => 'Icon for '.$sdi,
                        'slug' => Str::slug('icon_'.$sdi),
                ])->images()->create([
                    'path' => 'storage/'.$icons[$sdi]
                ]);
                $sdiCollection->images()->save($image, ['order' => 0]);
            }
        }

    }

    protected function blurbs() {
        return [
            'Our Priorities' 
                => '<p>Informed and empowered by teachers and education support personnel everywhere, we develop tools and strategies that enable us to work across all sectors of education and all regions of the world to effect change and create a better future for our students. <a href="https://youtu.be/NWmFWK3At-8" target="_blank">Click here</a> to see how we work and find out more about our priorities below. </p>'
            ,'Quality education for all' 
                => "<p>Each and every person deserves free quality public education. We believe education is a human right and a public good, which must be accessible to all. </p><p>Together with our member organisations, we work to ensure that governments live up to the promise of education for all. </p>"
            ,"Achieving Sustainable Development Goal 4" 
                => "<p>In 2015, all countries committed to achieving <a href='https://sdgs.un.org/goals'>17 Sustainable Development Goals</a> by 2030. Education International played a critical role in securing a stand-alone goal for education - <a href='https://sdgs.un.org/goals/goal4'>Sustainable Development Goal 4 (SDG 4)</a>: Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Significantly, SDG4 recognised that quality education can only be delivered by qualified teachers.</p>
                <p>However, at the current pace, governments will fail to achieve SDG 4. The COVID-19 pandemic poses additional challenges, and risks reversing years of progress on education. Urgent and decisive action is imperative. </p>
                <p>Together with our member organisations around the world we are working to ensure that governments live up to their promise to achieve SDG 4 and all its targets by 2030.</p>
                <ul>
                <li>We monitor progress and hold governments accountable.</li>
                <li>We advocate for enhanced domestic financing for public education through fair and progressive taxation and international aid. </li>
                <li>We oppose corporate interests that treat education as a market instead of a public good accessible to all.<li>
                <li>We promote quality education that is free from violence, develops the “whole child”, builds tolerance, understanding, democracy, respect for human rights and active citizenship for sustainable development.</li>
                <li>We promote the achievement of the “teacher target” (target 4.c), underlining every students’ right to be taught by a trained and qualified teacher. </li></ul>"
            ,"Fighting the commercialisation of education"
                => "<p>Education is a human right and a public good that can be fully realised only through the provision of free, equitable, inclusive, quality public education. The growing commercialisation and privatisation in and of the sector is the greatest threat to the universal right to education. </p> 
                <p>Across the world, corporate interests are striving to transform all levels of education, from early childhood to higher education, into yet another market with winners and losers. As private-sector management models are applied to education institutions, employment conditions in the sector are being undermined. As low-fee, low-quality private schools expand rapidly, there is a risk that governments abrogate their responsibility to ensure the right to education for all. Unaccountable corporations have undue influence on education policies and institutions. The COVID-19 pandemic has exacerbated this trend which risks transforming education into a commodity, favouring profit over quality education.</p> 
                <p>As educators, we put students before profit. In 2015 we launched our <em>Global Response to the Commercialisation and Privatisation of Education</em>. Through this campaign, we work to expose and challenge the policies and practices of governments, intergovernmental organisations and international financial institutions which undermine public education and the rights and status of teachers and education support personnel. We also resist global corporate actors, especially education technology providers, who push the commercialisation and privatisation in and of education.</p>"
            ,"Climate action and literacy" 
                => "<p>The world is undeniably facing a climate emergency. As defenders of truth and science, teachers are mobilising for climate justice and literacy. </p>
                <p>We are working to ensure climate change education is taught in schools across the world to equip students with the critical knowledge they need in their daily lives and to inform their choices as active citizens. We advocate for climate education to be integrated into curricula, initial teacher training and continuous professional development and for education to be recognised as a key tool in the fight against climate change.</p>
                <p>Together with students, with the global trade union movement and civil society partners, we advocate for a just transition in order to secure workers’ rights and livelihoods as economies shift to sustainable production.</p>"
            ,"The profession"
                => "<p>As the global federation of education unions, we promote and protect the rights and status of teachers and education support personnel. </p>
                <p>We advocate for teachers and education support personnel to be directly involved in shaping education systems, so that their professional experience and expertise inform all teacher and education policies. This is the global standard we are working to achieve.</p>"
            ,"Standards and working conditions"
                => "<p>Teachers and education support personnel provide a critical public service. They must be afforded the respect they deserve, as well as attractive salaries and benefits, decent and secure working and employment conditions, safe and inclusive workplaces, and access to continuous professional learning and development throughout their careers. Together with our member organisations, we promote social dialogue and work to ensure teachers and education support personnel across the world have the conditions they need to deliver quality teaching and learning.</p><p> 
                However, the status of teachers is not just about pay and conditions. It is also about empowering and supporting teachers to stand at the centre of what they do – the teaching and learning process. </p><p>
                In 2019, Education International and UNESCO published a joint framework on the development of professional teaching standards. The framework aims to improve teacher quality, teaching and learning, as well as support the implementation and monitoring of the teacher target in Sustainable Development Goal 4. </p><p>
                Teachers and their unions must be at the centre of this process, working with governments and other education stakeholders. This is not just important for educators, it is essential for students and the quality of education systems. We are working for these standards to be developed and respected around the world. </p>"
            ,"Leading the profession"
                => "<p>Teachers and education support personnel know what works in education. They must be recognised and empowered to deliver on the promise of quality education for all.  </p><p>
                At the classroom level, academic freedom and professional autonomy are prerequisites for quality teaching and learning. As professionals, teachers must be afforded the space and trust to make the best possible decisions for their students. </p><p>
                Beyond the classroom, education policy must be informed by the vast experience and insights only education professionals can provide. We advocate for the involvement of teachers, education support personnel and their representative organisations in all decision-making in education and work towards the expansion of sectoral policy dialogue at all levels and in all countries. </p>"
            ,"Future of work in education"
                => "<p>The future of education depends on strengthening the teaching profession, enhancing its status, and improving conditions to ensure that every student has a qualified teacher. The expertise of teachers must be recognised. Teachers must be the ones leading the development and future of education.  </p><p>
                Technology and artificial intelligence are currently changing education as we know it. COVID-19 has accelerated the pace of change, forcing classrooms to move online for extended periods of time. While technology has the potential to support teaching and learning, it also poses major challenges, such as the critical digital divide and increased inequity, the commercialisation of education, issues of data privacy and cyberbullying, to name just a few.  </p><p>
                Simply introducing education technology does not lead to enhanced learning. The teaching profession has a critical role to play in evaluating and deciding on the appropriate technology for teaching and learning.  </p><p>
                As proven by the COVID-19 crisis, relationships between teachers and students and school communities are critical to student development and cannot be replaced by screens. We advocate for a human and student-centred approach to the use of technology and artificial intelligence in education.</p>"
            ,"Rights and democracy"
                => "<p>The defence of human rights, particularly trade union rights, and democracy is at the very core of our mission. We believe that the freedom of association, the right to decent work and collective bargaining, and the right to education and life-long learning are cornerstones of healthy democratic societies. </p><p>
                Solidarity between our 384 member organisations drives and powers our work to advance human rights, equity and inclusion, and democratic societies all around the world. </p>"
            ,"Trade union rights are human rights"
                => "<p>Trade unionists are far too often subject to attacks by repressive governments. Every year, many are subjected to violence, arrest and imprisonment, torture and even murder. Trade union leaders in education are targeted by non-democratic governments who seek total control of education, and deny teachers and education support personnel their rights.</p><p>
                Even in democratic countries, many education workers are denied the right to join unions and/or engage in collective bargaining. Where bargaining exists, limits on its scope can be imposed. Moreover, teachers and education support personnel are denied the right to strike.</p><p>
                Education International also supports the right of students to organise and join the fight for more inclusive and democratic communities.</p><p>
                Working closely with our member organisations, other global unions and human rights networks, we use supervisory mechanisms at the national, regional and global levels to ensure rights and standards are respected and social dialogue is effective. </p><p>
                Solidarity actions among our global membership are a powerful tool to advance rights everywhere.</p>"
            ,"Equity and inclusion" 
                => "<p>We defend and promote the principles of equity and equality in education, in education unions and in society. We are fully committed to combating all forms of racism and of bias or discrimination due age, disability, ethnicity or indigeneity, gender, gender identity or sexual orientation, language, marital status, migratory status, political activism, religion, socio-economic status, trade union affiliation, among others. We are committed to addressing these forms of discrimination through an intersectional lens, which enables a deeper understanding of the complexities of lived experiences. </p>
                <figure class='quote'><blockquote><p>I think Education International has a leadership role to play… If we’re going to have a more civil society, a more inclusive society, then we have to model that by including men but women as well, people of different ethnic groups or religious backgrounds. All of us have to be involved and be at the table and have that kind of respect.</p></blockquote>
                <figcaption>Professor Mary Hatwood Futrell, First elected EI President, 1993–2004</figcaption></figure>
                <p>Promoting and advancing gender equality has always been an Education International priority. We believe that education can play a key role in empowering women and girls and can contribute to breaking through the cycle of gender discrimination. The Education International Gender Equality Action Plan highlights three main priorities:</p>
                <ol>
                <li>Promoting women’s leadership and participation within education unions;</li>
                <li>Taking action to increase intersectional gender equality in and through education;</li>
                <li>Promoting and securing women’s economic empowerment.</li>
                </ol>
                <p>The unequal and gendered impact of the COVID-19 pandemic risks erasing years of progress on equity and inclusion throughout the world. Together with our member organisations, we mobilise to challenge and help dismantle all structures of inequality in education and beyond. As part of this work, we have called for equity audits to be conducted at all levels of education in order to ensure the pandemic does not define the lives of an entire generation of students.</p>"
            ,"Democracy"
                => "<p>Democracy is vital to healthy societies and critical to ensuring all human rights are respected. Essential as it is, democracy is not irreversible. In recent years, even established democracies have witnessed the rise of authoritarianism that threatens to tear the very fabric of our communities. </p><p>
                Defending and advancing democracy is central to the purpose of the trade union movement in education. The right to education, trade union rights and freedom of expression are critical enabling rights that help to leverage other rights. Together with our member organisations, we mobilise in support of democracy through trade union action and through education.</p>
                <figure class='quote'><blockquote><p>If we want democracy, we have to demand it, and we have to be able to educate children who will make and remake it.</p></blockquote>
                <figcaption>Timothy Snyder</figcaption></figure>
                <p>We believe that the strongest safeguard of democracy is quality education with trained and supported teachers who enjoy full professional autonomy. Some of the profession’s collective wisdom was brought together in “On Education and Democracy: 25 Lessons from the Teaching Profession”. Authored by our President, Susan Hopgood, and our General Secretary Emeritus, Fred van Leeuwen, the book serves as an invitation to all educators to take a stand in defence of democracy and to consider contributions that teachers, schools, universities, and representative organisations can make to solidify and progress democratic life.</p>"
            ,"Building union power"
                => "<p>Trade unions are crucial to vibrant democratic societies and to achieving social justice. Reflecting the values of their members, education unions defend and promote two essential universal human rights: the right to decent work and the right to quality education. </p><p>
                As the global federation of education unions, we work to develop, strengthen, and grow the education union movement across the world to the benefit of all.  </p>"
            ,"Union growth, renewal and development"
                => "<p>All teachers and education support personnel have the right to organise and be part of a union that represents and defends their values and interests. However, around the world, education unions are facing serious attacks and operate in increasingly challenging and hostile environments. Revitalising unions, building their power by boosting membership and active participation and maximising impact is the way forward. </p><p>
                We bring together our member organisations to discuss and share experiences, good practices and ideas on responding to collective challenges. Together we are building the education unions of the future: mass participation organisations that reflect the diverse interests and identities of their members and offer educators a multitude of ways to engage and contribute.</p>"
            ,"Young members"
                => "<p>Building union power depends on young people. When joining, young and early-stage teachers, researchers and education support personnel may struggle to find a place within their union. We must make sure that they are included and have a voice at all levels of education trade unions. </p><p>
                We work with our member organisations to ensure trade unions meet the needs and expectations of young education workers and that union structures, policies and activities are fully open to them. </p>"
        ];
    }
}
