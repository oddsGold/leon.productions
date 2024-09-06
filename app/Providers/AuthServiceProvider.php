<?php

namespace App\Providers;

use App\Contracts\Admin\Auth\Token\Access;
use App\Contracts\Admin\Auth\Token\Refresh;
use App\Extensions\AdminProvider;
use App\Extensions\JwtGuard;
use App\Models\User;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [

        'App\Models\About' => \App\Policies\AboutPolicy::class,
        'App\Models\Contact' => \App\Policies\ContactPolicy::class,
        'App\Models\Footer' => \App\Policies\FooterPolicy::class,
        \App\Models\VideoCase::class => \App\Policies\CasePolicy::class,
        \App\Models\User::class => \App\Policies\UserPolicy::class,

    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::provider('admin', function($app){
            return new AdminProvider(
                $app[HasherContract::class],
                User::class
            );
        });

        Auth::extend('jwt', function ($app, $name, array $config) {
            return new JwtGuard(
                Auth::createUserProvider($config['provider']),
                $app['request'],
                $app[Access::class],
                $app[Refresh::class],
                JwtGuard::parseType($name)
            );
        });
    }
}
