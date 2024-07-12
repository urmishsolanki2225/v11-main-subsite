<?php 

namespace App\Actions;

use App\Models\Collection;
use App\Models\Item;

class ImportItems {
    
    public function execute($collection, $collectionIds) {
        $items = Item::whereHas('content')->withoutGlobalScopes()->select('id');
        foreach ($collectionIds as $id) {
            $items = $items->whereHas(
                'collections', 
                fn($q) => $q->where('collections.id', $id)->withoutGlobalScopes()
            );
        }
        $collection->items()->syncWithoutDetaching($items->get());
    }

}

