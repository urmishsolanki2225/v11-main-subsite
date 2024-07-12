<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class SocialShareSchedule extends Model
{
    use HasFactory;

    protected $casts = [
        "share_at" => "datetime",
    ];

    protected $with = ["content"];

    public function content()
    {
        return $this->morphTo();
    }
}
