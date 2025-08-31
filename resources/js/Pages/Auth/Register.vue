<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import Checkbox from '@/Components/Checkbox.vue';
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
    terms: false,
});

const submit = () => {
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
                <Input 
                    id="name" 
                    v-model="form.name"
                    type="text" 
                    placeholder="John Doe" 
                    autocomplete="name"
                    required 
                    autofocus
                />
                <InputError :message="form.errors.name" />
            </div>

            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input 
                    id="email" 
                    v-model="form.email"
                    type="email" 
                    placeholder="m@example.com" 
                    autocomplete="username"
                    required 
                />
                <InputError :message="form.errors.email" />
            </div>

            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input 
                    id="password" 
                    v-model="form.password"
                    type="password" 
                    autocomplete="new-password"
                    required 
                />
                <InputError :message="form.errors.password" />
            </div>

            <div class="grid gap-2">
                <Label for="password_confirmation">Confirm Password</Label>
                <Input 
                    id="password_confirmation" 
                    v-model="form.password_confirmation"
                    type="password" 
                    autocomplete="new-password"
                    required 
                />
                <InputError :message="form.errors.password_confirmation" />
            </div>

            <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="flex items-start space-x-2">
                <Checkbox 
                    id="terms" 
                    v-model:checked="form.terms" 
                    required 
                />
                <div class="grid gap-1.5 leading-none">
                    <Label for="terms" class="text-sm font-normal">
                        I agree to the
                        <a
                            :href="route('terms.show')"
                            class="font-medium underline underline-offset-2 hover:no-underline"
                            target="_blank"
                        >Terms of Service</a>
                        and
                        <a
                            :href="route('policy.show')"
                            class="font-medium underline underline-offset-2 hover:no-underline"
                            target="_blank"
                        >Privacy Policy</a>
                    </Label>
                    <InputError :message="form.errors.terms" />
                </div>
            </div>

            <Button 
                type="submit" 
                class="w-full"
                :disabled="form.processing"
                :class="{ 'opacity-50': form.processing }"
            > 
                {{ form.processing ? 'Creating account...' : 'Create account' }}
            </Button>
        </form>
        
        <div class="mt-4 text-center text-sm">
            Already have an account?
            <Link :href="route('login')" class="underline">Sign in</Link>
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
