<?php

namespace Tests\Feature\Admin;

use App\Models\Company\Beneficiary;
use App\Models\Company\Fasilitator;
use App\Models\Company\Program;
use App\Models\Core\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class FasilitatorAndBeneficiaryTest extends TestCase
{
    use DatabaseTransactions;

    protected User $admin;
    protected Program $programA;
    protected Program $programB;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::query()->where('email', 'scrum@yatimmandiri.org')->first()
            ?? User::factory()->create();

        $this->programA = Program::first()
            ?? Program::create([
                'name' => 'Program Pemberdayaan Mandiri',
                'slug' => 'program-pemberdayaan-mandiri',
                'status' => true,
            ]);

        $this->programB = Program::skip(1)->first()
            ?? Program::create([
                'name' => 'Program Peternakan Berdaya',
                'slug' => 'program-peternakan-berdaya',
                'status' => true,
            ]);
    }

    public function test_admin_can_access_fasilitator_index(): void
    {
        $response = $this->actingAs($this->admin)->get(route('admin.fasilitators.index'));
        $response->assertStatus(200);
    }

    public function test_admin_can_access_beneficiary_index(): void
    {
        $response = $this->actingAs($this->admin)->get(route('admin.beneficiaries.index'));
        $response->assertStatus(200);
    }

    public function test_admin_can_create_fasilitator_with_multiple_programs(): void
    {
        $payload = [
            'name' => 'Ahmad Fasilitator',
            'program_ids' => [$this->programA->id, $this->programB->id],
            'phone' => '08123456789',
            'email' => 'ahmad@example.com',
            'address' => 'Jl. Pahlawan No. 12',
            'status' => true,
        ];

        $response = $this->actingAs($this->admin)->post(route('admin.fasilitators.store'), $payload);
        $response->assertRedirect(route('admin.fasilitators.index'));

        $this->assertDatabaseHas('fasilitators', [
            'name' => 'Ahmad Fasilitator',
            'email' => 'ahmad@example.com',
        ]);

        $fasilitator = Fasilitator::where('email', 'ahmad@example.com')->first();
        $this->assertCount(2, $fasilitator->programs);
    }

    public function test_admin_can_create_beneficiary_with_multiple_programs(): void
    {
        $fasilitator = Fasilitator::create([
            'name' => 'Fasilitator Utama',
            'status' => true,
        ]);

        $payload = [
            'name' => 'Budi Santoso',
            'nik' => '3512345678900001',
            'program_ids' => [$this->programA->id, $this->programB->id],
            'fasilitator_id' => $fasilitator->id,
            'phone' => '08987654321',
            'address' => 'Desa Binaan Mandiri',
            'status' => true,
            'notes' => 'Penerima modal bibit ternak',
        ];

        $response = $this->actingAs($this->admin)->post(route('admin.beneficiaries.store'), $payload);
        $response->assertRedirect(route('admin.beneficiaries.index'));

        $this->assertDatabaseHas('beneficiaries', [
            'name' => 'Budi Santoso',
            'nik' => '3512345678900001',
            'fasilitator_id' => $fasilitator->id,
        ]);

        $beneficiary = Beneficiary::where('nik', '3512345678900001')->first();
        $this->assertCount(2, $beneficiary->programs);
    }
}
