<?php

namespace App\Models;


class CollectionSlotItem extends Model
{
    public $timestamps = false;
    protected $with = ['slot', 'item'];
    
    //
    function slot() {
        return $this->belongsTo('App\Models\CollectionSlot', 'slot_id');
    }

    function item() {
        return $this->belongsTo('App\Models\Item');
    }

}
