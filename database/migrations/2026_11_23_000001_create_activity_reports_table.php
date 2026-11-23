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
        Schema::create('activity_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fasilitator_id')->nullable()->constrained('fasilitators')->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('group_id')->nullable()->constrained('groups')->cascadeOnUpdate()->nullOnDelete();
            $table->date('activity_date');
            $table->string('title');
            $table->string('type')->nullable();
            $table->string('location')->nullable();
            $table->unsignedInteger('participants_count')->default(0);
            $table->text('description')->nullable();
            $table->string('photo')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index('fasilitator_id');
            $table->index('group_id');
            $table->index('activity_date');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_reports');
    }
};
