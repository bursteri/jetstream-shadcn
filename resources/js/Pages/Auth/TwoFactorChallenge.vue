<script setup>
import { nextTick, ref } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import InputError from '@/Components/InputError.vue';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const recovery = ref(false);

const form = useForm({
    code: '',
    recovery_code: '',
});

const recoveryCodeInput = ref(null);
const codeInput = ref(null);

const toggleRecovery = async () => {
    recovery.value ^= true;

    await nextTick();

    if (recovery.value) {
        recoveryCodeInput.value.focus();
        form.code = '';
    } else {
        codeInput.value.focus();
        form.recovery_code = '';
    }
};

const submit = () => {
    form.post(route('two-factor.login'));
};
</script>

<template>
    <Head title="Two-factor Confirmation" />

    <AuthenticationCard 
        :Title="recovery ? 'Two-factor recovery' : 'Two-factor authentication'"
        :Description="recovery ? 'Please confirm access to your account by entering one of your emergency recovery codes.' : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'"
    >
        <form @submit.prevent="submit" class="grid gap-4">
            <div v-if="!recovery" class="grid gap-2">
                <Label for="code">Authentication Code</Label>
                <Input
                    id="code"
                    ref="codeInput"
                    v-model="form.code"
                    type="text"
                    inputmode="numeric"
                    placeholder="000000"
                    autofocus
                    autocomplete="one-time-code"
                />
                <InputError :message="form.errors.code" />
            </div>

            <div v-else class="grid gap-2">
                <Label for="recovery_code">Recovery Code</Label>
                <Input
                    id="recovery_code"
                    ref="recoveryCodeInput"
                    v-model="form.recovery_code"
                    type="text"
                    placeholder="xxxxx-xxxxx"
                    autocomplete="one-time-code"
                />
                <InputError :message="form.errors.recovery_code" />
            </div>

            <Button 
                type="submit"
                class="w-full"
                :disabled="form.processing"
                :class="{ 'opacity-50': form.processing }"
            >
                {{ form.processing ? 'Verifying...' : 'Log in' }}
            </Button>

            <button 
                type="button" 
                class="text-sm text-center underline hover:no-underline" 
                @click.prevent="toggleRecovery"
            >
                {{ recovery ? 'Use an authentication code' : 'Use a recovery code' }}
            </button>
        </form>
    </AuthenticationCard>
</template>
