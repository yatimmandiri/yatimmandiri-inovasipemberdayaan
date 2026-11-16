<?php

use App\Models\Company\Category;
use App\Models\Company\Testimonial;
use App\Models\Core\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;

uses(RefreshDatabase::class);

beforeEach(function () {
    Permission::firstOrCreate(['name' => 'create-testimonial', 'guard_name' => 'web']);
    Permission::firstOrCreate(['name' => 'update-testimonial', 'guard_name' => 'web']);

    $this->user = User::factory()->create();
    $this->user->givePermissionTo(['create-testimonial', 'update-testimonial']);
    $this->actingAs($this->user);

    $this->category = Category::query()->create([
        'name' => 'Form Yatim',
        'slug' => 'form-yatim',
    ]);
});

test('admin can store a testimonial with categories_id mapped to category_id', function () {
    $response = $this->post(route('admin.companies.testimonials.store'), [
        'name' => 'Budi Santoso',
        'position' => 'Alumni Binaan',
        'description' => 'Program yatim mandiri membantu saya bersekolah.',
        'categories_id' => $this->category->id,
    ]);

    $response->assertRedirect(route('admin.companies.testimonials.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('testimonials', [
        'name' => 'Budi Santoso',
        'position' => 'Alumni Binaan',
        'category_id' => $this->category->id,
    ]);
});

test('admin can update a testimonial without writing a missing categories_id column', function () {
    $testimonial = Testimonial::query()->create([
        'name' => 'Siti Aminah',
        'position' => 'Penerima Beasiswa',
        'description' => 'Terima kasih atas programnya.',
        'category_id' => $this->category->id,
    ]);

    $newCategory = Category::query()->create([
        'name' => 'Form Dewan',
        'slug' => 'form-dewan',
    ]);

    $response = $this->put(route('admin.companies.testimonials.update', $testimonial), [
        'name' => 'Siti Aminah',
        'position' => 'Alumni Beasiswa',
        'description' => 'Aktivitas binaan sangat bermanfaat.',
        'categories_id' => $newCategory->id,
    ]);

    $response->assertRedirect(route('admin.companies.testimonials.index'));

    $testimonial->refresh();

    expect($testimonial->position)->toBe('Alumni Beasiswa')
        ->and($testimonial->category_id)->toBe($newCategory->id);
});
