<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Collection;
use Illuminate\Support\Str;

class BlogSeriesMigration extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $blogs = Item::with('contents')
                    ->where('type', 'article')
                    ->whereHas('contents', function($query) {
                        $query->where('lang', 'en')
                              ->where('title', 'like', '#%')
                              ;
                    })
                    ->cursor()
                    ;
        $series = array();

        foreach ($blogs as $blog) {
            $serie;
            $hashtag = explode(' ', trim($blog->content->title))[0];
            $hashtag = str_replace(':', '', $hashtag);
            if (isset($series[$hashtag])) {
                $serie = $series[$hashtag];
            } else {
                $serie = Collection::create([
                    'type' => 'articles',
                    'ordering' => 'date',
                    'updated_at' => $blog->updated_at,
                    'created_at' => $blog->created_at
                ]);
                $series[$hashtag] = $serie;
                $serie->parentCollections()->attach(config('eiie.collection.opinion'));
                foreach ($blog->contents as $content) {
                    $title = explode(' ', trim($content->title))[0];
                    $title = str_replace(':', '', $title);
                    $serie->contents()->create([
                        'lang' => $content->lang,
                        'title' => $title,
                        'slug' => Str::slug($title)
                    ]);
                }
            }
            $serie->items()->attach($blog, ['order' => 0]);
            if ($blog->updated_at > $serie->update_at) {
                $serie->updated_at = $blog->updated_at;
            }
        }

        $statements = Item::with('contents')
                        ->where('type', 'article')
                        ->whereHas('contents', function($query) {
                            $query->where('lang', 'en')
                                  ->where('title', 'like', 'Statement |%')
                                  ;
                        })
                        ->pluck('id')
                        ;
        Collection::find(config('eiie.collection.news'))->items()->detach($statements);
        Collection::find(config('eiie.collection.statements'))->items()->attach($statements);
    }
}
