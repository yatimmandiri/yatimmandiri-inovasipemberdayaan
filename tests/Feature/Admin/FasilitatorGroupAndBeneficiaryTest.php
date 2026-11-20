<?php

namespace Tests\Feature\Admin;

use App\Models\Company\Beneficiary;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use App\Models\Company\Program;
use App\Models\Core\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class FasilitatorGroupAndBeneficiaryTest extends TestCase
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

    public function test_admin_can_access_group_index(): void
    {
        $response = $this->actingAs($this->admin)->get(route('admin.groups.index'));
        $response->assertStatus(200);
    }

    public function test_fasilitator_can_have_multiple_groups(): void
    {
        $fasilitator = Fasilitator::create([
            'name' => 'Fasilitator Binaan',
            'status' => true,
        ]);

        $group1 = Group::create([
            'name' => 'Kelompok Tani Berkah 1',
            'fasilitator_id' => $fasilitator->id,
            'program_id' => $this->programA->id,
            'status' => true,
        ]);

        $group2 = Group::create([
            'name' => 'Kelompok Tani Berkah 2',
            'fasilitator_id' => $fasilitator->id,
            'program_id' => $this->programB->id,
            'status' => true,
        ]);

        $this->assertCount(2, $fasilitator->groups);
        $this->assertEquals($fasilitator->id, $group1->fasilitator_id);
        $this->assertEquals($fasilitator->id, $group2->fasilitator_id);
    }

    public function test_admin_can_create_group(): void
    {
        $fasilitator = Fasilitator::create([
            'name' => 'Fasilitator Utama',
            'status' => true,
        ]);

        $payload = [
            'name' => 'Kelompok Sukses Makmur',
            'kantor_id' => 10,
            'kantor_name' => 'Cabang Surabaya',
            'fasilitator_id' => $fasilitator->id,
            'program_id' => $this->programA->id,
            'leader_name' => 'Pak Joko',
            'phone' => '081233445566',
            'address' => 'Dusun Sejahtera',
            'status' => true,
        ];

        $response = $this->actingAs($this->admin)->post(route('admin.groups.store'), $payload);
        $response->assertRedirect(route('admin.groups.index'));

        $this->assertDatabaseHas('groups', [
            'name' => 'Kelompok Sukses Makmur',
            'kantor_id' => 10,
            'kantor_name' => 'Cabang Surabaya',
            'fasilitator_id' => $fasilitator->id,
            'program_id' => $this->programA->id,
            'leader_name' => 'Pak Joko',
        ]);
    }
}
