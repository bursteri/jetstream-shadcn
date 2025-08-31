<script setup>
import { ref } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import InputError from '@/Components/InputError.vue';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const form = useForm({
    password: '',
});

const passwordInput = ref(null);

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();

            passwordInput.value.focus();
        },
    });
};
</script>

<template>
    <Head title="Secure Area" />

    <AuthenticationCard Title="Confirm Password" Description="This is a secure area of the application. Please confirm your password before continuing.">
        <form @submit.prevent="submit" class="grid gap-4">
            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    required
                    autocomplete="current-password"
                    autofocus
                />
                <InputError :message="form.errors.password" />
            </div>

            <Button 
                type="submit"
                class="w-full"
                :disabled="form.processing"
                :class="{ 'opacity-50': form.processing }"
            >
                {{ form.processing ? 'Confirming...' : 'Confirm' }}
            </Button>
        </form>
    </AuthenticationCard>
</template>
