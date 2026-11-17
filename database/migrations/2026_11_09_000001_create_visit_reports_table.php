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
        Schema::create('visit_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('programs')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignId('fasilitator_id')->nullable()->constrained('users')->cascadeOnUpdate()->nullOnDelete();
            $table->date('visit_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->text('activity_description');
            $table->text('obstacles')->nullable();
            $table->unsignedBigInteger('pm_count');
            $table->string('photo')->nullable();
            $table->string('status', 20)->default('draft'); // draft|submitted|revised|reviewed
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->cascadeOnUpdate()->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('review_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['fasilitator_id', 'status']);
            $table->index('visit_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visit_reports');
    }
};
