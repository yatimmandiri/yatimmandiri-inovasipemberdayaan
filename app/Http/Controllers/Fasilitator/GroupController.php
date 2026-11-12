<?php

namespace App\Http\Controllers\Fasilitator;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Models\Company\Group;
use App\Models\Company\GroupPm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    use LogActivity;

    /**
     * Kelompok saya: info kelompok + daftar nama PM yang diisi fasilitator sendiri.
     */
    public function my()
    {
        $group = Group::query()
            ->ownedBy(auth()->id())
            ->with(['branch', 'pms'])
            ->first();

        if ($group === null) {
            return Inertia::render('fasilitator/group/my', [
                'group' => null,
                'pageTitle' => 'Kelompok Saya',
            ]);
        }

        return Inertia::render('fasilitator/group/my', [
            'group' => $group,
            'pageTitle' => 'Kelompok Saya',
        ]);
    }

    /**
     * Fasil menambah nama PM ke kelompoknya sendiri.
     */
    public function storePm(Request $request)
    {
        $group = Group::query()->ownedBy(auth()->id())->firstOrFail();

        $this->authorize('managePms', $group);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $pm = $group->pms()->firstOrCreate(['name' => $data['name']]);

        $this->logSuccess('update-group', "Added PM {$pm->name} to Group #{$group->id}", [
            'group_id' => $group->id,
            'group_pm_id' => $pm->id,
        ]);

        return back()->with('success', 'Nama PM Berhasil Ditambahkan');
    }

    /**
     * Fasil menghapus nama PM dari kelompoknya sendiri.
     */
    public function destroyPm(GroupPm $pm)
    {
        $group = $pm->group()->firstOrFail();

        $this->authorize('managePms', $group);

        $pm->delete();

        $this->logSuccess('update-group', "Removed PM {$pm->name} from Group #{$group->id}", [
            'group_id' => $group->id,
            'group_pm_id' => $pm->id,
        ]);

        return back()->with('success', 'Nama PM Berhasil Dihapus');
    }
}
