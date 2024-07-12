<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

/* 
 * Pivot model to be able to lazy load sub and parent
 */

class CollectionCollection extends Pivot {
    protected $table = 'collection_collection';
    public $incrementing = true;
    
    public function sub() {
        return $this->belongsTo('Collection');
    }

    public function parent() {
        return $this->belongsTo('Collection');
    }

}