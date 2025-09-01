<script setup>
import InputError from '@/Components/InputError.vue';
import ProviderIcon from '@/Components/SocialstreamIcons/ProviderIcon.vue';
import { Button } from '@/Components/ui/button';

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
        <div
            class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
        >
            <span class="bg-background text-muted-foreground relative z-10 px-2"> Or continue with </span>
        </div>
        <InputError v-if="error" :message="error" class="text-center" />

        <div class="grid gap-4">
            <Button
                v-for="provider in providers"
                :key="provider.id"
                variant="outline"
                :as-child="true"
                @click="window.location.href = route('oauth.redirect', provider.id)"
            >
                <div class="flex items-center">
                    <ProviderIcon :provider="provider" classes="h-6 w-6" />
                    <span class="text-sm font-medium">{{ provider.buttonLabel || provider.name }}</span>
                </div>
            </Button>
        </div>
    </div>
</template>
<!-- 
<script setup>
import InputError from '@/Components/InputError.vue';
import ProviderIcon from '@/Components/SocialstreamIcons/ProviderIcon.vue';
import { Button } from '@/Components/ui/button';

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
    <div v-if="providers.length" class="mt-4 space-y-6">
        <InputError v-if="error" :message="error" class="text-center" />

        <div class="grid gap-4">
            <Button
                v-for="provider in providers"
                :key="provider.id"
                variant="outline"
                :as-child="true"
                @click="window.location.href = route('oauth.redirect', provider.id)"
            >
                <div class="flex items-center">
                    <ProviderIcon :provider="provider" classes="h-6 w-6" />
                    <span class="text-sm font-medium">Continue with {{ provider.buttonLabel || provider.name }}</span>
                </div>
            </Button>
        </div>
    </div>
</template> -->
