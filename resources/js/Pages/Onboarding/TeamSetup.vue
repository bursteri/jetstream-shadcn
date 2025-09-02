<script setup lang="ts">
import { Head, useForm, router } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import InputError from '@/Components/InputError.vue';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

interface TeamInvitation {
    id: number;
    team_name: string;
    owner_name: string;
    role: string;
}

defineProps<{
    pendingInvitations?: TeamInvitation[];
}>();

const form = useForm({
    name: '',
});

const submit = () => {
    form.post(route('teams.store'), {
        errorBag: 'createTeam',
        preserveScroll: true,
    });
};

const acceptInvitation = (invitationId: number) => {
    router.post(route('onboarding.invitations.accept', { invitation: invitationId }));
};

const rejectInvitation = (invitationId: number) => {
    router.delete(route('onboarding.invitations.reject', { invitation: invitationId }));
};
</script>

<template>
    <Head title="Team Setup" />

    <!-- Show invitations as separate cards -->
    <div v-if="pendingInvitations && pendingInvitations.length > 0">
        <AuthenticationCard
            v-for="(invitation, index) in pendingInvitations"
            :key="invitation.id"
            :Title="`${invitation.owner_name} invited you to join ${invitation.team_name}`"
            :Description="`By accepting this invitation, you'll be able to collaborate with all team members`"
            :class="{ 'mb-6': index < pendingInvitations.length - 1 }"
        >
            <div class="flex gap-3">
                <Button @click="rejectInvitation(invitation.id)" variant="danger" class="flex-1"> Decline </Button>
                <Button @click="acceptInvitation(invitation.id)" class="flex-1"> Join {{ invitation.team_name }} </Button>
            </div>
        </AuthenticationCard>
    </div>

    <!-- Create Team Form - Only show when no pending invitations -->
    <AuthenticationCard
        v-if="!pendingInvitations || pendingInvitations.length === 0"
        Title="Create your first team"
        Description="You need at least one team to get started"
    >
        <form @submit.prevent="submit" class="grid gap-4">
            <div class="grid gap-2">
                <Label for="name">Team name</Label>
                <Input id="name" v-model="form.name" type="text" placeholder="Acme Inc." required autofocus />
                <InputError :message="form.errors.name" />
            </div>

            <Button type="submit" class="w-full" :disabled="form.processing" :class="{ 'opacity-50': form.processing }">
                {{ form.processing ? 'Creating team...' : 'Create Team' }}
            </Button>
        </form>
    </AuthenticationCard>
</template>
