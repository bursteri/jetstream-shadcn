<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Ssr\Gateway;
use Inertia\Ssr\HttpGateway;
use Inertia\Ssr\Response;

class InertiaSSRServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(Gateway::class, function ($app) {
            return new class extends HttpGateway {
                public function dispatch(array $page): ?Response
                {
                    // Check if SSR is enabled for this request
                    if (!request()->attributes->get('ssr_enabled', false)) {
                        return null;
                    }
                    
                    // Check if SSR is globally enabled
                    if (!config('inertia.ssr.enabled', true)) {
                        return null;
                    }
                    
                    return parent::dispatch($page);
                }
            };
        });
    }
}