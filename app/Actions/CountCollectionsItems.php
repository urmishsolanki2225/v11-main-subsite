<?php 

namespace App\Actions;

use App\Models\Item;

class CountCollectionsItems {
    
    public function execute($collectionIds, $existingCollectionId) {
        $items = Item::whereHas('content')->withoutGlobalScopes();
        foreach ($collectionIds as $id) {
            $items = $items->whereHas(
                'collections', 
                fn($q) => $q->where('collections.id', $id)->withoutGlobalScopes()
            );
        }
        $result = ['count' => $items->count()];
        if ($existingCollectionId) {
            $withoutExisting = $items->whereDoesntHave(
                'collections',
                fn($q) => $q->where(
                    'collections.id', 
                    $existingCollectionId
                )
            );
            $result['withoutExisting'] = $withoutExisting->count();
        }
        return $result;
    }

}
