<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Family;
use App\Models\Genus;
use App\Models\Species;
use Illuminate\Support\Facades\DB;

class TaxonomyImporter extends Command
{
    protected $signature = 'taxonomy:import';
    protected $description = 'Import taxonomy data from the master CSV files';

    public function handle()
    {
        $speciesCsv = 'c:\Users\ThinkDigital\projects\vitamotus.earth\data\master databank 2026 - Accepted Species Master.csv';
        $familyCsv = 'c:\Users\ThinkDigital\projects\vitamotus.earth\data\master databank 2026 - Family Summary.csv';

        if (!file_exists($speciesCsv)) {
            $this->error("Species CSV not found at: $speciesCsv");
            return;
        }

        $this->info("Starting Import Process...");

        // 1. Process Families first (using the summary if available for counts, or just extracting from species)
        // For simplicity and accuracy with the master file, we will extract directly from the species master
        // and update counts later.

        $this->info("Parsing species master file...");
        
        $handle = fopen($speciesCsv, "r");
        $header = fgetcsv($handle); // Skip header

        // Map header indices
        $indices = array_flip($header);

        $rowCount = 0;
        DB::beginTransaction();

        try {
            while (($data = fgetcsv($handle)) !== FALSE) {
                $rowCount++;
                
                $familyName = $data[$indices['family']];
                $genusName = $data[$indices['genus']];
                $scientificName = $data[$indices['scientific_name']];
                
                // Find or Create Family
                $family = Family::firstOrCreate(['name' => $familyName]);
                
                // Find or Create Genus
                $genus = Genus::firstOrCreate([
                    'name' => $genusName,
                    'family_id' => $family->id
                ]);

                // Create Species
                Species::updateOrCreate(
                    ['scientific_name' => $scientificName],
                    [
                        'family_id' => $family->id,
                        'genus_id' => $genus->id,
                        'species_epithet' => $data[$indices['species_epithet']],
                        'subspecies' => $data[$indices['subspecies']] ?? null,
                        'authority' => $data[$indices['authority']],
                        'year' => (int)$data[$indices['year']],
                        'distribution' => $data[$indices['distribution']],
                        'wsc_species_id' => $data[$indices['wsc_species_id']],
                        'wsc_legacy_id' => $data[$indices['wsc_legacy_id']],
                        'lsid' => $data[$indices['lsid']],
                        'taxon_status' => $data[$indices['taxon_status']],
                        'profile_status' => $data[$indices['profile_status']],
                        'vitamotus_notes' => $data[$indices['vitamotus_notes']] ?? null,
                    ]
                );

                if ($rowCount % 1000 === 0) {
                    $this->line("Processed $rowCount species...");
                }
            }

            // Update Counts
            $this->info("Finalizing counts...");
            foreach (Family::all() as $f) {
                $f->update([
                    'genus_count' => $f->genera()->count(),
                    'species_count' => $f->species()->count()
                ]);
            }
            foreach (Genus::all() as $g) {
                $g->update([
                    'species_count' => $g->species()->count()
                ]);
            }

            DB::commit();
            fclose($handle);
            $this->info("Import successful! Total records: $rowCount");

        } catch (\Exception $e) {
            DB::rollBack();
            fclose($handle);
            $this->error("Error during import: " . $e->getMessage());
        }
    }
}
