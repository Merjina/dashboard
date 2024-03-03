<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    protected function index(Request $request)
    {
        $categories = $request->user()->business->categories()->with([
            'createdBy' => function ($query) {
                $query->withTrashed();
            }
        ])->latest()->filter($request->only(['search']))
            ->paginate(15)->appends($request->all());

        return Inertia::render('Authenticated/Category/index', [
            'categories' => $categories,
            'filter' => $request->only(['search']),
        ]);
    }

    protected function show(Request $request, Category $category)
    {
        Gate::authorize('show', $category);

        return response()->json($category);
    }
    protected function store(StoreCategoryRequest $request)
    {
        $categoryData = $request->validated();
        $category = new Category($categoryData);
        $category->business_id = (int) $request->user()->business_id;
        $category->createdBy_id = $request->user()->id;
        Gate::authorize('store', $category);
        $category->save();
        return redirect()->back()->with('success', 'Successfully created');
    }

    protected function destroy(Category $category)
    {
        Gate::authorize('destroy', $category);

        $category->delete();
        return redirect()->back()->with('success', 'Successfully deleted');
    }

    protected function update(UpdateCategoryRequest $request, Category $category)
    {
        Gate::authorize('update', $category);

        $categoryData = $request->validated();
        $category->update($categoryData);

        return redirect()->back()->with('success', 'Successfully updated');
    }
}
