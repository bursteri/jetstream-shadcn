<script setup lang="ts">
import SidebarLayout from '@/Layouts/SidebarLayout.vue';
import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm.vue';
</script>

<template>
    <SidebarLayout 
        title="Create Team"
        :breadcrumbs="[
            { label: 'Teams', href: '#' },
            { label: 'Create Team', current: true }
        ]"
    >
        <div class="p-4">
            <div class="max-w-7xl mx-auto">
                <CreateTeamForm />
            </div>
        </div>
    </SidebarLayout>
</template>
