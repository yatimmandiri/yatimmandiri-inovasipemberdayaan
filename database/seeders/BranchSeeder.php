<?php

namespace Database\Seeders;

use App\Models\Company\Branch;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class BranchSeeder extends Seeder
{
    /**
     * Seed the branch offices from database/seeders/data/branch-offices.json.
     * Idempotent: updateOrCreate by id so JSON ids are preserved for stable FK references.
     */
    public function run(): void
    {
        $path = database_path('seeders/data/branch-offices.json');

        if (! File::exists($path)) {
            return;
        }

        $branches = json_decode(File::get($path), true);

        if (! is_array($branches)) {
            return;
        }

        foreach ($branches as $branch) {
            Branch::updateOrCreate(
                ['id' => $branch['id']],
                [
                    'name' => $branch['name'],
                    'label' => $branch['label'] ?? null,
                ]
            );
        }
    }
}
