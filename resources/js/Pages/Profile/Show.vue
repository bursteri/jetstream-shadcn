<script setup lang="ts">
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { PageProps } from '@inertiajs/core';
import SidebarLayout from '@/Layouts/SidebarLayout.vue';
import ConnectedAccountsForm from '@/Pages/Profile/Partials/ConnectedAccountsForm.vue';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm.vue';
import LogoutOtherBrowserSessionsForm from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue';
import SectionBorder from '@/Components/SectionBorder.vue';
import SetPasswordForm from '@/Pages/Profile/Partials/SetPasswordForm.vue';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm.vue';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm.vue';

interface Session {
    agent: {
        browser?: string;
        is_desktop: boolean;
        platform?: string;
    };
    ip_address: string;
    is_current_device: boolean;
    last_active: string;
}

interface Props {
    confirmsTwoFactorAuthentication?: boolean;
    sessions?: Session[];
    jetstream?: {
        canUpdateProfileInformation?: boolean;
        canUpdatePassword?: boolean;
        canManageTwoFactorAuthentication?: boolean;
        hasAccountDeletionFeatures?: boolean;
    };
    socialstream?: {
        show?: boolean;
        hasPassword?: boolean;
    };
    auth?: {
        user?: any;
    };
}

const props = defineProps<Props>();
const page = usePage<PageProps>();

const user = computed(() => props.auth?.user || page.props.value?.auth?.user);
</script>

<template>
    <SidebarLayout
        title="Profile"
        :breadcrumbs="[
            { label: 'Account', href: '#' },
            { label: 'Profile', current: true },
        ]"
    >
        <div class="p-4 bg-zinc-50/50">
            <div class="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
                <div v-if="props.jetstream?.canUpdateProfileInformation && user">
                    <UpdateProfileInformationForm :user="user" />

                    <SectionBorder />
                </div>

                <div v-if="props.jetstream?.canUpdatePassword && props.socialstream?.hasPassword">
                    <UpdatePasswordForm class="mt-10 sm:mt-0" />

                    <SectionBorder />
                </div>

                <div v-else>
                    <SetPasswordForm class="mt-10 sm:mt-0" />

                    <SectionBorder />
                </div>

                <div v-if="props.jetstream?.canManageTwoFactorAuthentication && props.socialstream?.hasPassword">
                    <TwoFactorAuthenticationForm :requires-confirmation="props.confirmsTwoFactorAuthentication" class="mt-10 sm:mt-0" />

                    <SectionBorder />
                </div>

                <div v-if="props.socialstream?.show">
                    <ConnectedAccountsForm class="mt-10 sm:mt-0" />
                </div>

                <div v-if="props.socialstream?.hasPassword">
                    <SectionBorder />

                    <LogoutOtherBrowserSessionsForm :sessions="props.sessions" class="mt-10 sm:mt-0" />
                </div>

                <template v-if="props.jetstream?.hasAccountDeletionFeatures && props.socialstream?.hasPassword">
                    <SectionBorder />

                    <DeleteUserForm class="mt-10 sm:mt-0" />
                </template>
            </div>
        </div>
    </SidebarLayout>
</template>
