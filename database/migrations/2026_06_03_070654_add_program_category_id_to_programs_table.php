<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->foreignId('program_category_id')
                ->nullable()
                ->after('id')
                ->constrained('program_categories')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropConstrainedForeignId('program_category_id');
        });
    }
};
