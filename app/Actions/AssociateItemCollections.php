<?php 

namespace App\Actions;

use App\Models\Item;

class AssociateItemCollections {
    
    public function execute(Item $item, array $images) {
        if (!isset($images)) {
            return;
        }
        $pivots = \Arr::pluck($images, 'pivot');

        foreach ($pivots as $pivot) {
            
        }
    }

}