<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreProductRequest;
use App\Http\Requests\Company\UpdateProductRequest;
use App\Models\Company\Product;
use App\Models\Company\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Product::class);

        $data = [];

        return Inertia::render('admin/company/products/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Product::class);

        $programs = Program::query()->select(['id', 'name'])->get();

        $data = [
            'programs' => $programs,
        ];

        return Inertia::render('admin/company/products/create', $data);
    }

    /**
     * Store a newly Created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $this->authorize('create', Product::class);

        $data = [
            'name' => $request->name,
            'link' => $request->link,
            'description' => $request->description,
            'price' => $request->price,
            'program_id' => $request->program_id,
        ];

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $this->uploadFile(null, $request->file('featured_image'), 'uploads/product');
        }

        $product = Product::create($data);

        if ($product) {
            $this->logSuccess('create-product', "Created Product: {$product->name}", [
                'product_id' => $product->id,
                'new_data' => $product->toArray(),
            ]);
        } else {
            $this->logError('create-product', "Failed to create Product: {$product->name}", [
                'product_id' => $product->id,
                'new_data' => $product->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.products.index')->with('success', 'Product Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $this->authorize('view', $product);

        $data = [
            'product' => $product,
        ];

        return Inertia::render('admin/company/products/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $this->authorize('update', $product);

        $programs = Program::query()->select(['id', 'name'])->get();

        $data = [
            'product' => $product,
            'programs' => $programs,
        ];

        return Inertia::render('admin/company/products/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);

        $data = $request->only(['name', 'link', 'description', 'price', 'program_id']);

        $oldData = $product->replicate();

        if ($request->hasFile('featured_image')) {
            $this->deleteFile($oldData->featured_image);

            $data['featured_image'] = $this->uploadFile($product->featured_image, $request->file('featured_image'), 'uploads/product');
        }

        $product->update($data);

        if ($product) {
            $this->logSuccess('update-product', "Update Product: {$product->name}", [
                'product_id' => $product->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $product->toArray(),
            ]);
        } else {
            $this->logError('update-product', "Failed to update Product: {$product->name}", [
                'product_id' => $product->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $product->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.products.index')->with('success', 'Product Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);

        $product->delete();

        if ($product) {
            $this->logSuccess('delete-product', "Delete Product: {$product->name}", ['Product_id' => $product->id]);
        } else {
            $this->logError('delete-product', "Failed to delete Product: {$product->name}", ['Product_id' => $product->id]);
        }

        return redirect()->route('admin.companies.products.index')->with('success', 'Product Deleted Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-product', Product::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');
        $filterValue = $request->input('filterValue', []);

        $query = Product::query()
            ->with(['program'])
            ->latest()
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
