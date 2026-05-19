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
        Schema::table('families', function (Blueprint $table) {
            $table->text('description')->nullable()->after('notes');
        });

        Schema::table('genera', function (Blueprint $table) {
            $table->text('description')->nullable()->after('notes');
        });

        Schema::table('species', function (Blueprint $table) {
            $table->text('description')->nullable()->after('vitamotus_notes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('families', function (Blueprint $table) {
            $table->dropColumn('description');
        });

        Schema::table('genera', function (Blueprint $table) {
            $table->dropColumn('description');
        });

        Schema::table('species', function (Blueprint $table) {
            $table->dropColumn('description');
        });
    }
};
