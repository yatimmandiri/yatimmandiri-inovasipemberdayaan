<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSponsorshipInquiryRequest;
use App\Http\Requests\UpdateSponsorshipInquiryRequest;
use App\Models\SponsorshipInquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SponsorshipInquiryController extends Controller
{
    use LogActivity;

    public function index()
    {
        $this->authorize('viewAny', SponsorshipInquiry::class);

        return Inertia::render('admin/sponsorship-inquiries/list', [
            'statuses' => $this->statuses(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', SponsorshipInquiry::class);

        return Inertia::render('admin/sponsorship-inquiries/create', [
            'statuses' => $this->statuses(),
        ]);
    }

    public function store(StoreSponsorshipInquiryRequest $request)
    {
        $this->authorize('create', SponsorshipInquiry::class);

        $inquiry = SponsorshipInquiry::create([
            ...$request->validated(),
            'status' => $request->validated('status') ?: 'new',
        ]);

        $this->logSuccess('create-sponsorship-inquiry', "Created Sponsorship Inquiry: {$inquiry->organization_name}", [
            'sponsorship_inquiry_id' => $inquiry->id,
            'new_data' => $inquiry->toArray(),
        ]);

        return redirect()->route('admin.sponsorship-inquiries.index')->with('success', 'Sponsorship Inquiry Created Successfully');
    }

    public function show(SponsorshipInquiry $sponsorshipInquiry)
    {
        $this->authorize('view', $sponsorshipInquiry);

        return Inertia::render('admin/sponsorship-inquiries/show', [
            'inquiry' => $sponsorshipInquiry,
            'statuses' => $this->statuses(),
        ]);
    }

    public function edit(SponsorshipInquiry $sponsorshipInquiry)
    {
        $this->authorize('update', $sponsorshipInquiry);

        return Inertia::render('admin/sponsorship-inquiries/edit', [
            'inquiry' => $sponsorshipInquiry,
            'statuses' => $this->statuses(),
        ]);
    }

    public function update(UpdateSponsorshipInquiryRequest $request, SponsorshipInquiry $sponsorshipInquiry)
    {
        $this->authorize('update', $sponsorshipInquiry);

        $oldData = $sponsorshipInquiry->replicate();

        $sponsorshipInquiry->update([
            ...$request->validated(),
            'status' => $request->validated('status') ?: 'new',
        ]);

        $this->logSuccess('update-sponsorship-inquiry', "Updated Sponsorship Inquiry: {$sponsorshipInquiry->organization_name}", [
            'sponsorship_inquiry_id' => $sponsorshipInquiry->id,
            'old_data' => $oldData->toArray(),
            'new_data' => $sponsorshipInquiry->toArray(),
        ]);

        return redirect()->route('admin.sponsorship-inquiries.index')->with('success', 'Sponsorship Inquiry Updated Successfully');
    }

    public function destroy(SponsorshipInquiry $sponsorshipInquiry)
    {
        $this->authorize('delete', $sponsorshipInquiry);

        $sponsorshipInquiry->delete();

        $this->logSuccess('delete-sponsorship-inquiry', "Deleted Sponsorship Inquiry: {$sponsorshipInquiry->organization_name}", [
            'sponsorship_inquiry_id' => $sponsorshipInquiry->id,
        ]);

        return redirect()->route('admin.sponsorship-inquiries.index')->with('success', 'Sponsorship Inquiry Deleted Successfully');
    }

    public function status(Request $request, SponsorshipInquiry $sponsorshipInquiry)
    {
        $this->authorize('update', $sponsorshipInquiry);

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:new,contacted,in_review,approved,rejected'],
        ]);

        $sponsorshipInquiry->update($validated);

        return redirect()->route('admin.sponsorship-inquiries.index')->with('success', 'Sponsorship Inquiry Status Updated Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data', SponsorshipInquiry::class);

        $page = (int) $request->input('page', 1);
        $perPage = (int) $request->input('perPage', 10);
        $search = $request->input('search');
        $status = $request->input('status');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');
        $allowedSorts = ['id', 'contact_name', 'organization_name', 'collaboration_type', 'support_type', 'status', 'created_at', 'updated_at'];

        $query = SponsorshipInquiry::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('contact_name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('organization_name', 'like', "%{$search}%")
                        ->orWhere('collaboration_type', 'like', "%{$search}%")
                        ->orWhere('support_type', 'like', "%{$search}%");
                });
            })
            ->when($status, fn ($query, $status) => $query->where('status', $status))
            ->orderBy(in_array($orderBy, $allowedSorts, true) ? $orderBy : 'id', $orderDirection === 'asc' ? 'asc' : 'desc');

        $data = $perPage > 0
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }

    private function statuses(): array
    {
        return [
            ['value' => 'new', 'label' => 'New'],
            ['value' => 'contacted', 'label' => 'Contacted'],
            ['value' => 'in_review', 'label' => 'In Review'],
            ['value' => 'approved', 'label' => 'Approved'],
            ['value' => 'rejected', 'label' => 'Rejected'],
        ];
    }
}
