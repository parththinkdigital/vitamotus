<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genus extends Model
{
    protected $guarded = [];

    public function family()
    {
        return $this->belongsTo(Family::class);
    }

    public function species()
    {
        return $this->hasMany(Species::class);
    }
}
