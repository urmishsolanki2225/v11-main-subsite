<?php 

namespace App\Actions;

use App\Models\Item;

class PatchItem {
    
    public function execute(Item $item, array $delta) {
        if (!isset($delta) || !count($delta)) {
            return;
        }
    }

}
