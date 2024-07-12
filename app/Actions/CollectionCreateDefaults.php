<?php 

namespace App\Actions;

use App\Models\Collection;

class CollectionCreateDefaults {
    
    public function execute(Collection $collection) {

        if ($collection->type == 'articles') {
            $collection->ordering = 'date';
        }
        if ($collection->type == 'author') {
            $collection->ordering = 'date';
            // $collection->layout = 'author';
        }
        if ($collection->type == 'contacts') {
            $collection->ordering = 'manual';
            // $collection->layout = 'contacts';
        }
        if ($collection->type == 'country') {
            // $collection->layout = 'country';
            $collection->ordering = 'date';
            $collection->slots_template_id = 1;
        }
        if ($collection->type == 'dossier') {
            $collection->ordering = 'manual';
            // $collection->layout = 'dossier';
        }
        if ($collection->type == 'dossier_sub') {
            $collection->ordering = 'date';
            // $collection->layout = 'dossier_sub';
        }
        if ($collection->type == 'library') {
            $collection->ordering = 'date';
            // $collection->layout = 'library';
        }
        if ($collection->type == 'persons') {
            $collection->ordering = 'manual';
            // $collection->layout = 'persons';
        }
        if ($collection->type == 'region') {
            $collection->ordering = 'alphabet';
            // $collection->layout = 'region';
        }
        if ($collection->type == 'tag') {
            $collection->ordering = 'date';
            // $collection->layout = 'tag';
        }
        if ($collection->type == 'theme') {
            $collection->ordering = 'date';
            // $collection->layout = 'theme';
        }

        $collection->save();
    }

}
