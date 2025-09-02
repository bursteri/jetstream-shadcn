<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import InputError from '@/Components/InputError.vue';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

interface Props {
    status?: string;
}

defineProps<Props>();

const form = useForm({
    email: '',
});

const submit = (): void => {
    form.post(route('password.email'));
};
</script>

<template>
    <Head title="Forgot Password" />

    <AuthenticationCard Title="Forgot your password?" Description="No problem. Just let us know your email address and we will email you a password reset link.">
        <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="grid gap-4">
            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    autofocus
                    autocomplete="username"
                />
                <InputError :message="form.errors.email" />
            </div>

            <Button 
                type="submit"
                class="w-full"
                :disabled="form.processing"
                :class="{ 'opacity-50': form.processing }"
            >
                {{ form.processing ? 'Sending...' : 'Email Password Reset Link' }}
            </Button>
        </form>

        <div class="mt-4 text-center text-sm">
            Remember your password?
            <Link :href="route('login')" class="underline">Sign in</Link>
        </div>
    </AuthenticationCard>
</template>
