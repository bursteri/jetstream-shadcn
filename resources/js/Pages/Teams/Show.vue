<script setup lang="ts">
import SidebarLayout from '@/Layouts/SidebarLayout.vue';
import DeleteTeamForm from '@/Pages/Teams/Partials/DeleteTeamForm.vue';
import SectionBorder from '@/Components/SectionBorder.vue';
import TeamMemberManager from '@/Pages/Teams/Partials/TeamMemberManager.vue';
import UpdateTeamNameForm from '@/Pages/Teams/Partials/UpdateTeamNameForm.vue';

interface User {
    id: number;
    name: string;
    email: string;
    profile_photo_url: string;
    membership: {
        role: string;
    };
}

interface TeamInvitation {
    id: number;
    email: string;
}

interface Team {
    id: number;
    name: string;
    personal_team: boolean;
    owner: {
        name: string;
        email: string;
        profile_photo_url: string;
    };
    users: User[];
    team_invitations: TeamInvitation[];
}

interface Role {
    key: string;
    name: string;
    description: string;
    permissions: string[];
}

interface Permissions {
    canAddTeamMembers: boolean;
    canDeleteTeam: boolean;
    canRemoveTeamMembers: boolean;
    canUpdateTeam: boolean;
    canUpdateTeamMembers: boolean;
}

defineProps<{
    team: Team;
    availableRoles: Role[];
    permissions: Permissions;
}>();
</script>

<template>
    <SidebarLayout 
        title="Team Settings"
        :breadcrumbs="[
            { label: 'Teams', href: '#' },
            { label: team.name, href: '#' },
            { label: 'Settings', current: true }
        ]"
    >
        <div class="p-4">
            <div class="max-w-7xl mx-auto">
                <UpdateTeamNameForm :team="team" :permissions="permissions" />

                <TeamMemberManager
                    class="mt-10 sm:mt-0"
                    :team="team"
                    :available-roles="availableRoles"
                    :user-permissions="permissions"
                />

                <template v-if="permissions.canDeleteTeam && ! team.personal_team">
                    <SectionBorder />

                    <DeleteTeamForm class="mt-10 sm:mt-0" :team="team" />
                </template>
            </div>
        </div>
    </SidebarLayout>
</template>
