<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';

import { Button } from '@/Components/ui/button';

interface Props {
    status?: string;
}

const props = defineProps<Props>();

const form = useForm({});

const submit = (): void => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <Head title="Email Verification" />

    <AuthenticationCard Title="Verify your email" Description="Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.">
        <div v-if="verificationLinkSent" class="mb-4 text-sm font-medium text-green-600">
            A new verification link has been sent to the email address you provided in your profile settings.
        </div>

        <form @submit.prevent="submit" class="grid gap-4">
            <Button 
                type="submit"
                class="w-full"
                :disabled="form.processing"
                :class="{ 'opacity-50': form.processing }"
            >
                {{ form.processing ? 'Sending...' : 'Resend Verification Email' }}
            </Button>

            <div class="flex items-center justify-center gap-2 text-sm">
                <Link
                    :href="route('profile.show')"
                    class="underline hover:no-underline"
                >
                    Edit Profile
                </Link>
                <span class="text-muted-foreground">or</span>
                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="underline hover:no-underline"
                >
                    Log Out
                </Link>
            </div>
        </form>
    </AuthenticationCard>
</template>
