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
        Schema::table('species_profiles', function (Blueprint $table) {
            $table->string('profile_status')->default('draft')->after('conservation_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('species_profiles', function (Blueprint $table) {
            $table->dropColumn('profile_status');
        });
    }
};
