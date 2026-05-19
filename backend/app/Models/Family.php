<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    protected $guarded = [];

    public function genera()
    {
        return $this->hasMany(Genus::class);
    }

    public function species()
    {
        return $this->hasMany(Species::class);
    }
}
