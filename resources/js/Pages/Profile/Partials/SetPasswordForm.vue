<script setup lang="ts">
import {ref} from 'vue';
import {useForm} from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import { Button } from '@/Components/ui/button';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';

const passwordInput = ref<HTMLInputElement | null>(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const setPassword = () => {
    form.post(route('user-password.set'), {
        errorBag: 'setPassword',
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            toast.success('Password set successfully.');
        },
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value?.focus();
            }
        },
    });
};
</script>


<template>
    <FormSection @submitted="setPassword">
        <template #title>
            Set Password
        </template>

        <template #description>
            Ensure your account is using a long, random password to stay secure.
        </template>

        <template #form>
            <div class="col-span-6 sm:col-span-4">
                <Label for="password">New Password</Label>
                <Input
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    autocomplete="new-password"
                    class="mt-1 block w-full"
                    type="password"
                />
                <InputError :message="form.errors.password" class="mt-2"/>
            </div>

            <div class="col-span-6 sm:col-span-4">
                <Label for="password_confirmation">Confirm Password</Label>
                <Input
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    autocomplete="new-password"
                    class="mt-1 block w-full"
                    type="password"
                />
                <InputError :message="form.errors.password_confirmation" class="mt-2"/>
            </div>
        </template>

        <template #actions>
            <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save
            </Button>
        </template>
    </FormSection>
</template>
