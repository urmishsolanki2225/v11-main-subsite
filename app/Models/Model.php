<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\SoftDeletes;

use DateTimeInterface;

abstract class Model extends Eloquent
{
    protected $guarded = [];

    protected function serializeDate(DateTimeInterface $date)
    {
        // return $date->format(DateTimeInterface::ISO8601);
        return $date->format("Y-m-d\TH:i:00.000\Z");
    }
}
