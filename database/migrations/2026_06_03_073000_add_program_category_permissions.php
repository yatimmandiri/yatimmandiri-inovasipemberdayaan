<?php

use App\Models\Core\Permission;
use App\Models\Core\Role;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    public function up(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            'view-program-category',
            'create-program-category',
            'update-program-category',
            'delete-program-category',
            'data-program-category',
        ];

        $role = Role::where('name', 'Administrators')->first();

        foreach ($permissions as $permissionName) {
            $permission = Permission::firstOrCreate([
                'name' => $permissionName,
                'guard_name' => 'web',
            ]);

            $role?->givePermissionTo($permission);
        }
    }

    public function down(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        Permission::whereIn('name', [
            'view-program-category',
            'create-program-category',
            'update-program-category',
            'delete-program-category',
            'data-program-category',
        ])->delete();
    }
};
