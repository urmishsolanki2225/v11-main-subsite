<?php 

namespace App\Actions;

use App\Models\Collection;

class SaveItemsOrdering {
    
    public function execute(Collection $collection, $ids, $unorderIds = []) {
        $ordered = [];
        $order = 0;
        $orderColumn = 'item_order';
        foreach ($ids as $id) {
            $ordered[$id] = [$orderColumn => $order++];
        }
        if ($unorderIds) {
            foreach ($unorderIds as $id) {
                if ($id) {
                    $ordered[$id] = [$orderColumn => 9999999];
                }
            }
        }
        $collection->items()->withoutGlobalScopes()->syncWithoutDetaching($ordered);
    }

}

