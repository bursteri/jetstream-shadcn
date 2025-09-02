<script setup lang="ts">
import SidebarLayout from '@/Layouts/SidebarLayout.vue';
</script>

<template>
    <SidebarLayout 
        title="Dashboard"
        :breadcrumbs="[
            { label: 'Dashboard', current: true }
        ]"
    >
        <div class="flex flex-1 flex-col gap-4 p-4">
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="aspect-video rounded-xl border border-zinc-900/5 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/50" />
                <div class="aspect-video rounded-xl border border-zinc-900/5 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/50" />
                <div class="aspect-video rounded-xl border border-zinc-900/5 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/50" />
            </div>
            <div
                class="min-h-[100vh] flex-1 rounded-xl border border-zinc-900/5 bg-zinc-50 md:min-h-min dark:border-zinc-900 dark:bg-zinc-900/50"
            />
        </div>
    </SidebarLayout>
</template>
