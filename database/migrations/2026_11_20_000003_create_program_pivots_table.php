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
        Schema::create('fasilitator_program', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fasilitator_id')->constrained('fasilitators')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('program_id')->constrained('programs')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['fasilitator_id', 'program_id']);
        });

        Schema::create('beneficiary_program', function (Blueprint $table) {
            $table->id();
            $table->foreignId('beneficiary_id')->constrained('beneficiaries')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('program_id')->constrained('programs')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['beneficiary_id', 'program_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beneficiary_program');
        Schema::dropIfExists('fasilitator_program');
    }
};
