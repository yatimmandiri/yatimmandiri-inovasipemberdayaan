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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fasilitator_id')->nullable()->constrained('fasilitators')->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('program_id')->nullable()->constrained('programs')->cascadeOnUpdate()->nullOnDelete();
            $table->unsignedBigInteger('kantor_id')->nullable();
            $table->string('kantor_name')->nullable();
            $table->string('name');
            $table->string('leader_name')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->char('province_id', 2)->nullable();
            $table->char('regency_id', 4)->nullable();
            $table->char('district_id', 7)->nullable();
            $table->char('village_id', 10)->nullable();
            $table->boolean('status')->default(true);
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('fasilitator_id');
            $table->index('program_id');
            $table->index('kantor_id');
            $table->index('status');
        });

        Schema::table('beneficiaries', function (Blueprint $table) {
            $table->foreignId('group_id')->nullable()->after('fasilitator_id')->constrained('groups')->cascadeOnUpdate()->nullOnDelete();
            $table->index('group_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('beneficiaries', function (Blueprint $table) {
            $table->dropForeign(['group_id']);
            $table->dropIndex(['group_id']);
            $table->dropColumn('group_id');
        });

        Schema::dropIfExists('groups');
    }
};
