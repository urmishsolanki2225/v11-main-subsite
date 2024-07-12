<?php 

namespace App\Actions;

use App\Models\Item;

class UpdateAttachmentGroups {
    
    public function execute(Item $item, array $attachmentGroups) {
        if (!isset($attachmentGroups)) {
            return;
        }
    }

}
