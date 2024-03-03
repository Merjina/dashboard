<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class CategoryPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function show(User $user, Category $category): bool
    {
        return $user->business_id == $category->business_id;
    }

    /**
     * Determine whether the user can store a new model.
     */
    public function store(User $user, Category $category): bool
    {
        return $user->business_id == $category->business_id
            && ($user->id == $category->createdBy_id || in_array($user->role, ['Owner', 'Maintainer']));
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Category $category): bool
    {
        return $user->business_id == $category->business_id
            && ($user->id == $category->createdBy_id || in_array($user->role, ['Owner', 'Maintainer']));
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function destroy(User $user, Category $category): bool
    {
        if (
            $user->business_id == $category->business_id
            && ($user->id == $category->createdBy_id || in_array($user->role, ['Owner', 'Maintainer']))
        ) {
            $count = $category->products()->count(); // Use the correct relationship method
    
            if ($count != 0) {
                throw ValidationException::withMessages(['serverError' => 'This category ('.$category->name.') is used by ' .$count. ' related products. Please make sure no product is using this category before deleting.']);
            }
    
            return true;
        } else {
            return false;
        }
    }
    
}
