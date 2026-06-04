<?php

use App\Models\Core\Permission;
use App\Models\Core\Role;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        collect([
            'view-video',
            'create-video',
            'update-video',
            'delete-video',
            'data-video',
        ])->each(function (string $name) {
            $permission = Permission::firstOrCreate([
                'name' => $name,
                'guard_name' => 'web',
            ]);

            Role::where('name', 'Administrators')->first()?->givePermissionTo($permission);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Permission::whereIn('name', [
            'view-video',
            'create-video',
            'update-video',
            'delete-video',
            'data-video',
        ])->delete();
    }
};
