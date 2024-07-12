<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubsiteContactUs extends Model
{
    protected $table = 'subsites_contact_us';
    use HasFactory, SoftDeletes;
    protected $dates = ["deleted_at"];
    protected $casts = [
        'created_at' => 'datetime:Y-m-d h:i:s a',
        'updated_at' => 'datetime:Y-m-d',
    ];
    protected $fillable = [
        'subsite_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'subject',
        'message',
    ];
}
