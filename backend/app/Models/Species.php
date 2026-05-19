<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Species extends Model
{
    protected $guarded = [];

    public function family()
    {
        return $this->belongsTo(Family::class);
    }

    public function genus()
    {
        return $this->belongsTo(Genus::class);
    }

    public function profile()
    {
        return $this->hasOne(SpeciesProfile::class);
    }
}
