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
        Schema::create('sponsorship_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('contact_name');
            $table->string('phone', 50);
            $table->string('email');
            $table->text('address')->nullable();
            $table->string('organization_name');
            $table->string('organization_type')->nullable();
            $table->text('organization_address')->nullable();
            $table->string('organization_phone', 50)->nullable();
            $table->string('organization_email')->nullable();
            $table->string('collaboration_type');
            $table->string('support_type');
            $table->string('preferred_program')->nullable();
            $table->string('estimated_budget')->nullable();
            $table->text('message');
            $table->string('status')->default('new')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sponsorship_inquiries');
    }
};
