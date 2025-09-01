<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import { Checkbox } from '@/Components/ui/checkbox';
import InputError from '@/Components/InputError.vue';
import Socialstream from '@/Components/Socialstream.vue';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: true,
});

const submit = () => {
    form.transform((data) => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in" />

    <AuthenticationCard Title="Log in to your account" Description="Enter your email and password below to log in">
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
                />
                <InputError :message="form.errors.email" />
            </div>
            <div class="grid gap-2">
                <div class="flex items-center">
                    <Label for="password">Password</Label>
                    <Link 
                        v-if="canResetPassword"
                        :href="route('password.request')" 
                        class="ml-auto inline-block text-sm underline"
                    > 
                        Forgot your password? 
                    </Link>
                </div>
                <Input 
                    id="password" 
                    v-model="form.password"
                    type="password" 
                    autocomplete="current-password"
                    required 
                />
                <InputError :message="form.errors.password" />
            </div>
            <div class="flex items-center">
                <Checkbox 
                    id="remember"
                    v-model:checked="form.remember"
                />
                <Label for="remember" class="ml-2 text-sm">Remember me</Label>
            </div>
            <Button 
                type="submit" 
                class="w-full"
                :disabled="form.processing"
                :class="{ 'opacity-50': form.processing }"
            > 
                {{ form.processing ? 'Logging in...' : 'Login' }}
            </Button>
        </form>
        <div class="mt-4 text-center text-sm">
            Don't have an account?
            <Link href="/register" class="underline"> Sign up </Link>
        </div>

        <Socialstream
            v-if="$page.props.socialstream.show && $page.props.socialstream.providers.length"
            :error="$page.props?.errors?.socialstream || null"
            :prompt="$page.props.socialstream.prompt"
            :labels="$page.props.socialstream.labels"
            :providers="$page.props.socialstream.providers"
        />
    </AuthenticationCard>
</template>
