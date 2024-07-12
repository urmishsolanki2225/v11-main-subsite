<?php

namespace App\Models;


class Attachment extends Model
{
    protected $with = [
        'item',
        'item.content',
    ];
    //
    function item() {
        return $this->belongsTo('App\Models\Item');
    }
    function attachmentGroup() {
        return $this->belongsTo('App\Models\AttachmentGroup');
    }

}
