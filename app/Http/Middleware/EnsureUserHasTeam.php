<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasTeam
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Allow unauthenticated users to proceed (other middleware will handle auth)
        if (! $user) {
            return $next($request);
        }

        $allTeams = $user->allTeams();

        // If user has no teams at all, redirect to team setup
        if ($allTeams->isEmpty()) {
            // Allow access to onboarding routes and team creation
            if ($request->routeIs('onboarding.*') || 
                $request->routeIs('teams.store')) {
                return $next($request);
            }

            return redirect()->route('onboarding.team-setup');
        }

        // Always ensure user has a current team set
        if (! $user->currentTeam || ! $user->current_team_id) {
            $this->setCurrentTeam($user);
        }

        return $next($request);
    }

    protected function setCurrentTeam(User $user): void
    {
        $user->switchTeam($user->allTeams()->first());
    }
}
