<?php

namespace App\Providers;

use App\Events\ForgotTFACode;
use App\Events\HappenedException;
use App\Listeners\SendErrorExceptionNotification;
use App\Listeners\SendHttpExceptionNotification;
use App\Listeners\SendTFACodeNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        ForgotTFACode::class => [ SendTFACodeNotification::class],
        HappenedException::class => [
            SendHttpExceptionNotification::class,
            SendErrorExceptionNotification::class
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
