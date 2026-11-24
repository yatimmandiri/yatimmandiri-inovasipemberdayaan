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
        Schema::create('cash_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fasilitator_id')->nullable()->constrained('fasilitators')->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('group_id')->nullable()->constrained('groups')->cascadeOnUpdate()->nullOnDelete();
            $table->date('transaction_date');
            $table->enum('type', ['in', 'out'])->default('in'); // in = Kas Masuk, out = Kas Keluar
            $table->decimal('amount', 15, 2)->default(0);
            $table->string('category')->nullable(); // misal: Iuran Anggota, Penjualan, Bantuan Modal, Pembelian Bahan, Biaya Operasional, dll.
            $table->text('description')->nullable();
            $table->string('proof')->nullable(); // bukti transfer / nota / kwitansi
            $table->boolean('status')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index('fasilitator_id');
            $table->index('group_id');
            $table->index('transaction_date');
            $table->index('type');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cash_transactions');
    }
};
