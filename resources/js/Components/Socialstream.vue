<script setup>
import InputError from '@/Components/InputError.vue';
import ProviderIcon from '@/Components/SocialstreamIcons/ProviderIcon.vue';

defineProps({
    prompt: {
        type: String,
        default: 'Or Login Via',
    },
    error: {
        type: String,
        default: null,
    },
    providers: {
        type: Array,
    },
    labels: {
        type: Object,
    },
});
</script>

<template>
    <div v-if="providers.length" class="mt-6 mb-2 space-y-6">
        <div class="relative flex items-center">
            <div class="grow border-t border-gray-400 dark:border-gray-500"></div>
            <span class="shrink px-6 text-gray-400 dark:text-gray-500">
                {{ prompt }}
            </span>
            <div class="grow border-t border-gray-400 dark:border-gray-500"></div>
        </div>

        <InputError v-if="error" :message="error" class="text-center" />

        <div class="grid gap-4">
            <a
                v-for="provider in providers"
                :key="provider.id"
                class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-400 py-2.5 text-center text-sm font-normal shadow-sm transition duration-200 hover:shadow-md"
                :href="route('oauth.redirect', provider.id)"
            >
                <ProviderIcon :provider="provider" classes="h-6 w-6 mx-2" />
                <span class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ provider.buttonLabel || provider.name }}</span>
            </a>
        </div>
    </div>
</template>
