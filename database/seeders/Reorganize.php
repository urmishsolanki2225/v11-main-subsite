<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\Item;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Builder;

class Reorganize extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // placeholder jobs item
        // https://www.ei-ie.org/en/detail_page/4362/jobs
        $jobsItem = Item::where('old_type', 'post_page')->where('old_id', 4362)->first();
        $jobsColl = Collection::find(config('eiie.collection.jobs'));
        foreach ($jobsItem->contents as $content) {
            $jobsColl->contents()->updateOrCreate([
                'lang' => $content->lang
            ], [
                'lang' => $content->lang,
                'title' => $content->title,
                'slug' => Utils::makeSlug($content->title),
                'blurb' => $content->content
            ]);
        }

        $constitutionalDocs = Collection::find(config('eiie.collection.constitutional-documents'));
        Utils::attachImage($constitutionalDocs, 'Governance-constitutional-documents.jpg');

        $affiliatesPlaceholderCollection = Collection::create([
            'type' => 'structure',
            'layout' => 'affiliates'
        ]);
        $affiliatesPlaceholderCollection->contents()->create([
            'lang' => 'en',
            'title' => 'Our Members',
            'slug' => Utils::makeSlug('Our Members')
        ]);
        Utils::attachImage($affiliatesPlaceholderCollection, 'Our-members.jpg');
        Utils::writeConfigCollection('affiliates', $affiliatesPlaceholderCollection->id);

        $whoWeAre = Item::create([
            'type' => 'static'
        ]);
        Utils::attachImage($whoWeAre, 'Who-we-are.jpg');
        $whoWeAre->contents()->create([
            'lang' => 'en',
            'title' => 'Who we are',
            'slug' => Utils::makeSlug('Who we are'),
            'blurb' => '<p>Education International is the Global Union Federation that brings together organisations of teachers and other education employees from across the world. <strong>Through our 386 member organisations, we represent more than 32.5 million teachers and education support personnel in 178 countries and territories.</strong></p>',
            'content' => '<p>Education International is the Global Union Federation that brings together organisations of teachers and other education employees from across the world. <strong>Through our 386 member organisations, we represent more than 32.5 million teachers and education support personnel in 178 countries and territories.</strong></p>
            <h3>What we stand for</h3><p>As the global voice of teachers and education support personnel we:</p><ul>
            <li>Champion free, quality, publicly funded education for every student in every country.</li>
<li>Represent and promote the interests of teachers and education support personnel at the international level.</li>
<li>Assist the development of independent democratic organisations to represent teachers and all education employees and help build solidarity and cooperation between them.</li>
<li>Support the development of teacher qualifications and the recognition of teachers as professionals. </li>
<li>Defend and promote democracy, peace, social justice, and human rights, including trade union rights and the right to education.</li>
<li>Advocate for equity in society. All our policies, programmes and advocacy efforts aim to advance social justice and challenge all forms of discrimination.</li>
                </ul>'
        ]);
        echo "who-we-are: $whoWeAre->id \n";

        $globalUnions = Item::where('old_type', 'post_page')
                            ->where('old_id', config('eiie.old_item.global-unions'))
                            ->first()
                            ;
        if ($globalUnions) {
            $globalUnions->contents()->updateOrCreate([
                'lang' => 'en'
            ], [
                'lang' => 'en',
                'content' => '<p>We work closely with the International Trade Union Confederation (ITUC), the Global Union Federations, and the Trade Union Advisory Committee (TUAC) to the OECD. Together we established the <a href="http://www.global-unions.org/?lang=en">Council of Global Unions</a>, driven by our commitment to the ideas and principles of the trade union movement. 
                </p><p>
                We share a common determination to organise, to defend democracy, human rights and labour standards everywhere. We promote the growth of trade unions for the benefit of all working men and women and their families.</p>'
            ]);
            $globalUnions->images()->sync([]);
            Utils::attachImage($globalUnions, 'Global-unions.jpg');
        }

        $globalResponseCampaign = Collection::where('old_type', 'post_dossier_parent')
            ->where('old_id', 15893)
            ->first()
            ;
        $globalResponseCampaign->images()->sync([]);
        Utils::attachImage($globalResponseCampaign, 'Commercialisation.jpg');
        $globalResponseCampaign->contents()->updateOrCreate([
            'lang' => 'en'
        ], [
            'lang' => 'en',
            'blurb' => 
        '<p>As education is seen as an increasingly lucrative global market by private corporations, the Global Response monitors and analyses the involvement of education corporations and edu-businesses and advocates against the expansion of profit making in education where it undermines the right of all students to free quality education.</p>

        <p>In addition to its broad global perspective, the Global Response campaign works in target countries where education unions have identified a particular threat to public education. Research reports by country: </p>
        
        <h3>Kenya</h3>
        
        <p>Bridge vs Reality: a study of Bridge International Academies’ for-profit schooling in Kenya by Education International &amp; Kenyan National union of Teachers, (2016) Download <strong><a href="https://download.ei-ie.org/Docs/WebDepot/Bridge%20vs%20Reality_GR%20Report.pdf">in English</a></p>
        
        <h3>Uganda</h3>
        
        <p>Schooling the poor profitably: the innovations and deprivations of Bridge International Academies in Uganda, by Riep C. &amp; Machacek M., (2016) Download <strong><a href="https://download.ei-ie.org/Docs/WebDepot/DOC_Final_28sept.pdf">in English</a></p>
        
        <h3>Liberia</h3>
        
        <p>Partnership Schools for Liberia: a critical review, by Hook T. Download <strong><a href="https://download.ei-ie.org/Docs/WebDepot/LIBERIA18julyv7.pdf">in English</a></p>
        
        <h3>Nigeria</h3>
        
        <p>Quality and Equalities: a comparative study of public and low-cost private schools in Lago<strong>s</strong>, by Unterhalter E., Robinson L., &amp; Ibrahim J. Download <strong><a href="https://drive.google.com/file/d/1Zd2VDTp4w8uHUWpVIgEQJd-cEexiqwB3/view">in English</a></p>'
        ]);

        $pdfPub = Item::create([
            'type' => 'resource',
            'subtype' => 'file'
        ]);
        $pdfPub->contents()->create([
            'lang' => 'en',
            'title' => 'Auditing Educational Equity in Light of the Covid-19 Pandemic',
            'subtitle' => 'A Guide for Education Unions',
            'slug' => Utils::makeSlug('Auditing Educational Equity in Light of the Covid-19 Pandemic'),
            'blurb' => 'A guide to support education unions as they advocate for equity audits to be conducted at both education institution and systems levels.',
            'content' => '<p>The COVID-19 pandemic has led to unprecedented school closures that have affected over 1.5 billion students worldwide. However, the impact of the pandemic has not been equal, with vulnerable and disadvantaged students disproportionately affected by the resulting global crisis in teaching and learning. 
            </p><p>
            "Auditing Educational Equity in Light of the COVID-19 Pandemic" is a guide to support education unions as they advocate for equity audits to be conducted at both education institution and systems levels.
            </p><p>
            The guide stresses the importance of equity audits in enabling education institutions and systems to adapt more effectively to a COVID-19 ‘new normal’ and also address entrenched structures of inequality that have long prevented countries from realising the universal right to education.</p>'
        ])->files()->create([
            'original_filename' => '2020_EIGuide_EquityAudit_Covid19_EN_final.pdf',
            'path' => '2020_EIGuide_EquityAudit_Covid19_EN_final.pdf',
            'order' => 0,
        ]);
        $pdfPub->collections()->attach(config('eiie.collection.publications-and-research'));
        $pdfPub->collections()->attach(931);
        Utils::attachImage($pdfPub, 'Equity-audits.jpg');
    }
}
