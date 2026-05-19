<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('species_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('species_id')->constrained()->onDelete('cascade');
            
            // Living Conditions
            $table->text('habitat')->nullable();
            $table->text('diet')->nullable();
            
            // Physical Traits
            $table->string('size_min')->nullable();
            $table->string('size_max')->nullable();
            $table->string('web_type')->nullable();
            $table->text('similar_species')->nullable();
            
            // Behavioral
            $table->text('behaviour_notes')->nullable();
            $table->text('venom_medical_relevance')->nullable();
            
            // Status
            $table->string('conservation_status')->nullable();
            
            // Media & Meta
            $table->json('photo_gallery_urls')->nullable();
            $table->text('references_list')->nullable();
            $table->text('hobbyist_summary')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species_profiles');
    }
};
