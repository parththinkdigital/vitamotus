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
        Schema::create('species', function (Blueprint $table) {
            $table->id();
            $table->foreignId('family_id')->constrained()->onDelete('cascade');
            $table->foreignId('genus_id')->constrained()->onDelete('cascade');
            $table->string('scientific_name')->unique();
            $table->string('species_epithet');
            $table->string('subspecies')->nullable();
            $table->string('common_name')->nullable();
            $table->string('authority')->nullable();
            $table->integer('year')->nullable();
            $table->text('distribution')->nullable();
            $table->string('wsc_species_id')->unique()->nullable();
            $table->string('wsc_legacy_id')->nullable();
            $table->string('lsid')->nullable();
            $table->string('taxon_status')->default('VALID');
            $table->string('profile_status')->default('taxonomy_only');
            $table->text('vitamotus_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species');
    }
};
