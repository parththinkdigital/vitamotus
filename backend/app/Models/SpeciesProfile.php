<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpeciesProfile extends Model
{
    protected $guarded = [];

    protected $casts = [
        'photo_gallery_urls' => 'array',
    ];

    public function species()
    {
        return $this->belongsTo(Species::class);
    }
}
