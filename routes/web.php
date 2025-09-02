<?php

use App\Http\Controllers\OnboardingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['ssr']);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
])->group(function () {
    // Onboarding routes (no team required)
    Route::get('/onboarding/team-setup', [OnboardingController::class, 'showTeamSetup'])
        ->name('onboarding.team-setup');
    Route::post('/onboarding/invitations/{invitation}/accept', [OnboardingController::class, 'acceptInvitation'])
        ->name('onboarding.invitations.accept');
    Route::delete('/onboarding/invitations/{invitation}/reject', [OnboardingController::class, 'rejectInvitation'])
        ->name('onboarding.invitations.reject');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'team',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
require __DIR__ . '/socialstream.php';
