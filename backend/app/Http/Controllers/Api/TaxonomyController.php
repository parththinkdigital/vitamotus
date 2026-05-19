<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Family;
use App\Models\Genus;
use App\Models\Species;
use Illuminate\Http\Request;

class TaxonomyController extends Controller
{
    /**
     * Get all spider families
     */
    public function families()
    {
        return response()->json(
            Family::orderBy('name')->get()
        );
    }

    /**
     * Get a specific family and its genera
     */
    public function family($name)
    {
        $family = Family::where('name', $name)->firstOrFail();
        
        return response()->json([
            'family' => $family,
            'genera' => $family->genera()->orderBy('name')->get()
        ]);
    }

    public function genera(Request $request)
    {
        $query = Genus::with('family')->orderBy('name');

        if ($request->has('family_id')) {
            $query->where('family_id', $request->family_id);
        }

        return response()->json($query->paginate(50));
    }

    /**
     * Get a specific genus detail
     */
    public function genus($name)
    {
        $genus = Genus::with('family')->where('name', $name)->firstOrFail();
        $species = $genus->species()->orderBy('scientific_name')->get();

        return response()->json([
            'genus' => $genus,
            'species' => $species
        ]);
    }

    /**
     * Get species with comprehensive filtering
     */
    public function species(Request $request)
    {
        $query = Species::with(['family', 'genus', 'profile'])->orderBy('scientific_name');

        if ($request->has('family_id')) {
            $query->where('family_id', $request->family_id);
        }

        if ($request->has('genus_id')) {
            $query->where('genus_id', $request->genus_id);
        }

        if ($request->has('search')) {
            $query->where('scientific_name', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->paginate(24));
    }

    /**
     * Get a single species profile
     */
    public function specimen($scientificName)
    {
        // Decode URL encoded spaces if necessary
        $name = str_replace('-', ' ', $scientificName);
        
        return response()->json(
            Species::with(['family', 'genus', 'profile'])->where('scientific_name', $name)->firstOrFail()
        );
    }

    /**
     * Get the dynamic Species of the Day (seeded by date)
     */
    public function speciesOfTheDay()
    {
        // Seed the randomizer with today's date so it's consistent for 24h
        $seed = date('Ymd');
        srand($seed);
        
        $total = Species::count();
        if ($total === 0) return response()->json(['error' => 'No species available'], 404);
        
        $offset = rand(0, $total - 1);
        
        return response()->json(
            Species::with(['family', 'genus'])->offset($offset)->first()
        );
    }
    /**
     * Global search across families, genera, and species
     */
    public function search(Request $request)
    {
        $search = $request->query('query');
        if (!$search || strlen($search) < 2) {
            return response()->json(['results' => []]);
        }

        $families = Family::where('name', 'like', "%{$search}%")
            ->limit(5)
            ->get()
            ->map(fn($f) => [
                'type' => 'family',
                'name' => $f->name,
                'subtitle' => 'Taxonomic Family',
                'href' => "/archive/family/" . strtolower($f->name)
            ]);

        $genera = Genus::with('family')->where('name', 'like', "%{$search}%")
            ->limit(5)
            ->get()
            ->map(fn($g) => [
                'type' => 'genus',
                'name' => $g->name,
                'subtitle' => "Genus in " . ($g->family ? $g->family->name : 'Unknown'),
                'href' => "/archive/genus/" . strtolower($g->name)
            ]);

        $species = Species::where('scientific_name', 'like', "%{$search}%")
            ->orWhere('common_name', 'like', "%{$search}%")
            ->limit(10)
            ->get()
            ->map(fn($s) => [
                'type' => 'species',
                'name' => $s->scientific_name,
                'subtitle' => $s->common_name ?: 'Accepted Species',
                'href' => "/species/" . str_replace(' ', '-', $s->scientific_name)
            ]);

        return response()->json([
            'results' => $families->concat($genera)->concat($species)
        ]);
    }
}
