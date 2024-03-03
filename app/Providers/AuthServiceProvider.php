<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Bill;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Category;
use App\Policies\CategoryPolicy;
use App\Policies\BillPolicy;
use App\Policies\ProductPolicy;
use App\Policies\TransactionPolicy;
use App\Policies\UserPolicy;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Product::class => ProductPolicy::class,
        Bill::class => BillPolicy::class,
        Transaction::class => TransactionPolicy::class,
        User::class => UserPolicy::class,
        Category::class => CategoryPolicy::class,
  
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (User $user, string $url) {
            return (new MailMessage)
                ->subject('Verify Email Address')
                ->greeting('Hello **' . $user->name . '** 👋')
                ->line('Please verify that your email address is **' . $user->email . '**, and that you entered it when signing up for **Laptop POS**.')
                ->action('Verify Email Address', $url)
                ->line(Lang::get('If you did not create an account, no further action is required.'));
        });


    }
}
