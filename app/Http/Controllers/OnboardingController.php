<?php

namespace App\Http\Controllers;

use App\Models\TeamInvitation;
use Illuminate\Http\Request;
use Laravel\Jetstream\Http\Controllers\Inertia\TeamController as JetstreamTeamController;

class OnboardingController extends JetstreamTeamController
{
    /**
     * Show the team setup page for onboarding.
     */
    public function showTeamSetup(Request $request)
    {
        $user = $request->user();
        
        // Get pending invitations for this user's email
        $pendingInvitations = TeamInvitation::where('email', $user->email)
            ->with(['team', 'team.owner'])
            ->get()
            ->map(function ($invitation) {
                return [
                    'id' => $invitation->id,
                    'team_name' => $invitation->team ? $invitation->team->name : 'Unknown Team',
                    'owner_name' => $invitation->team && $invitation->team->owner ? $invitation->team->owner->name : 'Unknown',
                    'role' => $invitation->role,
                ];
            });

        return inertia('Onboarding/TeamSetup', [
            'pendingInvitations' => $pendingInvitations,
        ]);
    }

    /**
     * Accept a team invitation during onboarding.
     */
    public function acceptInvitation(Request $request, $invitationId)
    {
        $invitation = TeamInvitation::where('id', $invitationId)
            ->where('email', $request->user()->email)
            ->first();

        if (!$invitation) {
            return redirect()->route('onboarding.team-setup');
        }

        // Add user to the team
        $invitation->team->users()->attach(
            $request->user(),
            ['role' => $invitation->role]
        );

        // Set as current team if user has no current team
        if (!$request->user()->currentTeam) {
            $request->user()->switchTeam($invitation->team);
        }

        // Store team name before deleting invitation
        $teamName = $invitation->team->name;
        
        // Delete the invitation
        $invitation->delete();

        return redirect()->route('dashboard')->with('success', 
            "Great! You have accepted the invitation to join the {$teamName} team."
        );
    }

    /**
     * Reject a team invitation during onboarding.
     */
    public function rejectInvitation(Request $request, $invitationId)
    {
        $invitation = TeamInvitation::where('id', $invitationId)
            ->where('email', $request->user()->email)
            ->first();

        if ($invitation) {
            $invitation->delete();
        }

        return redirect()->route('onboarding.team-setup');
    }
}