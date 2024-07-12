<?php

namespace App\Models;

use Carbon\Carbon;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class SocialMedia extends Model
{
    public $timestamps = false;
    protected $table = "social_media";
    protected $casts = [
        "access_token" => "encrypted",
        "access_token_secret" => "encrypted",
        "token_issued_at" => "datetime",
        "token_expires_at" => "datetime",
    ];

    protected function status(): Attribute
    {
        return Attribute::make(
            get: fn() => (!$this->access_token
                    ? "invalid"
                    : $this->token_expires_at &&
                        $this->token_expires_at->isBefore(Carbon::now()))
                ? "expired"
                : "ok"
        );
    }
}
