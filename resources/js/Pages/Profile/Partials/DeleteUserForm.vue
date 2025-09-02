<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionSection from '@/Components/ActionSection.vue';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog';
import InputError from '@/Components/InputError.vue';
import { Input } from '@/Components/ui/input';

const confirmingUserDeletion = ref(false);
const passwordInput = ref<HTMLInputElement | null>(null);

const form = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    setTimeout(() => passwordInput.value?.focus(), 250);
};

const deleteUser = () => {
    form.delete(route('current-user.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;

    form.reset();
};
</script>

<template>
    <ActionSection>
        <template #title> Delete Account </template>

        <template #description> Permanently delete your account. </template>

        <template #content>
            <div class="max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download
                any data or information that you wish to retain.
            </div>

            <div class="mt-5">
                <Button variant="danger" @click="confirmUserDeletion"> Delete Account </Button>
            </div>

            <!-- Delete Account Confirmation Modal -->
            <Dialog
                :open="confirmingUserDeletion"
                @update:open="
                    (val) => {
                        if (!val) closeModal();
                    }
                "
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be
                            permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                        </DialogDescription>
                    </DialogHeader>

                    <div>
                        <Input
                            ref="passwordInput"
                            v-model="form.password"
                            type="password"
                            class="mt-1 block w-3/4"
                            placeholder="Password"
                            autocomplete="current-password"
                            @keyup.enter="deleteUser"
                        />

                        <InputError :message="form.errors.password" class="mt-2" />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" @click="closeModal">Cancel</Button>
                        <Button variant="destructive" :class="{ 'opacity-25': form.processing }" :disabled="form.processing" @click="deleteUser">
                            Delete Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </template>
    </ActionSection>
</template>
