<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        $permissions = [
            'view-sponsorship-inquiry',
            'create-sponsorship-inquiry',
            'update-sponsorship-inquiry',
            'delete-sponsorship-inquiry',
            'data-sponsorship-inquiry',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        Role::where('name', 'Administrators')
            ->first()
            ?->givePermissionTo($permissions);
    }

    public function down(): void
    {
        Permission::whereIn('name', [
            'view-sponsorship-inquiry',
            'create-sponsorship-inquiry',
            'update-sponsorship-inquiry',
            'delete-sponsorship-inquiry',
            'data-sponsorship-inquiry',
        ])->delete();
    }
};
