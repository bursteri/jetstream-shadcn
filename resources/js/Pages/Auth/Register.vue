<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import InputError from '@/Components/InputError.vue';
import Socialstream from '@/Components/Socialstream.vue';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: true,
});

const submit = () => {
    form.password_confirmation = form.password;
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Register" />

    <AuthenticationCard Title="Create an account" Description="Enter your information below to create your account">
        <form @submit.prevent="submit" class="grid gap-4">
            <div class="grid gap-2">
                <Label for="name">Name</Label>
                <Input id="name" v-model="form.name" type="text" placeholder="John Doe" autocomplete="name" required autofocus />
                <InputError :message="form.errors.name" />
            </div>

            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input id="email" v-model="form.email" type="email" placeholder="m@example.com" autocomplete="username" required />
                <InputError :message="form.errors.email" />
            </div>

            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input id="password" v-model="form.password" type="password" autocomplete="new-password" required />
                <InputError :message="form.errors.password" />
            </div>

            <Button type="submit" class="w-full" :disabled="form.processing" :class="{ 'opacity-50': form.processing }">
                {{ form.processing ? 'Creating account...' : 'Create account' }}
            </Button>
        </form>

        <Socialstream
            v-if="$page.props.socialstream?.show && $page.props.socialstream?.providers?.length"
            :error="$page.props?.errors?.socialstream || undefined"
            :prompt="$page.props.socialstream?.prompt || 'Or Login Via'"
            :labels="$page.props.socialstream?.labels || {}"
            :providers="$page.props.socialstream?.providers || []"
        />

        <div class="mt-4 text-center text-sm">
            Already have an account?
            <Link :href="route('login')" class="underline">Sign in</Link>
        </div>

        <template #footer>
            <div
                class="text-muted-foreground [&_a]:hover:text-primary mt-8 max-w-xs text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4"
            >
                By clicking continue, you agree to our <a :href="route('terms.show')">Terms of Service</a> and
                <a :href="route('policy.show')">Privacy Policy</a>.
            </div>
        </template>
    </AuthenticationCard>
</template>
