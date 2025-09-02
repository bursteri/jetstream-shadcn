<script setup lang="ts">
import ApiTokenManager from '@/Pages/API/Partials/ApiTokenManager.vue';
import SidebarLayout from '@/Layouts/SidebarLayout.vue';
import type { ApiToken } from '@/types';

defineProps<{
    tokens: ApiToken[];
    availablePermissions: string[];
    defaultPermissions: string[];
}>();
</script>

<template>
    <SidebarLayout 
        title="API Tokens"
        :breadcrumbs="[
            { label: 'Account', href: '#' },
            { label: 'API Tokens', current: true }
        ]"
    >
        <div class="p-4">
            <div class="max-w-7xl mx-auto">
                <ApiTokenManager
                    :tokens="tokens"
                    :available-permissions="availablePermissions"
                    :default-permissions="defaultPermissions"
                />
            </div>
        </div>
    </SidebarLayout>
</template>
