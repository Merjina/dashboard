<?php

namespace App\Models;

use App\Models\Bill;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail, CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable, HasUlids, \Illuminate\Auth\Passwords\CanResetPassword, SoftDeletes;

    /**
     * Owner: have all privileges on his business.
     * Maintainer: have all privileges but can't change business information or business's accounts.
     * Cashier: can add new checkout, and update/delete bills created by himself.
     */
    public static $ROLES = ['Owner', 'Maintainer', 'Cashier'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'taxPercent' => 'float',
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function bills(): HasMany
    {
        return $this->hasMany(Bill::class, 'createdBy_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'createdBy_id');
    }
    
    public function categories(): HasMany
    {
        return $this->hasMany(Category::class, 'createdBy_id');
    }
}