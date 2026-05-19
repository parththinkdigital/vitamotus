<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Family;
use App\Models\Genus;
use App\Models\Species;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class AdminTaxonomyController extends Controller
{
    // --- UTILITY ---
    public function showSpecies(Species $species)
    {
        return $species->load(['family', 'genus', 'profile']);
    }

    // --- FAMILY CRUD ---

    public function storeFamily(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:families,name',
            'authority' => 'nullable',
            'year' => 'nullable',
            'description' => 'nullable',
        ]);

        return Family::create($validated);
    }

    public function updateFamily(Request $request, Family $family)
    {
        $validated = $request->validate([
            'name' => 'required|unique:families,name,' . $family->id,
            'authority' => 'nullable',
            'year' => 'nullable',
            'description' => 'nullable',
        ]);

        $family->update($validated);
        return $family;
    }

    public function destroyFamily(Family $family)
    {
        $family->delete();
        return response()->json(['message' => 'Family deleted']);
    }

    // --- GENUS CRUD ---

    public function storeGenus(Request $request)
    {
        $validated = $request->validate([
            'family_id' => 'required|exists:families,id',
            'name' => 'required|unique:genera,name',
            'authority' => 'nullable',
            'year' => 'nullable',
            'description' => 'nullable',
        ]);

        return Genus::create($validated);
    }

    public function updateGenus(Request $request, Genus $genus)
    {
        $validated = $request->validate([
            'family_id' => 'required|exists:families,id',
            'name' => 'required|unique:genera,name,' . $genus->id,
            'authority' => 'nullable',
            'year' => 'nullable',
            'description' => 'nullable',
        ]);

        $genus->update($validated);
        return $genus;
    }

    public function destroyGenus(Genus $genus)
    {
        $genus->delete();
        return response()->json(['message' => 'Genus deleted']);
    }

    // --- SPECIES CRUD ---

    public function storeSpecies(Request $request)
    {
        $validated = $request->validate([
            'family_id' => 'required|exists:families,id',
            'genus_id' => 'required|exists:genera,id',
            'scientific_name' => 'required|unique:species,scientific_name',
            'authority' => 'nullable',
            'year' => 'nullable',
            'distribution' => 'nullable',
            'taxon_status' => 'nullable',
            'wsc_species_id' => 'nullable',
            'vitamotus_notes' => 'nullable',
            'description' => 'nullable',
            'sources' => 'nullable',
        ]);

        $species = Species::create($validated);

        if ($request->has('profile')) {
            $species->profile()->create($request->input('profile'));
        }

        return $species->load('profile');
    }

    public function updateSpecies(Request $request, Species $species)
    {
        $validated = $request->validate([
            'family_id' => 'required|exists:families,id',
            'genus_id' => 'required|exists:genera,id',
            'scientific_name' => 'required|unique:species,scientific_name,' . $species->id,
            'authority' => 'nullable',
            'year' => 'nullable',
            'distribution' => 'nullable',
            'taxon_status' => 'nullable',
            'wsc_species_id' => 'nullable',
            'vitamotus_notes' => 'nullable',
            'description' => 'nullable',
            'sources' => 'nullable',
        ]);

        $species->update($validated);

        if ($request->has('profile')) {
            $species->profile()->updateOrCreate(
                ['species_id' => $species->id],
                $request->input('profile')
            );
        }

        return $species->load('profile');
    }

    public function destroySpecies(Species $species)
    {
        $species->delete();
        return response()->json(['message' => 'Species deleted']);
    }

    // --- IMAGE UPLOAD ---

    public function uploadImage(Request $request, Species $species)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB limit
        ]);

        $family = $species->family->name;
        $genus = $species->genus->name;
        $speciesName = $species->scientific_name;
        $id = $species->wsc_species_id;

        // Construct the nested path in the public directory
        $path = "uploads/{$family}/{$genus}/{$speciesName}";
        $fullPath = public_path($path);

        // Ensure directory exists
        if (!File::exists($fullPath)) {
            File::makeDirectory($fullPath, 0755, true);
        }

        $image = $request->file('image');
        $filename = "{$id}.jpg"; // We enforce .jpg as per our frontend helper

        $image->move($fullPath, $filename);

        return response()->json([
            'message' => 'Image uploaded successfully',
            'url' => asset("{$path}/{$filename}")
        ]);
    }
}
