<?php 

namespace App\Actions;

use Illuminate\Support\Str;
use Stevebauman\Purify\Facades\Purify;

class CleanHtml {

    public function execute($itemOrCollection) {
        foreach ($itemOrCollection->contents as &$content) {
            $content->blurb = $this->clean($content->blurb);
            if (isset($content->content)) {
                $content->content = $this->clean($content->content);
            }
        }
        return $itemOrCollection;
    }

    public static function clean($input = '', $limited = false) {
        if (!$input) {
            return $input;
        }
        $content = Purify::clean($input);//, $limited ? ['HTML.ForbiddenElements' => 'iframe'] : []);
        $content = Str::of($content)
                        ->replaceMatches('/>\s+</', '><')
                        ->replace('<div>', '<p>')
                        ->replace('</div>', '</p>')
                        ->replace('<p><strong>', '<h3>')
                        ->replace('<p><br /><strong>', '<h3>')
                        ->replace('<br /><strong>', '</p><h3>')
                        ->replace('<p><br><strong>', '<h3>')
                        ->replace('<br><strong>', '</p><h3>')
                        ->replace('</strong><br />', '</h3><p>')
                        // ->replace('</strong></p>', '</h3>')
                        ->replace('<br>', '')
                    ;
        $content = Str::of(Purify::clean($content))
                        ->replaceMatches('/>\s+</', '><')
                        ;
        $increaseHeaderLevel = 0;
        if ($content->contains('<h1>')) {
            $increaseHeaderLevel = 2;
        } else if ($content->contains('<h2>')) {
            $increaseHeaderLevel = 1;
        }
        if ($increaseHeaderLevel) {
            $content = $content->replaceMatches('/h(\d)>/', 
                function($match) use ($increaseHeaderLevel) {                    
                    return 'h'.($match[1] + $increaseHeaderLevel).'>';
                }
            );
        }
        return $content;
    }

}