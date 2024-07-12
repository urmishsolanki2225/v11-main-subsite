<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\Item;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Builder;

class ClimateCampaign extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $campaign = Collection::create([
            'type' => 'dossier',
            'layout' => 'dossier',
            'ordering' => 'manual'
        ]);
        $campaign->contents()->create([
            'lang' => 'en',
            'title' => 'Teach for the Planet',
            'slug' => Utils::makeSlug('Teach for the Planet'),
            'blurb' => '<p>Educators everywhere are standing up for the planet and for their students. We have a crucial role to play when it comes to climate action. What we teach matters. The survival of our students matters. We must inspire students and communities to action. 
            </p><p>
            Teach for the Planet aims to ensure that climate education, based on science and with a civic action focus, becomes as fundamental as teaching reading and writing.
            </p><p>
            We are leading in the movement for climate education. In all areas of the world, educators and students are organising for change.</p>'
        ]);
        $campaign->parentCollections()->attach(config('eiie.collection.campaigns'));
        Utils::attachImage($campaign, 'Teach4ThePlanet_lead_image.png');

        $news = $campaign->subCollections()->create([
            'type' => 'dossier_sub',
            'layout' => 'dossier_sub'
        ], [
            'sub_order' => 1
        ]);
        $news->contents()->create([
            'lang' => 'en',
            'title' => 'Campaign News',
            'slug' => Utils::makeSlug('Campaign News')
        ]);
        $achieve = $campaign->subCollections()->create([
            'type' => 'dossier_sub',
            'layout' => 'dossier_sub'
        ], [
            'sub_order' => 0
        ]);
        $achieve->contents()->create([
            'lang' => 'en',
            'title' => 'What we want to achieve',
            'slug' => Utils::makeSlug('What we want to achieve')
        ]);
        $spread = $campaign->subCollections()->create([
            'type' => 'dossier_sub',
            'layout' => 'dossier_sub',
            'ordering' => 'manual'
        ], [
            'sub_order' => 2
        ]);
        $spread->contents()->create([
            'lang' => 'en',
            'title' => 'Spread the word',
            'slug' => Utils::makeSlug('Spread the word')
        ]);

        $news->items()->attach(
            Item::where('old_type', 'post_post')->where('old_id', '17143')->first(), 
            ['item_order' => 0]
        );

        $item = $news->items()->create([
            'type' => 'article',
        ], ['item_order' => 1]);
        Utils::attachImage($item, 'Teach4thelanet_QualityEducation.jpg');
        $item->collections()->attach(1327);
        
        $manifesto = $achieve->items()->create([
            'type' => 'article',
        ], ['item_order' => 2]);
        Utils::attachImage($manifesto, 'Teach4thePlanet_Manifesto.jpg');

        $toolkit = $spread->items()->create([
            'type' => 'resource',
            'subtype' => 'file'
        ], ['item_order' => 10]);
        Utils::attachImage($toolkit, '20210323_133927_2021_VirtualBackground_EI_Climate_01b_ENG.png');

        $toolkitContents = $toolkit->contents()->create([
            'lang' => 'en',
            'title' => 'Communications Toolkit',
            'slug' => Utils::makeSlug('Communications Toolkit')
        ]);
        $toolkitContents->files()->create([
            'path' => 'Teach4thePlanet_Resources.zip'
        ]);

        $image1 =  $spread->items()->create([
            'type' => 'resource',
            'subtype' => 'image'
        ], ['item_order' => 1]);
        $image1->contents()->create([
            'lang' => '*',
            'title' => 'Virtual Background 1',
            'slug' => Utils::makeSlug('Virtual Background 1')
        ])->images()->create([
            'path' => '20210323_133927_2021_VirtualBackground_EI_Climate_01b_ENG.png',
        ]);

        $image2 =  $spread->items()->create([
            'type' => 'resource',
            'subtype' => 'image'
        ], ['item_order' => 2]);
        $image2->contents()->create([
            'lang' => '*',
            'title' => 'Virtual Background 2',
            'slug' => Utils::makeSlug('Virtual Background 2')
        ])->images()->create([
            'path' => '20210323_135747_2021_VirtualBackground_EI_Climate_02_ENG.png',
        ]);
        
        $item->contents()->create([
            'lang' => 'en',
            'title' => 'Quality Climate Change Education for All',
            'slug' => Utils::makeSlug('Quality Climate Change Education for All'),
            'subtitle' => 'Education International Launches Global Campaign',
            'blurb' => '<p>Educators have a crucial role to play when it comes to climate action. What we teach matters. The survival of our students matters. We must inspire students and communities to action.</p>',
            'content' => '<p>Educators have a crucial role to play when it comes to climate action. What we teach matters. The survival of our students matters. We must inspire students and communities to action. 
            </p><p>Education International, representing 32.5 million educators worldwide, is leading in the movement for climate education. In all areas of the world, educators and students are organising for change.
            </p><p>Education International will launch a multilevel campaign on April 21, 2021 to ensure that climate education, based on science with a civic action focus, becomes as fundamental as teaching reading and writing.
            </p><p>“The fight against climate change must have an education face and a teacher’s voice in every area of the world. The planet is in crisis and I strongly believe that teachers and educators have a critical role to play in combating the environmental destruction, human suffering and social injustice that will certainly occur if climate change continues at current rates,” stated Susan Hopgood, Education International President. 
            </p><p>“We are living through difficult times as the world is focused on battling against COVID-19. But our fight against the climate crisis is more urgent than ever. 2020 was the hottest year ever on record – we need to act now,” she added. 
            Education International will launch the campaign with the “Teach for the Planet: Global Education Summit.” The multilingual virtual event will feature prominent activists from every continent focused on the crucial role that educators and their unions play in combating climate change and why we need transformative climate education now.            
            </p><p>“Teachers know that the most important long-term investment our societies can make towards a sustainable future is ensuring every student is literate about climate science and equipped with the civic knowledge and skills to change course,” explained David Edwards, Education International General Secretary.
            </p><p>“All world leaders must commit to creating the necessary educational space and resources so that students learn the world’s most important lesson. In launching this campaign, the world’s educators are determined to realise our students’ rights to know, do and… exist,” Edwards added. 
            </p><p>This event will serve as the launch of Education International’s transformative climate education campaign leading up to the UN Climate Change Conference (COP26) in November 2021.</p>'
        ]);

        $manifesto->contents()->create([
            'lang' => 'en',
            'title' => 'Manifesto on Quality Climate Change Education for All',
            'slug' => Utils::makeSlug('Manifesto on Quality Climate Change Education for All'),
            'blurb' => '<p>Education International, the global voice of educators, hereby calls on every government in the world to recognise the power of education in the fight against climate change and provide quality climate change education (CCE) for all.</p>',
            'content' => '<p>Education International, the global voice of educators, hereby calls on every government in the world to recognise the power of education in the fight against climate change and provide quality climate change education (CCE) for all. </p><p>
            This manifesto outlines some basic principles behind quality CCE and the policies necessary to meet international commitments. </p>
            <h3>Governments include quality climate change education as part of their climate commitments.</h3><ol>
                <li>Every country has a climate change education policy and a credible timebound plan that is regularly monitored and evaluated.</li>
                <li>All governments include trade unions, including education unions, and civil society stakeholders in the development, implementation, and evaluation of CCE policies.</li>
                <li>Dedicated and sufficient funding is made available for CCE. CCE for all is supported by international cooperation, aid and open access to resources and knowledge.  </li>
            </ol>
            <h3>Every student leaves school climate-literate. </h3><ol>
                <li>CCE is integrated into curricula at all levels of education. It is compulsory in primary and secondary education.</li>
                <li>Gender-responsive CCE curricula is developed in collaboration with the representative organisations of teachers and students.  </li>
                <li>Schools and education institutions are supported to take an interdisciplinary and whole-institution approach to CCE. Climate change is addressed across all subjects. </li>
                </ol>
                <h3>Quality climate change education is based on science, and addresses the ethical, cultural, political, social and economic dimensions of climate change. </h3><ol>
                <li>CCE is underpinned by accurate information based on scientific evidence and up-to-date research. </li>
                <li>CCE addresses the unequal contribution of countries towards causing climate change and the unequal impact of climate change today, recognising that some of the most vulnerable groups and populations are most directly affected. </li>
                <li>CCE fosters critical thinking and civic engagement, recognising that the current system is inequitable, and levels of production and consumption are unsustainable. It is transformative and empowers students to take action in their local communities and beyond. It provides them with knowledge and skills needed for a more sustainable future.</li>
                </ol>
                <h3>Teachers are trained and supported to provide quality climate change education. </h3><ol>
                <li>The professional autonomy and academic freedom of teachers and higher education personnel are protected and guaranteed.</li>
                <li>CCE is included in both initial teacher education and continuous professional development programmes for teachers, responding directly to development needs identified by teachers. </li>
                <li>Teachers have the necessary teaching and learning resources to teach CCE. These resources are up-to-date, culturally relevant, gender-responsive, and in local languages.  </li>
                </ol>
                <h3>Schools and learning environments are transformed to support quality climate change education.</h3><ol>
                <li>Educational infrastructure is safe, resilient and climate-proof.</li>
                <li>Education institutions are energy-efficient and sustainable institutions. </li>
                <li>Education communities are supported to become more environmentally friendly and students are involved in sustainable practices at their education institutions. </li></ol>'
            ]);
    }
}
