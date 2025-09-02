<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

defineProps({
    policy: String,
});
</script>

<template>
    <Head title="Privacy Policy" />

    <div class="font-sans text-zinc-900 antialiased dark:text-zinc-100">
        <div class="bg-zinc-100 pt-4 dark:bg-zinc-900">
            <div class="flex min-h-screen flex-col items-center pt-6 sm:pt-0">
                <div
                    class="prose dark:prose-invert mt-6 w-full overflow-hidden bg-white p-6 shadow-md sm:max-w-2xl sm:rounded-lg dark:bg-zinc-800"
                    v-html="policy"
                />
            </div>
        </div>
    </div>
</template>
