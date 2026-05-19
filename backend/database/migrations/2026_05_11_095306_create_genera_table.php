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
        Schema::create('genera', function (Blueprint $table) {
            $table->id();
            $table->foreignId('family_id')->constrained()->onDelete('cascade');
            $table->string('name')->unique();
            $table->string('authority')->nullable();
            $table->integer('year')->nullable();
            $table->integer('species_count')->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('genera');
    }
};
